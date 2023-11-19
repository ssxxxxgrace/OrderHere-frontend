import { TextField, Box } from '@mui/material';
import {useState} from "react";
import {updateDineInData} from "../../../../../store/actions/dineInAction";
import {useDispatch} from "react-redux";

const Note = () => {
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  const handleNoteChange = (event) => {
    setNote(event.target.value);
    dispatch(updateDineInData({ note: event.target.value }));
  }

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', mt: 4 }}>
      <TextField
        fullWidth
        multiline
        margin="normal"
        name="note"
        label="Note"
        rows={4}
        onChange={handleNoteChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '30px',
            '& fieldset': {
              borderColor: 'border.main',
            },
          },
          '& .MuiInputBase-input': {
            height: 'auto',
            padding: '10px',
          },
        }}
      />
    </Box>
  );
};

export default Note;
