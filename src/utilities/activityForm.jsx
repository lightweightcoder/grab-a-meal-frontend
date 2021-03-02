import React from 'react';

export const categoriesNames = ['Breakfast', 'Coffee', 'Lunch', 'Dinner', 'Supper', 'Budget', 'Fancy', 'Movie', 'Sports', 'Hike', 'Karaoke', 'Clubbing', 'Others'];

export const categoryOptions = categoriesNames.map((name, index) => (
  <option key={name} value={index + 1}>{name}</option>
));

export const numOfParticipantsOptions = [];
for (let i = 2; i < 11; i += 1) {
  numOfParticipantsOptions.push(<option key={i} value={i}>{i}</option>);
}
