import { Page, TestInfo } from '@playwright/test';
import { logger } from './logger';

export class Screenshot {

    static async captureOnFailure(
        page: Page,
        testInfo: TestInfo
    ): Promise<void> {

        try {

            const screenshotPath = testInfo.outputPath(
                'failure-screenshot.png'
            );

            await page.screenshot({
                path: screenshotPath,
                fullPage: true
            });

            await testInfo.attach('Failure Screenshot', {
                path: screenshotPath,
                contentType: 'image/png'
            });

            logger.info(
                `Failure screenshot attached: ${testInfo.title}`
            );

        } catch (error) {

            logger.error(
                `Screenshot capture failed: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        }
    }
}