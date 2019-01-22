const should = require('chai').should()
const puppeteer = require('puppeteer')

const TEST_URL = "http://localhost:8000"

describe('Todos', function() {
  let browser = null
  let page = null

  beforeEach(async function() {
    browser = await puppeteer.launch({
      headless: true,
      timeout: 10000,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    })
    page = await browser.newPage()
  })

  afterEach(function() { browser.close() })

  it('Accepts a new todo', async function() {
    await page.goto(TEST_URL)
    await page.type('.new-todo', 'New fancy todo')
    await page.keyboard.press('Enter')
    const todoCount = await page.evaluate(() => document.querySelectorAll('.todo-list li').length)
    todoCount.should.eq(1)
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
  })
})
