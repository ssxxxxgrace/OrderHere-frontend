import http from '../utils/axios';
export const getIngredientsByDish = (dishId) =>
  http(`/v1/public/ingredients/dish/${dishId}`, { method: 'GET' });
export const getIngredient = (ingredientId) =>
  http(`/v1/public/ingredients/${ingredientId}`, { method: 'GET' });
