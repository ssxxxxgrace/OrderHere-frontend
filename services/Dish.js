import http from '../utils/axios';

export const getDishes = () => http(`/dish/1`, { method: 'GET' });
