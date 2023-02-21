import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test('Red box for invalid input', async () => {
  const user = userEvent.setup();

  // this will render a normal 'empty' <Option /> component
  render(<ScoopOption />);

  const scoopInput = screen.getByRole('spinbutton');

  // testing decimal input
  await user.clear(scoopInput);
  await user.type(scoopInput, '1.5');

  expect(scoopInput).toHaveClass('is-invalid');

  // testing negative input
  await user.clear(scoopInput);
  await user.type(scoopInput, '-1');

  expect(scoopInput).toHaveClass('is-invalid');

  // testing to high input
  await user.clear(scoopInput);
  await user.type(scoopInput, '11');

  expect(scoopInput).toHaveClass('is-invalid');

  // testing valid input
  await user.clear(scoopInput);
  await user.type(scoopInput, '3');

  expect(scoopInput).not.toHaveClass('is-invalid');
});
