import Content from '../components/Cart/CartContent/CartContent';
import CartImage from '../components/Cart/CartImage/CartImage';
import CartEmpty from '../components/Cart/CartEmpty/CartEmpty';
import { useSelector } from 'react-redux';

const Index = () => {
  const totalItems = useSelector((state) => state.cart.totalItems);

  return (
    <>
      <CartImage />
      {totalItems ? <Content /> : <CartEmpty />}
    </>
  );
};

export default Index;
