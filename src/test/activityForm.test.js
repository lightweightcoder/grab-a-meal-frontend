import { expect } from 'chai';
import { numToTwoDecimalPlace, getPercentageDiscount, getDiscountedPrice } from '../utilities/activityForm.jsx';

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
