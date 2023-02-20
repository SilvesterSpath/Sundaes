import { render, screen } from '../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Order phases for happy path', async () => {
  const user = userEvent.setup();
  // render app
  // Don't need to wrap in provider; already wrapped!
  // destructure 'unmount' from return value to use at the end of the test
  const { unmount } = render(<App />);

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

  const scoops = screen.getByText(/scoops/i, { exact: false });
  expect(scoops).toHaveTextContent('2.00');

  const toppings = screen.getByText(/toppings/i, { exact: false });
  expect(toppings).toHaveTextContent('1.50');

  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('Erdbeere')).toBeInTheDocument();

  // alternatively..
  // const optionItems = screen.getAllByRole('listitem')
  // const optionItemsText = optionItems.map((item)=> item.textContent)
  // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries'])

  // accept terms and conditions and click button to confirm order
  const agreeCheckbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  });

  await user.click(agreeCheckbox);

  const confirmOrderButton = await screen.findByRole('button', {
    name: /confirm order/i,
  });

  expect(confirmOrderButton).toBeInTheDocument();

  await user.click(confirmOrderButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // Check confirmation page text
  // this one is async because there is a POST request to server in between summary
  // and confirmation pages
  const thankYouHeader = await screen.findByText(/thank you/i);
  expect(thankYouHeader).toBeInTheDocument();

  // expect that "loading" has dissapeared
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);

  expect(orderNumber).toBeInTheDocument();
  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotal have been reset
  const heading = await screen.findByText(/design your sundae/i);
  expect(heading).toBeInTheDocument();

  const scoopsTotal2 = await screen.findByText(/scoops total/i);
  expect(scoopsTotal2).toHaveTextContent('0.00');

  const toppingsTotal2 = await screen.findByText(/toppings total/i);
  expect(toppingsTotal2).toHaveTextContent('0.00');

  // do we need to await anything to avoid test errors?

  // unmount the component explicitly to trigger cleanup and avoid
  // 'not wrapped in act()' error
  unmount();
});

test('Optional toppings on summary page', async () => {
  const user = userEvent.setup();
  // render app
  // Don't need to wrap in provider; already wrapped!
  // destructure 'unmount' from return value to use at the end of the test
  render(<App />);

  const scoopsTotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsTotal).toHaveTextContent('0.00');

  // this should be async because we get the data from the server
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  expect(scoopsTotal).toHaveTextContent('2.00');

  // add then remove toppings
  const erdbeereCheckbox = await screen.findByRole('checkbox', {
    name: /erdbeere/i,
  });

  await user.click(erdbeereCheckbox);

  const toppingsTotal = screen.getByText(/toppings total/i);
  expect(toppingsTotal).toHaveTextContent('1.50');

  await user.click(erdbeereCheckbox);
  expect(toppingsTotal).toHaveTextContent('0.00');

  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  await user.click(orderButton);

  // check for ordersummary
  const orderSummary = screen.getByText(/ordersummary/i);
  expect(orderSummary).toBeInTheDocument();

  // check for scoops heading
  const scoopsHeading = screen.getByRole('heading', { name: /scoops/i });
  expect(scoopsHeading).toBeInTheDocument();

  // check for toppings is NOT in the document
  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
