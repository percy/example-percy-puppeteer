const should = require('chai').should()
const puppeteer = require('puppeteer')

describe('Index', function() {
  it('Loads the app', async function() {
    console.log('1')
    browser = await puppeteer.launch({
      headless: true,
      timeout: 10000,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    console.log('2')
    page = await browser.newPage()
    console.log('3')
    await page.goto("http://todomvc.com/examples/vanillajs/")
    console.log('4')
    const mainContainer = await page.$('section.todoapp')
    should.exist(mainContainer)
    console.log('5')
    browser.close()
    console.log('6')
  })
})
