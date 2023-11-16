import Content from './components/CartContent/CartContent';
import CartImage from './components/CartImage/CartImage';
import CartEmpty from './components/CartEmpty/CartEmpty';
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
