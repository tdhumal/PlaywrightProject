import { Page } from "@playwright/test";


export class BasePage{

    protected page:Page;

    constructor(page:Page){

        this.page =page;

    }

    async navigateToURL(URL:string):Promise<void>{
        await this.page.goto(URL);

    }

    async getPageTitle():Promise<string>{
        return await this.page.title();

    }

    
}