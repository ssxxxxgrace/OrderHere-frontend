import React, { useState } from 'react';
import * as Action from '../../store/actionTypes';
import { useDispatch, useSelector } from 'react-redux';

const Nav = () => {
  // const [active, setActive] = useState('All');
  const dispatch = useDispatch();
  const active = useSelector((state) => state.history.active);

  const handleButtonClick = (buttonName) => {
    dispatch({
      type: Action.SET_ACTIVE_NAV,
      payload: buttonName.toLowerCase(),
    });
    // setActive(buttonName);
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 5em',
  };

  const buttonStyle = (buttonName) => ({
    fontSize: '1em',
    fontWeight: 700,
    backgroundColor:
      active === buttonName.toLowerCase() ? '#AD343E' : 'transparent',
    color: active === buttonName.toLowerCase() ? '#FFFFFF' : '#2C2F24',
    borderRadius: '50px',
    border: active === buttonName.toLowerCase() ? 'none' : '2px solid #DBDFD0',
    padding: '1em 3em',
    cursor: 'pointer',
    outline: 'none',
    margin: '2em 3em',
  });

  return (
    <div style={navStyle}>
      <button
        style={buttonStyle('All')}
        onClick={() => handleButtonClick('All')}
      >
        All
      </button>
      <button
        style={buttonStyle('Delivery')}
        onClick={() => handleButtonClick('Delivery')}
      >
        Delivery
      </button>
      <button
        style={buttonStyle('PickUp')}
        onClick={() => handleButtonClick('PickUp')}
      >
        PickUp
      </button>
      <button
        style={buttonStyle('DineIn')}
        onClick={() => handleButtonClick('DineIn')}
      >
        DineIn
      </button>
    </div>
  );
};

export default Nav;
