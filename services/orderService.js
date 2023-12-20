import http from '../utils/axios';

export const placeOrder = (orderData) =>
    http(`/v1/public/orders`, {
        method: 'POST',
        data: orderData,
    });

export const getUserOrder = () => http(`/v1/public/orders/user`, { method: 'GET' });

export const getAllOrders = () => http(`/v1/public/orders`, { method: 'GET' });

export const deleteOrder = (orderData) =>
    http(`/v1/public/orders/delete`, {
        method: 'DELETE',
        data: orderData,
    });

export const updateOrderStatus = (statusInfo) =>
    http(`/v1/public/orders/status`, {
        method: 'PATCH',
        data: statusInfo,
    });
