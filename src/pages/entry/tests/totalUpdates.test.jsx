import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
// No longer necessary because of importing from testing-library-utils
/* import { OrderDetailsProvider } from '../../../contexts/OrderDetails'; */
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(
    <Options optionType='scoops' /> /* , { wrapper: OrderDetailsProvider } */
  );

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and ckeck subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');

  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  const user = userEvent.setup();

  render(<Options optionType='toppings' />);

  // make sure total starts out at $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // tick Himbeere box and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });

  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // tick Erdbeere box and check subtotal
  const erdbeereCheckbox = await screen.findByRole('checkbox', {
    name: /erdbeere/i,
  });

  await user.click(erdbeereCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // remove Erdbeere and check subtotal
  await user.click(erdbeereCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});
