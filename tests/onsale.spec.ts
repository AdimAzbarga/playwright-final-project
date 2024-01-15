import {Page, expect, test} from '@playwright/test'
import { BrowserWrapper } from '../infra/ui/brwoser-wrapper'
import { OnSalePage } from '../logic/pages/OnSalePage';
import { NavBar } from '../logic/ui/NavBar';
import * as UI_URLS from '../config/ui-urls.json'

let browser:BrowserWrapper
let page:Page
test.beforeEach(async()=>{
    browser = new BrowserWrapper()
    page = await browser.getPage(UI_URLS.mainPage);
})
test.afterEach(async()=>{
    await browser.closeBrowser()
})

test('Flow To On Sale Page',async()=>{
    const navbar = new NavBar(page)
    await navbar.flowToOnSale()
    await expect(page).toHaveURL('https://www.terminalx.com/on-sale')
})

test('Validate The Sale',async()=>{
    const navbar = new NavBar(page)
    const onSale = new OnSalePage(page)
    await navbar.flowToOnSale()
    expect(await onSale.createSale()).toEqual(await onSale.getNewPrice())
})