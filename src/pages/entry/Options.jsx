import axios from 'axios';
import { useState, useEffect } from 'react';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { formatCurrency } from '../../utilities';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  /* const [total, setTotal] = useContext() */

  const { totals } = useOrderDetails();

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    // create an abortController to attach to network request
    const controller = new AbortController();
    /*     axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((res) => setItems(res.data))
      .catch((err) => {
        if (err.name !== 'CanceledError') setError(true);
      }); */
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3030/${optionType}`, {
          signal: controller.signal,
        });

        setItems(res.data);
      } catch (error) {
        if (error.name !== 'CanceledError') setError(true);
      }
    }

    fetchData();

    // abort axios call on component unmount
    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
