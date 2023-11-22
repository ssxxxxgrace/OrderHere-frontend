import ThreeColumnsLayout from '../layout/ThreeColumnsLayout';
import FoodItemsList from '../components/DishList/FoodItemsList';
import Carousel from '../components/Carousel/Carousel';
import Category from '../components/Category/Category';

const Index = () => {
  return (
    <ThreeColumnsLayout>
      {/* Hello World */}
      <Carousel />
      <Category />
      <FoodItemsList />
    </ThreeColumnsLayout>
  );
};

export default Index;
