import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{

    private username:Locator;
    private password:Locator;
    private loginbtn:Locator;


    constructor(page:Page){
        super(page);

        this.username=page.getByPlaceholder('Username');
        this.password=page.getByPlaceholder('Password');
        this.loginbtn=page.locator('#login-button');

    }
    async enterUsername(usernameText:string): Promise<void>{
        await this.username.fill(usernameText);

    }
    async enterPassword(passwordText:string): Promise<void>{
        await this.password.fill(passwordText);

    }
    async clickLoginBtn() : Promise<void>{
        await this.loginbtn.click();
    }
    async login(usernameText:string,passwordText:string){
        await this.enterUsername(usernameText);
        await this.enterPassword(passwordText);
        await this.clickLoginBtn();
    }
    
}