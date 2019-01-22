const should = require('chai').should()
const puppeteer = require('puppeteer')
const { percySnapshot } = require('@percy/puppeteer')

const TEST_URL = "http://localhost:8000"

describe('Index', function() {
  let browser = null
  let page = null

  beforeEach(async function() {
    browser = await puppeteer.launch({
      headless: true,
      timeout: 10000,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    page = await browser.newPage()
  })

  afterEach(function() { browser.close() })

  it('Loads', async function() {
    await page.goto(TEST_URL)
    const mainContainer = await page.$('section.todoapp')
    should.exist(mainContainer)

    percySnapshot(page, this.test.fullTitle())
  })
})
