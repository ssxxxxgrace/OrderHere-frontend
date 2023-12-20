import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Container,
    Box,
    FormControl,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as Action from '../../../store/actionTypes';

const OrderInfo = () => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState({
        delivery: true,
        dine_in: true,
        pickup: true,
    });

    const [checkedStatus, setCheckedStatus] = useState({
        pending: true,
        preparing: true,
        finished: true,
        in_transite: true,
        delayed: true,
        delivered: true,
        canceled: true,
    });
    const [sortValue, setSortValue] = useState('');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setSearchText('');
        dispatch({ type: Action.SET_SEARCH_TEXT, payload: '' });
    }, []);

    const handleChangeOptions = (event) => {
        const newOptions = { ...checked, [event.target.name]: event.target.checked };
        setChecked(newOptions);
        dispatch({ type: Action.SET_ORDER_OPTION, payload: newOptions });
        // setChecked({ ...checked, [event.target.name]: event.target.checked });
    };

    const handleChangeStatus = (event) => {
        const newStatus = { ...checkedStatus, [event.target.name]: event.target.checked };
        setCheckedStatus(newStatus);
        dispatch({ type: Action.SET_ORDER_STATUS, payload: newStatus });
    };

    const handleSortChange = (event) => {
        const newSort = event.target.value;
        setSortValue(newSort);
        dispatch({ type: Action.SET_SORTED_ORDER, payload: newSort });
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        dispatch({ type: Action.SET_SEARCH_TEXT, payload: event.target.value });
    };

    return (
        <Container sx={{ width: 'auto', fontFamily: 'Gothic A1', ml: 0, }}>
            <Box my={2} sx={{ border: '1px solid #D9D9D9', borderRadius: '3px', p: 1, }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    value={searchText}
                    onChange={handleSearchChange}
                    sx={{
                        mr: '20px',
                        backgroundColor: '#F2F2F2',
                        borderRadius: '20px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box my={2}>
                <FormControl fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: '1px solid #D9D9D9',
                                borderRadius: '3px',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            backgroundColor: 'transparent',
                            '&.Mui-focused': {
                                color: '#000',
                            },
                        },
                        '& .MuiInputBase-root': {
                            borderRadius: '3px',
                            '&.Mui-focused fieldset': {
                                borderColor: 'black',
                            },
                        },
                    }}>
                    <InputLabel id="sort-label">Sorted By</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        label="Sorted By"
                        value={sortValue}
                        onChange={handleSortChange}
                    >
                        <MenuItem value="orderNumber">Order Number</MenuItem>
                        <MenuItem value="priceLTH">Price: Low To High</MenuItem>
                        <MenuItem value="priceHTL">Price: High To Low</MenuItem>
                        <MenuItem value="orderDateNTO">Order Date: New To Old</MenuItem>
                        <MenuItem value="orderDateOTN">Order Date: Old To New</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box my={2} sx={{
                border: '1px solid #D9D9D9',
                borderRadius: '3px',
                paddingBlock: 1,
                pl: 2,
            }}>
                <Typography sx={{ color: 'black', fontSize: '1.3rem' }}>ORDERING OPTIONS</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox
                        checked={checked.delivery}
                        onChange={handleChangeOptions}
                        name="delivery"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="Delivery" />
                    <FormControlLabel control={<Checkbox
                        checked={checked.dine_in}
                        onChange={handleChangeOptions}
                        name="dine_in"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="Dine In" />
                    <FormControlLabel control={<Checkbox
                        checked={checked.pickup}
                        onChange={handleChangeOptions}
                        name="pickup"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="Pick Up" />
                </FormGroup>
            </Box>
            <Box my={2} sx={{
                border: '1px solid #D9D9D9',
                borderRadius: '3px',
                paddingBlock: 1,
                pl: 2,
            }}>
                <Typography sx={{ color: 'black', fontSize: '1.3rem' }}>ORDER STATUS</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox
                        checked={checkedStatus.pending}
                        onChange={handleChangeStatus}
                        name="pending"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="Pending" />
                    <FormControlLabel control={<Checkbox
                        checked={checkedStatus.finished}
                        onChange={handleChangeStatus}
                        name="finished"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="Finished" />
                    <FormControlLabel control={<Checkbox
                        checked={checkedStatus.preparing}
                        onChange={handleChangeStatus}
                        name="preparing"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="Preparing" />
                    <FormControlLabel control={<Checkbox
                        checked={checkedStatus.in_transite}
                        onChange={handleChangeStatus}
                        name="in_transite"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="In transit" />
                    <FormControlLabel control={<Checkbox
                        checked={checkedStatus.delayed}
                        onChange={handleChangeStatus}
                        name="delayed"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="Delayed" />
                    <FormControlLabel control={<Checkbox
                        checked={checkedStatus.delivered}
                        onChange={handleChangeStatus}
                        name="delivered"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="Delivered" />
                    <FormControlLabel control={<Checkbox
                        checked={checkedStatus.canceled}
                        onChange={handleChangeStatus}
                        name="canceled"
                        sx={{
                            '&.Mui-checked': {
                                color: '#AD343E',
                            },
                        }}
                    />} label="Canceled" />
                </FormGroup>
            </Box>
        </Container>
    );
};

export default OrderInfo;
