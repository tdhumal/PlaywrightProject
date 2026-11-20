import { LoginPage } from "../pages/loginPage";
import { test as base, expect } from '@playwright/test';
import { logger } from "../utils/logger";
import { Screenshot } from "../utils/screenshot";
import { ErrorHandler } from "../utils/Errorhandler";

type FrameworkFixtures={
    loginPage:LoginPage;
    failureDiagnostics:void;

};

export const test=base.extend<FrameworkFixtures>({
    loginPage:async({page},use)=>{

        const loginPage=new LoginPage(page);

        await use(loginPage);

    },
    failureDiagnostics: [
        async ({ page }, use, testInfo) => {

            logger.info(
                `Test started: ${testInfo.title}`
            );

            await use();

            if (testInfo.status !== testInfo.expectedStatus) {

                const error = testInfo.error;

                ErrorHandler.logError(
                    error ?? 'Unexpected test result',
                    `Test failed: ${testInfo.title}`
                );

                await Screenshot.captureOnFailure(
                    page,
                    testInfo
                );
            } else {

                logger.info(
                    `Test completed: ${testInfo.title}`
                );
            }
        },
        { auto: true }
    ]
});

export {expect};