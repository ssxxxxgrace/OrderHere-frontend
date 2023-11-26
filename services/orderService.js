import http from '../utils/axios';

export const placeOrder = (orderData) =>
    http(`/v1/public/orders`, {
        method: 'POST',
        data: orderData,
    });

export const getUserOrder = (userId) => http(`/v1/public/orders/user/${userId}`, { method: 'GET' });
