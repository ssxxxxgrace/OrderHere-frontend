import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { getDishDetail } from '../../services/Dish';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

// 弹窗组件
const DishPopup = ({ dishId, open, onClose }) => {
  const [Dish, setDish] = useState([]);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await getDishDetail(dishId);

        setDish(response.data);
      } catch (error) {
        console.error('Error fetching Dish: ', error);
      }
    };

    fetchDish();
  }, []);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>Dish ID: {dishId}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DishPopup;
