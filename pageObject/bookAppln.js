const { expect } = require("@playwright/test");
require("dotenv").config();
const data = require("../Data/data.json");


exports.BookingPage = class BookingPage {
  constructor(page) {
    this.page = page;
    this.signInPopUp = page.locator(
      "//span[text()='Sign in or register']//parent::a//parent::div//parent::div//parent::div"
    );
    this.closePopUp = page.locator("//button[contains(@aria-label,'Dismiss')]");
    this.checkInDate = page.locator("//span[text()='Check-in Date']");
    this.numberOfGuest = page.locator(
      "//span[text()='Search']//parent::button//parent::div//preceding-sibling::div[1]"
    );
    this.getParis = page.locator(
      "//ul[@role='group']//child::li//child::div//child::div//child::div//child::div[1]"
    );
    this.checkIn = page.locator(
      "(//table//child::tbody//child::tr//child::td[@role='gridcell'])[2]"
    );
    this.checkOut = page.locator(
      "(//table//child::tbody//child::tr//child::td[@role])[5]"
    );
    this.selectTheAdultCount = page.locator(
      '(//div[@data-testid="occupancy-popup"]//child::div//child::div//child::div//following-sibling::div//child::button)[2]'
    );
    this.doneButton = page.locator('//button//span[text()="Done"]');
    this.grid = page.locator('//label[text()="Grid"]');
    this.checkOnlyHotels = page.locator('(//div[text()="Hotels"])[1]');
    this.countOptionsAvailable = page.locator('//h1[@aria-live="assertive"]');
    this.search = page.locator("//button//span[text()='Search']");
    this.selectTheHotel = page.locator(
      "(//div[@role='listitem'][//div[@role='listitem']]//child::div//child::div//following-sibling::div//child::div//child::div//child::div//child::h3//child::div)[1]"
    );
  }
  async navigate() {
    await this.page.goto(process.env.baseUrl);
  }

  async handlePopup() {
    await this.signInPopUp.isVisible();
    await this.closePopUp.isEnabled();
    await this.closePopUp.click();
  }

  async verifyURLAndTitle() {
    await expect(this.page).toHaveTitle(process.env.pageTitle);
    const pageTitle = await this.page.title();
    expect(pageTitle).toContain("Booking.com");
    await expect(this.page).toHaveURL(process.env.baseUrl);
    await expect(this.page.url()).toEqual(process.env.baseUrl);
  }

  async validateSearchBars() {
    expect(this.page.getByPlaceholder("Where are you going?")).toBeVisible();
    expect(this.page.getByPlaceholder("Where are you going?")).toBeEditable();

    expect(this.checkInDate).toBeVisible();
    expect(this.checkInDate).toBeEnabled();

    expect(this.numberOfGuest).toBeVisible();
    expect(this.numberOfGuest).toBeEnabled();
  }

  async fillBookingRequirements() {
    await this.page.getByPlaceholder("Where are you going?").fill("Paris");
    await this.checkInDate.click();
    await expect(this.checkIn).toBeVisible();
    await this.checkIn.click();
    await this.checkOut.click();
    await this.numberOfGuest.click();
    await this.selectTheAdultCount.click();
    await this.doneButton.click();
    await this.search.click();
  }



  async filterTheSearchResult() {
    await expect(this.grid).toBeVisible();
    await expect(this.checkOnlyHotels).not.toBeChecked();
    const preCount=await this.countOptionsAvailable.textContent()
     console.log(preCount);
    await this.checkOnlyHotels.click();
    await this.page.waitForTimeout(3000);
    await expect(this.checkOnlyHotels).toBeChecked();
    const postCount=await this.countOptionsAvailable.textContent()
     console.log(postCount);
  }
  async verifySelectedHotel() {
    await expect(this.selectTheHotel).toBeVisible();
    const hotelName=await this.selectTheHotel.textContent()
     expect(hotelName).toEqual(data.hotelSelected);
  }
};
