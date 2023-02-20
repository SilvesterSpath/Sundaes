import React from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

const OrderEntry = ({ setOrderPhase }) => {
  const { grand_total, totals } = useOrderDetails();

  const handleClick = () => {
    setOrderPhase('review');
  };

  return (
    <>
      <h1>Design your sundae</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {formatCurrency(grand_total)}</h2>
      <button onClick={handleClick} disabled={totals.scoops > 0 ? false : true}>
        Order Sundae
      </button>
    </>
  );
};

export default OrderEntry;
