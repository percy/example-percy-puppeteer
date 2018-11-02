const should = require('chai').should()
const puppeteer = require('puppeteer')
const { percySnapshot } = require('@percy/puppeteer')

const TEST_URL = "http://localhost:8000"

describe('TodoMVC', function() {

  let browser = null
  let page = null
  beforeEach(async function() {
    // Create a new Puppeteer browser instace for each test case
    browser = await puppeteer.launch({
      headless: true,
      timeout: 10000
    })
    page = await browser.newPage()
  })

  afterEach(function() {
    // Close the Puppeteer browser instance.
    browser.close()
  })

  it('Loads the app', async function() {
    await page.goto(TEST_URL)
    const mainContainer = await page.$('section.todoapp')
    should.exist(mainContainer)
    await percySnapshot(page, this.test.fullTitle())
  })

  it('With no todos, hides main section', async function() {
    await page.goto(TEST_URL)
    const hiddenMainSection = await page.$(".main[style*='display:none']")
    should.exist(hiddenMainSection)
  })

  it('Accepts a new todo', async function() {
    await page.goto(TEST_URL)
    await page.type('.new-todo', 'New fancy todo')
    await page.keyboard.press('Enter')
    const todoCount = await page.evaluate(() => document.querySelectorAll('.todo-list li').length)
    todoCount.should.eq(1)
    await percySnapshot(page, 'Snapshot with new todo', {widths: [300]})
  })

  it('Lets you check off a todo', async function() {
    await page.goto(TEST_URL)
    await page.type('.new-todo', 'A thing to accomplish')
    await page.keyboard.press('Enter')

    let itemsLeft = await page.evaluate(() => document.querySelector('.todo-count').textContent)
    itemsLeft.should.eq('1 item left')


    await page.click('input.toggle')
    itemsLeft = await page.evaluate(() => document.querySelector('.todo-count').textContent)
    itemsLeft.should.eq('0 items left')
    await percySnapshot(page, this.test.fullTitle(), {widths: [768, 992, 1200]})
  })
})
