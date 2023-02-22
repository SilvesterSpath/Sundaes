import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('no scoopstotal update for invalid scoop count', async () => {
  const user = userEvent.setup();
  render(<App />);

  const scoopsTotal = screen.getByText(/scoops total/i, { exact: false });
  expect(scoopsTotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });

  expect(vanillaInput).toBeInTheDocument();

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '8');

  expect(scoopsTotal).toHaveTextContent('16.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');

  expect(scoopsTotal).toHaveTextContent('0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '10');

  expect(scoopsTotal).toHaveTextContent('0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1.5');

  expect(scoopsTotal).toHaveTextContent('0.00');
});
