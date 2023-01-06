import React from 'react';
import Options from './Options';

const OrderEntry = () => {
  return (
    <>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
    </>
  );
};

export default OrderEntry;
