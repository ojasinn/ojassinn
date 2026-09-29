const { chromium } = require('playwright');
const fs = require('fs');

const BASE_URL = 'https://ojas-olive.vercel.app';

const viewports = [
  { name: 'iPhone-16', width: 393, height: 852 },
  { name: 'iPhone-16-Pro-Max', width: 440, height: 956 },
  { name: 'Pixel-9', width: 412, height: 915 },
  { name: 'Galaxy-S25-Ultra', width: 412, height: 915 },

  { name: 'iPad-Air-11', width: 820, height: 1180 },
  { name: 'iPad-Pro-11', width: 834, height: 1194 },
  { name: 'iPad-Pro-13', width: 1024, height: 1366 },

  { name: 'MacBook-Air-Class', width: 1440, height: 900 },
  { name: 'MacBook-Pro-Large', width: 1728, height: 1117 },
  { name: 'Desktop-FullHD', width: 1920, height: 1080 },
  { name: 'Desktop-QHD', width: 2560, height: 1440 },
];

const outputDir = '/tmp/ojas-responsive-qa';

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

function isExpectedExternalRequestFailure(url) {
  return (
    url.includes('/_vercel/insights/') ||
    url.includes('vercel-insights')
  );
}

async function main() {
  console.log('\n==============================================');
  console.log('          OJAS INN FINAL RESPONSIVE QA');
  console.log('          LIVE PRODUCTION SITE');
  console.log('==============================================\n');

  console.log(`Target: ${BASE_URL}`);
  console.log(`Viewports: ${viewports.length}`);
  console.log(`Screenshots: ${outputDir}\n`);

  const browser = await chromium.launch({
    headless: true,
  });

  let totalFailures = 0;

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: {
        width: viewport.width,
        height: viewport.height,
      },
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();

    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];

    page.on('console', message => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    page.on('requestfailed', request => {
      const url = request.url();

      if (!isExpectedExternalRequestFailure(url)) {
        failedRequests.push({
          url,
          error: request.failure()?.errorText || 'Unknown error',
        });
      }
    });

    let navigationError = null;

    try {
      /*
       * We intentionally do not wait for "load".
       * External analytics/third-party resources can keep that lifecycle
       * event open even after the actual application is fully rendered.
       */
      await page.goto(BASE_URL, {
        waitUntil: 'commit',
        timeout: 15000,
      });
    } catch (error) {
      navigationError = error.message;
    }

    try {
      /*
       * Verify the actual production document independently of the
       * navigation lifecycle.
       */
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          return Boolean(root && root.children.length > 0);
        },
        null,
        { timeout: 15000 }
      );

      // Let images, fonts, React layout and animations settle.
      await page.waitForTimeout(2000);

      const result = await page.evaluate(async () => {
        /*
         * Wait until document height stops changing.
         * This avoids measuring during image/layout shifts.
         */
        await new Promise(resolve => {
          let previousHeight = 0;
          let stableRounds = 0;

          const timer = setInterval(() => {
            const currentHeight =
              document.documentElement.scrollHeight;

            if (currentHeight === previousHeight) {
              stableRounds++;
            } else {
              stableRounds = 0;
              previousHeight = currentHeight;
            }

            if (stableRounds >= 5) {
              clearInterval(timer);
              resolve();
            }
          }, 150);
        });

        const html = document.documentElement;
        const body = document.body;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const documentWidth = Math.max(
          html.scrollWidth,
          body.scrollWidth
        );

        const horizontalOverflow =
          documentWidth > viewportWidth + 1;

        const overflowAmount = Math.max(
          0,
          documentWidth - viewportWidth
        );

        /*
         * Check fixed-position UI such as:
         * - chatbot
         * - mobile booking bar
         * - navbar overlays
         */
        const fixedElements = [];

        for (const element of document.querySelectorAll('*')) {
          if (getComputedStyle(element).position !== 'fixed') {
            continue;
          }

          const rect = element.getBoundingClientRect();

          fixedElements.push({
            tag: element.tagName,
            className:
              typeof element.className === 'string'
                ? element.className.slice(0, 160)
                : '',
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            top: Math.round(rect.top),
            bottom: Math.round(rect.bottom),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }

        const fixedOutsideViewport =
          fixedElements.filter(element => {
            return (
              element.left < -2 ||
              element.right > viewportWidth + 2 ||
              element.top < -2 ||
              element.bottom > viewportHeight + 2
            );
          });

        /*
         * Check the document at the bottom as well.
         */
        window.scrollTo(0, html.scrollHeight);

        await new Promise(resolve => {
          requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
          });
        });

        const bottomHorizontalOverflow =
          document.documentElement.scrollWidth >
          window.innerWidth + 1;

        window.scrollTo(0, 0);

        return {
          viewportWidth,
          viewportHeight,
          documentWidth,
          documentHeight: html.scrollHeight,
          horizontalOverflow,
          bottomHorizontalOverflow,
          overflowAmount,
          fixedOutsideViewport,
          rootChildren:
            document.getElementById('root')?.children.length || 0,
          title: document.title,
        };
      });

      const screenshotPath =
        `${outputDir}/${viewport.name}-${viewport.width}x${viewport.height}.png`;

      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
      });

      /*
       * Navigation errors are NOT automatically failures.
       * We care about whether the application actually rendered and
       * whether the rendered page has real QA problems.
       */
      const passed =
        result.rootChildren > 0 &&
        !result.horizontalOverflow &&
        !result.bottomHorizontalOverflow &&
        result.fixedOutsideViewport.length === 0 &&
        consoleErrors.length === 0 &&
        pageErrors.length === 0 &&
        failedRequests.length === 0;

      if (!passed) {
        totalFailures++;
      }

      console.log(
        `${passed ? 'PASS' : 'FAIL'}  ` +
        `${viewport.name.padEnd(24)} ` +
        `${viewport.width}x${viewport.height}`
      );

      console.log(
        `      Rendered: YES`
      );

      console.log(
        `      Page: ${result.documentWidth}px wide × ` +
        `${result.documentHeight}px high`
      );

      console.log(
        `      Horizontal overflow: ` +
        `${result.horizontalOverflow ? 'YES' : 'NO'}`
      );

      console.log(
        `      Bottom overflow: ` +
        `${result.bottomHorizontalOverflow ? 'YES' : 'NO'}`
      );

      console.log(
        `      Overflow amount: ${result.overflowAmount}px`
      );

      console.log(
        `      Console errors: ${consoleErrors.length}`
      );

      console.log(
        `      Page errors: ${pageErrors.length}`
      );

      console.log(
        `      Failed relevant requests: ${failedRequests.length}`
      );

      console.log(
        `      Fixed elements outside viewport: ` +
        `${result.fixedOutsideViewport.length}`
      );

      if (navigationError) {
        console.log(
          `      Navigation lifecycle note: timeout/interrupt occurred, ` +
          `but application rendering was verified independently.`
        );
      }

      if (consoleErrors.length) {
        consoleErrors.forEach(error => {
          console.log(`      Console: ${error}`);
        });
      }

      if (pageErrors.length) {
        pageErrors.forEach(error => {
          console.log(`      Page error: ${error}`);
        });
      }

      if (failedRequests.length) {
        failedRequests.forEach(request => {
          console.log(
            `      Failed request: ${request.url} (${request.error})`
          );
        });
      }

      console.log(
        `      Screenshot: ${screenshotPath}\n`
      );
    } catch (error) {
      totalFailures++;

      console.log(
        `FAIL  ${viewport.name.padEnd(24)} ` +
        `${viewport.width}x${viewport.height}`
      );

      console.log(
        `      Render/QA error: ${error.message}\n`
      );
    }

    await context.close();
  }

  await browser.close();

  console.log('==============================================');

  if (totalFailures === 0) {
    console.log('RESULT: ALL MODERN VIEWPORTS PASSED');
  } else {
    console.log(
      `RESULT: ${totalFailures} VIEWPORT(S) NEED ATTENTION`
    );
  }

  console.log('==============================================');
  console.log(`\nScreenshots saved to: ${outputDir}\n`);

  process.exit(totalFailures === 0 ? 0 : 1);
}

main().catch(error => {
  console.error('\nUNEXPECTED QA ERROR');
  console.error(error);
  process.exit(1);
});
