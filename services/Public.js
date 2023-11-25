import http from '../utils/axios';

export const login = (email, password) =>
  http(`/login`, { method: 'POST', data: { email, password } });

export const signup = (userName, firstName, lastName, password, email) =>
  http(`/v1/public/users/signup`, {
    method: 'POST',
    data: {
      userName,
      firstName,
      lastName,
      password,
      email,
    },
  });

export const loginByOathProvider = (provider,openId,email,username,avatarUrl) =>
  http(`/v1/public/users/login/${provider}/${openId}`, {
    method: 'POST',
    data: {
      username,
      email,
      avatarUrl,
    },
  });
