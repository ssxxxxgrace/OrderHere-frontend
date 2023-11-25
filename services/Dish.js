import http from '../utils/axios';

export const getDishes = () => http(`/v1/public/dish/1`, { method: 'GET' });


export const postDishes = (dishData) => http(`/v1/public/dish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(dishData)
  });
  

