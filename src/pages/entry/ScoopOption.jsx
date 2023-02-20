import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useState } from 'react';

export default function ScoopOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    updateItemCount(name, parseInt(e.target.value), 'scoops');
    setValue(e.target.value);
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
            className={
              value % 1 > 0 || value >= 20 || value < 0 ? 'is-invalid' : ' '
            }
            value={value}
            type='number'
            onChange={handleChange}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
}
