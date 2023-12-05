import Rating from '@mui/material/Rating';

export default function RatingStars({ rating })  {
    return (
            <Rating name="rating" defaultValue={null} value={rating} precision={0.1} readOnly />
    );
}