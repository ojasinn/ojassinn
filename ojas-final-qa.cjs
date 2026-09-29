const { chromium, devices } = require('playwright');
const fs = require('fs');

const URL = 'https://ojas-olive.vercel.app';
const OUT = '/tmp/ojas-final-qa';

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const tests = [
  // Modern Android
  ['Android Pixel', devices['Pixel 9']],
  ['Android Galaxy', devices['Galaxy S24']],

  // Modern iPhone
  ['iPhone 15', devices['iPhone 15']],
  ['iPhone 15 Pro Max', devices['iPhone 15 Pro Max']],

  // Modern tablets
  ['iPad Pro 11', devices['iPad Pro 11']],
  ['iPad Pro 13', devices['iPad Pro 12.9']],

  // Desktop
  ['MacBook', devices['Desktop Chrome']],
];

async function main() {
  console.log('\n==========================================');
  console.log('       OJAS INN FINAL DEVICE QA');
  console.log('       LIVE PRODUCTION');
  console.log('==========================================\n');

  const browser = await chromium.launch();

  let failures = 0;

  for (const [name, profile] of tests) {
    const context = await browser.newContext({
      ...profile,
    });

    const page = await context.newPage();

    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();

        // Vercel Analytics is external infrastructure and
        // must not invalidate responsive QA.
        if (!text.includes('/_vercel/insights/')) {
          consoleErrors.push(text);
        }
      }
    });

    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    try {
      await page.goto(URL, {
        waitUntil: 'commit',
        timeout: 10000,
      }).catch(() => {});

      // Wait for the actual application to render.
      await page.waitForTimeout(3000);

      const result = await page.evaluate(async () => {
        const root = document.getElementById('root');

        if (!root || root.children.length === 0) {
          return {
            rendered: false,
            reason: 'React application did not render',
          };
        }

        // Wait for layout to stabilize.
        await new Promise(resolve => {
          let previous = -1;
          let stable = 0;

          const timer = setInterval(() => {
            const height = document.documentElement.scrollHeight;

            if (height === previous) {
              stable++;
            } else {
              stable = 0;
              previous = height;
            }

            if (stable >= 5) {
              clearInterval(timer);
              resolve();
            }
          }, 150);
        });

        const html = document.documentElement;
        const body = document.body;

        const width = window.innerWidth;
        const height = window.innerHeight;

        const documentWidth = Math.max(
          html.scrollWidth,
          body.scrollWidth
        );

        const overflow = documentWidth > width + 1;

        const fixedOutside = [...document.querySelectorAll('*')]
          .filter(el => getComputedStyle(el).position === 'fixed')
          .map(el => {
            const r = el.getBoundingClientRect();

            return {
              tag: el.tagName,
              left: r.left,
              right: r.right,
              top: r.top,
              bottom: r.bottom,
            };
          })
          .filter(r =>
            r.left < -2 ||
            r.right > width + 2 ||
            r.top < -2 ||
            r.bottom > height + 2
          );

        // Scroll to bottom to catch layout changes.
        window.scrollTo(0, html.scrollHeight);

        await new Promise(resolve =>
          requestAnimationFrame(() =>
            requestAnimationFrame(resolve)
          )
        );

        const bottomOverflow =
          document.documentElement.scrollWidth > width + 1;

        window.scrollTo(0, 0);

        return {
          rendered: true,
          width,
          height,
          documentWidth,
          documentHeight: html.scrollHeight,
          overflow,
          bottomOverflow,
          fixedOutside: fixedOutside.length,
        };
      });

      if (!result.rendered) {
        failures++;

        console.log(`FAIL  ${name}`);
        console.log(`      ${result.reason}\n`);

        await context.close();
        continue;
      }

      const screenshot =
        `${OUT}/${name.replaceAll(' ', '-')}.png`;

      await page.screenshot({
        path: screenshot,
        fullPage: true,
      });

      const passed =
        !result.overflow &&
        !result.bottomOverflow &&
        result.fixedOutside === 0 &&
        consoleErrors.length === 0 &&
        pageErrors.length === 0;

      if (!passed) failures++;

      console.log(
        `${passed ? 'PASS' : 'FAIL'}  ${name}`
      );

      console.log(
        `      Viewport: ${result.width} × ${result.height}`
      );

      console.log(
        `      Page: ${result.documentWidth} × ${result.documentHeight}`
      );

      console.log(
        `      Horizontal overflow: ${result.overflow ? 'YES' : 'NO'}`
      );

      console.log(
        `      Bottom overflow: ${result.bottomOverflow ? 'YES' : 'NO'}`
      );

      console.log(
        `      Fixed elements outside: ${result.fixedOutside}`
      );

      console.log(
        `      Console errors: ${consoleErrors.length}`
      );

      console.log(
        `      Page errors: ${pageErrors.length}`
      );

      console.log(`      Screenshot: ${screenshot}\n`);

      if (consoleErrors.length) {
        consoleErrors.forEach(e => console.log(`      ERROR: ${e}`));
      }

      if (pageErrors.length) {
        pageErrors.forEach(e => console.log(`      PAGE ERROR: ${e}`));
      }

    } catch (error) {
      failures++;

      console.log(`FAIL  ${name}`);
      console.log(`      ${error.message}\n`);
    }

    await context.close();
  }

  await browser.close();

  console.log('==========================================');

  if (failures === 0) {
    console.log('RESULT: ALL DEVICE TESTS PASSED');
  } else {
    console.log(`RESULT: ${failures} DEVICE TEST(S) FAILED`);
  }

  console.log('==========================================');
  console.log(`\nScreenshots: ${OUT}\n`);

  process.exit(failures === 0 ? 0 : 1);
}

main();
