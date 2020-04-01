const httpServer = require('http-server');
const should = require('chai').should();
const puppeteer = require('puppeteer');
const { percySnapshot } = require('@percy/puppeteer');
const platform = require('os').platform();
// We need to change the args passed to puppeteer based on the platform they're using
const puppeteerArgs = /^win/.test(platform) ? [] : ['--single-process'];
const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;

describe('TodoMVC', function() {
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

  beforeEach(async function() {
    page = await browser.newPage();
    await page.goto(TEST_URL);
    await page.evaluate(() => localStorage.clear());
  });

  afterEach(function() {
    page.close();
  });

  it('Loads the app', async function() {
    const mainContainer = await page.$('section.todoapp');
    should.exist(mainContainer);
    await percySnapshot(page, this.test.fullTitle());
  });

  it('With no todos, hides main section', async function() {
    const hiddenMainSection = await page.$(".main[style*='display:none']");
    should.exist(hiddenMainSection);
  });

  it('Accepts a new todo', async function() {
    await page.type('.new-todo', 'New fancy todo');
    await page.keyboard.press('Enter');
    const todoCount = await page.evaluate(() => document.querySelectorAll('.todo-list li').length);
    todoCount.should.eq(1);
    await percySnapshot(page, 'Snapshot with new todo', { widths: [300] });
  });

  it('Lets you check off a todo', async function() {
    await page.type('.new-todo', 'A thing to accomplish');
    await page.keyboard.press('Enter');

    let itemsLeft = await page.evaluate(() => document.querySelector('.todo-count').textContent);
    itemsLeft.should.eq('1 item left');

    await page.click('input.toggle');
    itemsLeft = await page.evaluate(() => document.querySelector('.todo-count').textContent);
    itemsLeft.should.eq('0 items left');
    await percySnapshot(page, this.test.fullTitle(), { widths: [768, 992, 1200] });
  });

  it('Demonstrates scoping snapshot to a selector', async function() {
    // Helper to scope a page to a selector
    async function scopePage(page, selector) {
      await page.evaluate(function(selector) {
        let scopedContainer = document.querySelector(selector);
        document.querySelector('body').innerHTML = scopedContainer.outerHTML;
      }, selector);
    }

    // Enter a todo, so that there is a todo list.
    await page.type('.new-todo', 'New fancy todo');
    await page.keyboard.press('Enter');

    // Scope the page to just the todo list and snapshot
    await scopePage(page, '.main');
    await percySnapshot(page, '.todo-list scoped snapshot');
  });
});
