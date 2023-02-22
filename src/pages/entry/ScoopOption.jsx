import { useState, useRef, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function ScoopOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e) => {
    const currentValue = e.target.value;

    const isValidValue =
      currentValue % 1 === 0 && currentValue < 10 && currentValue >= 0;

    const newValue = isValidValue ? parseInt(currentValue) : 0;

    setIsInvalid(
      currentValue % 1 > 0 || currentValue >= 10 || currentValue < 0
    );

    updateItemCount(name, newValue, 'scoops');

    /*     if (isValidValue) {
      updateItemCount(name, parseInt(currentValue), 'scoops');
    } else {
      updateItemCount(name, parseInt(0), 'scoops');
    } */
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs='6' style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Control
            isInvalid={isInvalid}
            type='number'
            defaultValue={0}
            onChange={handleChange}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
}
