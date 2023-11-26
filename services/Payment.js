import http from "../utils/axios";

export const createPayment = (payCreateData) => http(`/v1/public/pay`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    data: JSON.stringify(payCreateData)
});

export const sendPayResult = (payResultData) => http(`/v1/public/pay/result`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    data: JSON.stringify(payResultData)
});