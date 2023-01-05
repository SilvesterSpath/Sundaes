import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    /*     axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((error) => {
        console.log(error);
      }) */

    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h1>Options</h1>
      <Row>{optionItems}</Row>
    </>
  );
}
