import React, { useRef, useState } from 'react';
import { Avatar, Box, ButtonBase } from '@mui/material';
import AccountPopover from './AccountPopover';
import { useSelector, useDispatch } from 'react-redux';

import SignDialog from '../Sign/SignDialog';
import Login from '../Sign/Login';
import Signup from '../Sign/Signup';
import {
  openSignDialog,
  closeSignDialog,
  registerSignDialog,
  loginSignDialog,
} from '../../store/actions/signAction';

const AccountButton = ({ isLogin }) => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const { myDetail } = useSelector((state) => state.sign);

  //state to manage signIn dialog
  const { isOpen, content } = useSelector((state) => state.sign);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    if (!isLogin) {
      dispatch(openSignDialog());
    } else {
      setOpenPopover(isLogin);
    }
  };

  return (
    <>
      {/* Open the SignIn Dialog is isLogin is false  */}
      {isOpen && (
        <SignDialog isOpen={isOpen} onClose={() => dispatch(closeSignDialog())}>
          {content === 'login' ? (
            <Login register={() => dispatch(registerSignDialog())} />
          ) : (
            <Signup login={() => dispatch(loginSignDialog())} />
          )}
        </SignDialog>
      )}

      {/* Open the AccountPopover Dialog is isLogin is true  */}
      {myDetail && (
        <AccountPopover
          anchorEl={anchorRef.current}
          onClose={() => setOpenPopover(false)}
          open={openPopover}
        />
      )}

      <Box
        component={ButtonBase}
        onClick={() => handleButtonClick()}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={myDetail ? myDetail.headImgUrl : ''}
        />
      </Box>
      {myDetail && (
        <AccountPopover
          anchorEl={anchorRef.current}
          onClose={() => setOpenPopover(false)}
          open={openPopover}
        />
      )}
    </>
  );
};

export default AccountButton;
