import './App.css';
import Container from 'react-bootstrap/Container';
import SummaryForm from './pages/summary/SummaryForm.jsx';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
        <SummaryForm />
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  );
}

export default App;
