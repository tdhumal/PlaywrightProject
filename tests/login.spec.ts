import { test, expect } from "../src/fixtures/baseFixture";
import { TestDataProvider } from "../src/test-data/TestDataprovided";
import { logger } from "../src/utils/logger";


test('Verif Successful Login',{tag:['@smoke']}, async({page,loginPage})=>{

    const jsonData=TestDataProvider.getJsonData('loginTest.json');
    await page.goto("/")
    await loginPage.login(jsonData.LoginScenario.Username, jsonData.LoginScenario.Password);

    await expect(page).toHaveURL('/inventory.html');
    logger.info('Application launched');
});