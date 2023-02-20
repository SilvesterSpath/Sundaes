import SummaryForm from '../summary/SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

const OrderSummary = ({ setOrderPhase }) => {
  const { totals, optionCounts } = useOrderDetails();

  const countsArray = Object.entries(optionCounts['scoops']); // [["chocolate", 2], ["vanilla", 1]]
  const scoopList = countsArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Object.keys(optionCounts['toppings']); // ["Gummy Bear","M&Ms"]
  const toppingList = toppingsArray.map((item) => <li key={item}>{item}</li>);

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>

      {totals.toppings > 0 ? (
        <>
          <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
          <ul>{toppingList}</ul>
        </>
      ) : null}

      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
