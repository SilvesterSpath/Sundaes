import { useContext, useState, createContext } from 'react';
import { pricePerItem } from '../constants/index';

const OrderDetails = createContext();

// create custom hook to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from whithin an OrderDetailsProvider'
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  // this is a getter and setter
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // example: { Chocolate: 1, Vanilla: 2 }
    toppings: {}, // example: { 'Gummi Bears': 1 }
  });

  // this is a setter
  function updateItemCount(itemName, newItemCount, optionType) {
    // make a copy of existing state
    const newOptionCounts = { ...optionCounts };

    // update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    // update the state with the new information
    setOptionCounts(newOptionCounts);
  }

  // this is a setter
  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  // utility function to derive totals from optionCounts state value
  function calculateTotal(optionType) {
    // get an array of counts for the option type (for example, [1, 2])
    const countsArray = Object.values(optionCounts[optionType]);

    // total the values in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    // multiply the total number of items by the price for this item type
    const totalPrice = totalCount * pricePerItem[optionType];

    return totalPrice;
  }

  // this is a getter
  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };

  const grand_total = totals.scoops + totals.toppings;

  const value = {
    optionCounts,
    totals,
    grand_total,
    updateItemCount,
    resetOrder,
  };

  return <OrderDetails.Provider value={value} {...props} />;
}
