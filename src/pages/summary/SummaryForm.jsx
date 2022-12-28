import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <input
        id='terms-and-conditions'
        type='checkbox'
        onClick={(e) => {
          setDisabled(!e.target.checked);
        }}
      />{' '}
      <label htmlFor='terms-and-conditions'>
        I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </label>
      <button
        style={{ display: 'block', margin: '10px auto' }}
        disabled={disabled}
      >
        Confirm order
      </button>
    </>
  );
};

export default SummaryForm;
