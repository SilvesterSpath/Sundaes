import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test('Red box for invalid input', async () => {
  const user = userEvent.setup();

  render(<ScoopOption name={'Vanilla'} />);

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1.5');

  /* const inputField = screen.getByLabelText(/vanilla/i); */
  console.log(vanillaInput);

  expect(vanillaInput).toHaveClass('is-invalid');
});
