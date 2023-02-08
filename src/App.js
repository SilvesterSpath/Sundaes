import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderSummary from './pages/summary/OrderSummary';
import SummaryForm from './pages/summary/SummaryForm';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and Entry page need provider */}
        {orderPhase === 'inProgress' ? (
          <OrderEntry setOrderPhase={setOrderPhase} />
        ) : orderPhase === 'review' ? (
          <OrderSummary setOrderPhase={setOrderPhase} />
        ) : orderPhase === 'completed' ? (
          <OrderConfirmation />
        ) : null}
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  );
}

export default App;
