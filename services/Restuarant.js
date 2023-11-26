import http from '../utils/axios';

export const getRestaurantInfo = (restaurantId) => {
    return http(`/v1/public/restaurants/${restaurantId}`, { method: 'GET' });
};

export const updateRestaurant = (restaurantId, restaurantData) => http(`/v1/public/restaurants/${restaurantId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    data: JSON.stringify(restaurantData)
});