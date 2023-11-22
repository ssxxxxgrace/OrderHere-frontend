import http from '../utils/axios';

export const placeOrder = (orderData) =>
    http(`/v1/public/orders`, {
        method: 'POST',
        data: orderData,
    });
