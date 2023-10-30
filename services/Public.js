import http from '../utils/axios';

export const login = (email, password) =>
  http(`/login`, { method: 'POST', data: { email, password } });

export const signup = ({ email, username, password }) =>
  http(`/v1/public/users/signup`, {
    method: 'POST',
    data: {
      email,
      username,
      password,
    },
  });

export const uniqueEmail = (email) =>
  http(`/v1/public/users/unique_email/${email}`, { method: 'get' });

export const uniqueUsername = (username) =>
  http(`/v1/public/users/unique_username/${username}`, { method: 'get' });
