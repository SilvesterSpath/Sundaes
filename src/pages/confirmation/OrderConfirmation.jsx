import { useState, useEffect } from 'react';
import axios from 'axios';
import { useOrderDetails } from '../../contexts/OrderDetails';
import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const orderDetails = await axios.post('http://localhost:3030/order');

        setOrderNumber(orderDetails.data.orderNumber);
      } catch (error) {
        setError(error);
      }
    };

    getOrderDetails();
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (error) {
    return <AlertBanner />;
  }

  return (
    <>
      <h1>Thank you</h1>
      <p>Order Number: {orderNumber}</p>
      <button onClick={handleClick}>New Order</button>
    </>
  );
};

export default OrderConfirmation;
