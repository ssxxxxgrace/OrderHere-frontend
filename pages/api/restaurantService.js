import http from '../../utils/axios';

const getRestaurantById = async (restaurantId) => {
    try {
        const response = await http(`/v1/public/restaurants/${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurant data: ", error);
        throw error;
    }
};

export default getRestaurantById;
