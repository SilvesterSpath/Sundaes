import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

  const optionItems = items.map((i) => (
    <ItemComponent key={i.name} name={i.name} imagePath={i.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
}
