import { render, screen } from '../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Order phases for happy path', async () => {
  const user = userEvent.setup();
  // render app
  render(<App />);
  // add ice cream scoops and toppings
  const scoopsTotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsTotal).toHaveTextContent('0.00');

  // this should be async because we get the data from the server
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  expect(scoopsTotal).toHaveTextContent('2.00');

  const erdbeereCheckbox = await screen.findByRole('checkbox', {
    name: /erdbeere/i,
  });

  await user.click(erdbeereCheckbox);

  const toppingsTotal = screen.getByText(/toppings total/i);
  expect(toppingsTotal).toHaveTextContent('1.50');

  // find and click order button
  const orderButton = screen.getByRole('button', { name: /order sundae/i });

  await user.click(orderButton);
  // check summary information based on order
  const orderSummary = screen.getByText(/ordersummary/i);
  expect(orderSummary).toBeInTheDocument();

  const scoops = screen.getByText(/scoops/i);
  expect(scoops).toHaveTextContent('2.00');

  const toppings = screen.getByText(/toppings/i);
  expect(toppings).toHaveTextContent('1.50');
  // accept terms and conditions and click button to confirm order
  const agreeCheckbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  });

  await user.click(agreeCheckbox);

  const confirmOrderButton = await screen.findByRole('button', {
    name: /confirm order/i,
  });

  await user.click(confirmOrderButton);
  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/orderConfirmation/i, {
    exact: false,
  });

  console.log('orderNumber', orderNumber);

  expect(orderNumber).toHaveTextContent(/orderconfirmation/i);
  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });

  await user.click(newOrderButton);
  // check that scoops and toppings subtotal have been reset
  expect(scoopsTotal).toHaveTextContent('0.00');
  // do we need to await anything to avoid test errors?
});
