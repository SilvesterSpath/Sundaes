import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType='scoops' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((i) => i.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
  render(<Options optionType='toppings' />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /topping$/i });

  expect(scoopImages).toHaveLength(3);

  // confirm alt text of images
  const altText = scoopImages.map((i) => i.alt);
  expect(altText).toEqual([
    'Himbeere topping',
    'Erdbeere topping',
    'Cherries topping',
  ]);
});

test('no scoopstotal update for invalid scoop count', async () => {
  const user = userEvent.setup();
  render(<Options optionType={'scoops'} />);

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
