import { test, expect, Page } from "@playwright/test";
import { BrowserWrapper } from "../infra/ui/brwoser-wrapper";
import { ApiCalls } from "../logic/api/api-requtsets";
import uiUrls from "../config/ui-urls.json"
import productConfig from "../config/products.json"
import { buildWishlistRequest } from "../logic/api/request-body/wishlist";
import { WishlistPage } from "../logic/ui/wishlist-page";
import { buildWishlistDeleteItemRequest } from "../logic/api/request-body/wishlist-delete-item";


test.describe("Wishlist Tests", async () => {

    let browser: BrowserWrapper;
    let tearDown: (() => Promise<any>)[] = []

    test.beforeEach(async () => {
        browser = new BrowserWrapper();
    });

    test.afterEach(async () => {
        // const apiCall = new ApiCalls();
        // const data = buildWishlistDeleteItemRequest(itemId)
        // const response = await apiCall.deleteItemFromWishlist(data)
        while (tearDown.length > 0) {
            tearDown.pop()!()
        }
        await browser.closeBrowser()
    })

    test.only('Add Item To Wishlist Via Api And Validate Via Ui', async () => {
        const data = buildWishlistRequest(productConfig.product1.sku)
        const apiCall = new ApiCalls()
        const response = await apiCall.addItemToWishlist(data)
        const itemId = response.data.data.addProductsToWishlist.anyWishlist.items[0].id
        const data1 = buildWishlistDeleteItemRequest(itemId)
        tearDown.push(async () => apiCall.deleteItemFromWishlist(data1))
        const page = await browser.getPage(uiUrls.wishlistPage)
        //await page.waitForTimeout(5000)
        const wishlist = new WishlistPage(page)
        await expect(wishlist.getItemTitleLocator(productConfig.product1.name)).toBeVisible()
    });
})
