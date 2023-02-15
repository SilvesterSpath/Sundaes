import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test.only('handels error for scoops and toppings routes', async () => {
  // overriding the actual handlers with error responses
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // to get all 'alert' we can use waitFor(async ()=>{})
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    /*     const alerts = await screen.findAllByText(
      /An unexpected error occured. Please try again later./i
    ); */
    expect(alerts).toHaveLength(2);
  });
});
