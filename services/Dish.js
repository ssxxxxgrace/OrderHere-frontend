import http from '../utils/axios';

export const getDishes = () => http(`/v1/public/dish/1`, { method: 'GET' });

export const postDishes = (dishData) => {
  const formData = new FormData();
  for (const key in dishData) {
    if (key === 'imageFile' && dishData[key]) {
      formData.append(key, dishData[key], dishData[key].name);
    } else {
      formData.append(key, dishData[key]);
    }
  }

  return http(`/v1/public/dish`, {
    method: 'POST',
    data: formData
  });
};

export const updateDishes = (dishData) => {
  const formData = new FormData();
  for (const key in dishData) {
    if (key === 'imageFile' && dishData[key]) {
      formData.append(key, dishData[key], dishData[key].name);
    } else {
      formData.append(key, dishData[key]);
    }
  }

  return http(`/v1/public/dish`, {
    method: 'PUT',
    data: formData
  });
};
