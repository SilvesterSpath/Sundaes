import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderConfirmation from '../OrderConfirmation';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('server error on order confirmation', async () => {
  // overriding the actual handlers with error responses
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  // to get all 'alert' we can use waitFor(async ()=>{})
  await waitFor(async () => {
    const alerts = await screen.findByRole('alert');
    /*     const alerts = await screen.findAllByText(
        /An unexpected error occured. Please try again later./i
      ); */

    expect(alerts).toHaveTextContent(
      'An unexpected error occured. Please try again later.'
    );
  });
});
