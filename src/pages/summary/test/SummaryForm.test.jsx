import { fireEvent, render, screen } from '@testing-library/react';
import SummeryForm from '../SummaryForm.jsx';

test('checkbox is unchecked by default', () => {
  render(<SummeryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const buttonEl = screen.getByRole('button', { name: /confirm order/i });

  expect(checkbox).not.toBeChecked();

  expect(buttonEl).toBeDisabled();
});

test('checking checkbox enables button, unchecking disables', () => {
  render(<SummeryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const buttonEl = screen.getByRole('button', { name: /confirm order/i });

  fireEvent.click(checkbox);
  expect(buttonEl).toBeEnabled();

  fireEvent.click(checkbox);
  expect(buttonEl).toBeDisabled();
});
