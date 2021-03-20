import { expect } from 'chai';

// define the functions to test (duplicated in ../src/utilities/activityForm/jsx)
// functions are defined here due to inability to import jsx components
// without additional configuration ===============================================

// change an input price to 2 decimal places
const numToTwoDecimalPlace = (price) => Math.round(Number(price) * 100) / 100;

// get percentage discount from usual price and discounted price. Round to 2 decimal places
// eslint-disable-next-line max-len
const getPercentageDiscount = (usualPrice, discountedPrice) => Math.round(((Number(usualPrice) - Number(discountedPrice)) / Number(usualPrice)) * 10000) / 100;

// get the discounted price from the usual price and percentage discount. Round to 2 decimal places
// eslint-disable-next-line max-len
const getDiscountedPrice = (usualPrice, percentageDiscount) => Math.round(Number(usualPrice) * (1 - percentageDiscount / 100) * 100) / 100;

// tests ===================================================
describe('activity form', () => {
  describe('functions related to price inputs', () => {
    it('round to 2 decimal places', () => {
      const result = numToTwoDecimalPlace(24.4567);
      expect(result).to.equal(24.46);
    });

    it('get percentage discount, rounded to 2 d.p.', () => {
      const result = getPercentageDiscount(100, 80.22);
      expect(result).to.equal(19.78);
    });

    it('get discounted price, rounded to 2 d.p.', () => {
      const result = getDiscountedPrice(50, 15);
      expect(result).to.equal(42.5);
    });
  });
});
