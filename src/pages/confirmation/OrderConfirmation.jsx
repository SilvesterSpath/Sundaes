import { useState, useEffect } from 'react';
import axios from 'axios';
import { useOrderDetails } from '../../contexts/OrderDetails';
import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    const controller = new AbortController();

    const getOrderDetails = async () => {
      try {
        const orderDetails = await axios.post('http://localhost:3030/order', {
          signal: controller.signal,
        });

        setOrderNumber(orderDetails.data.orderNumber);
      } catch (error) {
        if (error.name !== 'CanceledError') setError(true);
      }
    };

    setTimeout(() => {
      getOrderDetails();
    }, 500);

    // abort axios call on component unmount
    return () => {
      controller.abort();
    };
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (error) {
    return <AlertBanner />;
  }

  if (orderNumber) {
    return (
      <>
        <h1>Thank you</h1>
        <p>Order Number: {orderNumber}</p>
        <button onClick={handleClick}>New Order</button>
      </>
    );
  } else {
    return <div>Loading..</div>;
  }
};

export default OrderConfirmation;
