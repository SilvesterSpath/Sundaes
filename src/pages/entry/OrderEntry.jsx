import React from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

const OrderEntry = () => {
  const { grand_total } = useOrderDetails();

  return (
    <>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {formatCurrency(grand_total)}</h2>
    </>
  );
};

export default OrderEntry;
