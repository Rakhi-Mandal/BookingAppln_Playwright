const { test, expect, beforeEach } = require("@playwright/test");
const { BookingPage } = require("../pageObject/bookAppln"); 
let bookingPage;

beforeEach(async ({ page }) => {
    bookingPage=new BookingPage(page);
});

test("Test Case:Booking Application", async ({ page }) => {
   await bookingPage.navigate();
   await bookingPage.handlePopup();
   await bookingPage.verifyURLAndTitle();
   await bookingPage.validateSearchBars();
   await bookingPage.fillBookingRequirements();
   await bookingPage.filterTheSearchResult();
   await bookingPage.verifySelectedHotel();
  await page.pause()
 
});