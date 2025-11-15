import React from 'react';
import { useTranslation } from 'react-i18next';
import './RestaurantList.css';

const RestaurantList = ({ restaurants, votes, onVote }) => {
  const { t } = useTranslation();
  if (!restaurants.length) {
    return <p>Loading restaurants...</p>;
  }

  return (
    <div className="restaurant-list">
      <h2>{t('nearby_restaurants')}</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h3>{restaurant.name}</h3>
            <ul>
              {restaurant.menu.map((item) => (
                <li key={item.id}>
                  {item.name}
                  <button onClick={() => onVote(item.id)}>{t('votes', { count: votes[item.id] || 0 })}</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
