// this file contains constants and functions for create activity and edit activity forms
import React from 'react';

export const categoriesNames = ['Breakfast', 'Coffee', 'Lunch', 'Dinner', 'Supper', 'Budget', 'Fancy', 'Movie', 'Sports', 'Hike', 'Karaoke', 'Clubbing', 'Others'];

// create jsx for category options
export const categoryOptions = categoriesNames.map((name, index) => (
  <option key={name} value={index + 1}>{name}</option>
));

// create jsx for options related to the number of participants
// an activity can hav
export const numOfParticipantsOptions = [];
// number of participants will be between 2 to 10
for (let i = 2; i < 11; i += 1) {
  numOfParticipantsOptions.push(<option key={i} value={i}>{i}</option>);
}

// change an input price to 2 decimal places
export const numToTwoDecimalPlace = (price) => Math.round(Number(price) * 100) / 100;

// get percentage discount from usual price and discounted price. Round to 2 decimal places
// eslint-disable-next-line max-len
export const getPercentageDiscount = (usualPrice, discountedPrice) => Math.round(((Number(usualPrice) - Number(discountedPrice)) / Number(usualPrice)) * 10000) / 100;

// get the discounted price from the usual price and percentage discount. Round to 2 decimal places
// eslint-disable-next-line max-len
export const getDiscountedPrice = (usualPrice, percentageDiscount) => Math.round(Number(usualPrice) * (1 - percentageDiscount / 100) * 100) / 100;
