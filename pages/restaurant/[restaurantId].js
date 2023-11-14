import { Box } from '@mui/material';
import {useRouter} from "next/router";
import RestaurantInfoHeader from "../../components/restaurantInfo/components/restaurantInfoHeader";
import RestaurantInfoContent from "../../components/restaurantInfo/components/restaurantInfoContent";
import Contact from "../../components/restaurantInfo/components/contact";
import OpeningHours from "../../components/restaurantInfo/components/openingHours";
import {useEffect, useState} from "react";
import getRestaurantById from "../api/restaurantService";

const RestaurantInfoPage = () => {
    const [restaurantData, setRestaurantData] = useState(null);
    const router = useRouter();
    const { restaurantId } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Restaurant ID:", restaurantId);
                const data = await getRestaurantById(restaurantId);
                setRestaurantData(data);
                console.log("Restaurant Data:", data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [restaurantId]);
    return (
        <Box>
            <RestaurantInfoHeader />
            <RestaurantInfoContent />
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4, pt:8, pb:8, backgroundColor:'#E9E9E9' }}>
                <Contact />
                <OpeningHours />
            </Box>
        </Box>
    );
};

export default RestaurantInfoPage;