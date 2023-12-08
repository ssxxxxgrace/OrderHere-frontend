import ThreeColumnsLayout from '../layout/ThreeColumnsLayout';
import FoodItemsList from '../components/DishList/FoodItemsList';
import Carousel from '../components/Carousel/Carousel';
import Category from '../components/Category/Category';
import { getDishes } from '../services/Dish';
import { getCategoriesByRestaurant } from '../services/Category';

export async function getStaticProps() {
  try {
    const dishResponse = await getDishes();
    // console.log('dish-response:', dishResponse.data.data)
    const categoriesResponse = await getCategoriesByRestaurant();
    // console.log('categories-response:', categoriesResponse.data)
    return {
      props: {
        dishes: dishResponse.data.data,
        categories: categoriesResponse.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching dishes:', error);
    return { props: { dishes: [], categories: [] } };
  }
}

const Index = ({ dishes, categories }) => {
  return (
    <ThreeColumnsLayout>
      <Carousel />
      <Category categories={categories} />
      <FoodItemsList dishes={dishes} />
    </ThreeColumnsLayout>
  );
};

export default Index;
