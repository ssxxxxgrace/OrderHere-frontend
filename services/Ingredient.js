import http from '../utils/axios';

export const getIngredientsByDish = (dishId) =>
  http(`/v1/public/ingredients/dish/${dishId}`, { method: 'GET' });

export const getIngredient = (ingredientId) =>
  http(`/v1/public/ingredients/${ingredientId}`, { method: 'GET' });

export const createIngredient = (ingredientData) =>
  http(`/v1/public/ingredients`, {
    method: 'POST',
    data: ingredientData,
  });

export const updateIngredient = (ingredient) =>
  http(`/v1/public/ingredients/update`, {
    method: 'PUT',
    data: ingredient,
  });

export const deleteIngredient = (ingredientInfo) =>
  http(`/v1/public/ingredients/delete`, {
    method: 'DELETE',
    data: ingredientInfo,
  });