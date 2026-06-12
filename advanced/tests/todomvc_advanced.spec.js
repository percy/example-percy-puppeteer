// PER-8195 Phase 0 — puppeteer advanced example.
// Each test exercises one row of the Advanced Feature Matrix. See ../matrix.yml
// for the canonical mapping of test name -> matrix row.

const expect = require('expect').default;
const puppeteer = require('puppeteer');
const httpServer = require('http-server');
const percySnapshot = require('@percy/puppeteer');

const platform = require('os').platform();
const puppeteerArgs = /^win/.test(platform)
  ? ['--no-sandbox']
  : ['--single-process', '--no-sandbox'];
const PORT = process.env.PORT_NUMBER || 8001;
const TEST_URL = `http://localhost:${PORT}`;

describe('TodoMVC Advanced', function () {
  this.timeout(15000);
  let page;
  let server;
  let browser;

  before(async () => {
    server = httpServer.createServer({ root: `${__dirname}/../..` });
    server.listen(PORT);
    browser = await puppeteer.launch({
      headless: true,
      timeout: 10000,
      args: puppeteerArgs,
    });
  });

  after(() => server.close());

  beforeEach(async function () {
    page = await browser.newPage();
    await page.goto(TEST_URL);
    await page.evaluate(() => localStorage.clear());
    await page.type('.new-todo', 'Walk the dog');
    await page.keyboard.press('Enter');
  });

  afterEach(() => page.close());

  it('exercises widths', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      widths: [375, 768, 1280, 1920],
    });
  });

  it('exercises percyCSS', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      percyCSS: '.todo-list li { background: #fffde7 !important; }',
    });
  });

  it('exercises minHeight', async function () {
    await percySnapshot(page, this.test.fullTitle(), { minHeight: 2000 });
  });

  it('exercises enableJavaScript', async function () {
    await percySnapshot(page, this.test.fullTitle(), { enableJavaScript: true });
  });

  it('exercises scope', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      scope: '.todoapp',
    });
  });

  it('exercises discovery options', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      discovery: {
        allowedHostnames: ['localhost'],
        networkIdleTimeout: 500,
      },
    });
  });

  it('exercises domTransformation', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      domTransformation: `(documentClone) => {
        const banner = documentClone.createElement('div');
        banner.textContent = 'Snapshot taken via domTransformation';
        banner.style.cssText = 'background:#1976d2;color:white;padding:8px;';
        documentClone.body.prepend(banner);
      }`,
    });
  });

  it('exercises responsiveSnapshotCapture', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      responsiveSnapshotCapture: true,
      widths: [375, 1280],
    });
  });

  it('exercises labels', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      labels: 'smoke,sdk-puppeteer',
    });
  });

  it('exercises testCase', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      testCase: 'todomvc-advanced-suite',
    });
  });

  it('exercises devicePixelRatio', async function () {
    await percySnapshot(page, this.test.fullTitle(), { devicePixelRatio: 2 });
  });

  it('exercises regions', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      regions: [
        {
          algorithm: 'ignore',
          elementSelector: { boundingBox: { x: 0, y: 0, width: 200, height: 100 } },
        },
      ],
    });
  });

  it('exercises readiness preset', async function () {
    // global readiness preset is also set in .percy.yml; this test overrides it
    // locally to confirm per-snapshot override works.
    await percySnapshot(page, this.test.fullTitle(), {
      readiness: { preset: 'strict', timeoutMs: 5000 },
    });
  });

  it('exercises browsers override', async function () {
    await percySnapshot(page, this.test.fullTitle(), {
      browsers: ['chrome', 'firefox'],
    });

    let count = await page.evaluate(
      () => document.querySelectorAll('.todo-list li').length
    );
    expect(count).toEqual(1);
  });
});
