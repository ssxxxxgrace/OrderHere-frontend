import http from "../utils/axios";

export const updateUserProfile = (userData) => http(`/v1/public/users/profile`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    data: JSON.stringify(userData)
});

export const getUserProfile = () => http(`/v1/public/users/profile`, {
    method: 'GET',
});