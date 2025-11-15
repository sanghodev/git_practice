const mockRestaurants = [
  { id: '1', name: 'Pizza Palace', menu: [{ id: 'm1', name: 'Pepperoni Pizza' }] },
  { id: '2', name: 'Burger Barn', menu: [{ id: 'm2', name: 'Cheeseburger' }] },
  { id: '3', name: 'Taco Town', menu: [{ id: 'm3', name: 'Beef Taco' }] },
];

export const fetchNearbyRestaurants = (lat, lng) => {
  console.log(`Fetching restaurants near ${lat}, ${lng}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRestaurants);
    }, 1000);
  });
};
