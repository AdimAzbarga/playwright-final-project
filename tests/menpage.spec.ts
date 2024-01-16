import {Page, expect, test} from '@playwright/test'
import { BrowserWrapper } from '../infra/ui/brwoser-wrapper'
import { NavBar } from '../logic/ui/NavBar';
import * as UI_URLS from '../config/ui-urls.json'
import { MenPage } from '../logic/pages/MenPage';


let browser:BrowserWrapper
let page:Page
test.beforeEach(async()=>{
    browser = new BrowserWrapper()
    page = await browser.getPage(UI_URLS.websiteUrl);
})
test.afterEach(async()=>{
    await browser.closeBrowser()
})

test('Flow To Men Page',async()=>{
    const navbar = new NavBar(page)
    await navbar.flowToMen()
    await expect(page).toHaveURL(UI_URLS.menPage)
})

test('Validate the men Page',async()=>{
    const navbar = new NavBar(page)
    const menPage = new MenPage(page)
    await navbar.flowToMen()
    expect(menPage.menLogoIsActive()).toBeTruthy()
})