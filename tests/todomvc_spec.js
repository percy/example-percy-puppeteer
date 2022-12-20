const expect = require('expect');
const puppeteer = require('puppeteer');
const httpServer = require('http-server');
const percySnapshot = require('@percy/puppeteer');

const platform = require('os').platform();
// We need to change the args passed to puppeteer based on the platform they're using
const puppeteerArgs = /^win/.test(platform) ? [] : ['--single-process'];
const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;

describe('TodoMVC', function () {
  this.timeout(6000);
  let page;
  let server;
  let browser;

  before(async () => {
    server = httpServer.createServer({ root: `${__dirname}/..` });
    server.listen(PORT);

    browser = await puppeteer.launch({
      headless: true,
      timeout: 10000,
      args: puppeteerArgs
    });
  });

  after(() => {
    server.close();
  });

  beforeEach(async function () {
    page = await browser.newPage();
    await page.goto(TEST_URL);
    await page.evaluate(() => localStorage.clear());
  });

  afterEach(function () {
    page.close();
  });

  it('Loads the app', async function () {
    let mainContainer = await page.$('section.todoapp');
    expect(mainContainer).toBeDefined();

    await percySnapshot(page, this.test.fullTitle());
  });

  it('With no todos, hides main section', async function () {
    let display = await page.evaluate(() => document.querySelector('.main').style.display);

    expect(display).toEqual('none');
  });

  it('Accepts a new todo', async function () {
    await page.type('.new-todo', 'New fancy todo');
    await page.keyboard.press('Enter');

    let todoCount = await page.evaluate(() => document.querySelectorAll('.todo-list li').length);
    expect(todoCount).toEqual(1);

    await percySnapshot(page, 'Snapshot with new todo', { widths: [300] });
  });

  it('Lets you check off a todo', async function () {
    await page.type('.new-todo', 'A thing to accomplish');
    await page.keyboard.press('Enter');

    let itemsLeft = await page.evaluate(() => document.querySelector('.todo-count').textContent);
    expect(itemsLeft).toEqual('1 item left');

    await page.click('input.toggle');
    itemsLeft = await page.evaluate(() => document.querySelector('.todo-count').textContent);
    expect(itemsLeft).toEqual('0 items left');

    await percySnapshot(page, this.test.fullTitle(), { widths: [768, 992, 1200] });
  });
});
//
