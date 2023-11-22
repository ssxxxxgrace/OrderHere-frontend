import http from '../utils/axios';

export const getDishes = () => http(`/v1/public/dish/1`, { method: 'GET' });
export const getDishDetail = (dishId) =>
  http(`/v1/public/detail/${dishId}`, { method: 'GET' });
