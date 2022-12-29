import { render, screen } from '@testing-library/react'; // deconstruction from the object
import SummeryForm from '../SummaryForm.jsx';
import userEvent from '@testing-library/user-event'; //this is default export

test('checkbox is unchecked by default', () => {
  render(<SummeryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const buttonEl = screen.getByRole('button', { name: /confirm order/i });

  expect(checkbox).not.toBeChecked();

  expect(buttonEl).toBeDisabled();
});

test('checking checkbox enables button, unchecking disables', async () => {
  const user = userEvent.setup();

  render(<SummeryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const buttonEl = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkbox);
  expect(buttonEl).toBeEnabled();

  await user.click(checkbox);
  expect(buttonEl).toBeDisabled();
});

test('popover responds to hover', async () => {
  const user = userEvent.setup();

  render(<SummeryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  await user.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);

  expect(popover).toBeInTheDocument();

  // popover dissapear when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
