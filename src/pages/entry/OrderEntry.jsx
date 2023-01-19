import React from 'react';
import OrderSummary from '../summary/OrderSummary';
import Options from './Options';

const OrderEntry = () => {
  return (
    <>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <OrderSummary />
    </>
  );
};

export default OrderEntry;
