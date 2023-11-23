import http from '../utils/axios';

export const getCategoriesByRestaurant = () =>
  http(`/v1/public/category/1`, { method: 'GET' });
//  {
//   return http.get(`/v1/public/category/1`);
// };
