import { rest, server } from '@configs/test/server';
import {
  renderWithContext,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@tests/custom-testing-library';

import * as leadContext from '@contexts/lead';
import * as stepContext from '@contexts/step';

import { ENDPOINT } from '@utils/constants';
import { ERROR } from '@utils/validations';

import { useLeadContextMock } from '@mocks/useLeadContext.mock';
import { useStepContextMock } from '@mocks/useStepContext.mock';

import { OneTimePassword } from '.';

const mockUseStepContext = jest.spyOn(stepContext, 'useStepContext');

const mockUseLeadContext = jest.spyOn(leadContext, 'useLeadContext');

const onSubmit = jest.fn();

const props = {
  onSubmit,
  segments: [],
  revenues: [],
};

server.use(
  rest.post(ENDPOINT.LEAD.ACTIVATE('fake-id'), (_, response, context) => {
    return response(context.status(200), context.json({}));
  }),
  rest.get(ENDPOINT.LEAD.OTP.RESEND('fake-id'), (_, response, context) => {
    return response(context.status(200), context.json({}));
  })
);

describe('OneTimePassword', () => {
  beforeEach(() => {
    mockUseLeadContext.mockReturnValue(useLeadContextMock);
    mockUseStepContext.mockReturnValue(useStepContextMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render component', async () => {
    renderWithContext(<OneTimePassword {...props} />);

    expect(screen.getByRole('button', { name: /Avançar/i })).toBeInTheDocument();
  });

  it('should handle submit', async () => {
    renderWithContext(<OneTimePassword {...props} />);

    const [zero, one, two, three, four, five] = screen.getAllByRole('textbox');

    await waitFor(() => userEvent.type(zero, '1'));
    await waitFor(() => userEvent.type(one, '2'));
    await waitFor(() => userEvent.type(two, '3'));
    await waitFor(() => userEvent.type(three, '4'));
    await waitFor(() => userEvent.type(four, '5'));
    await waitFor(() => userEvent.type(five, '6'));

    userEvent.click(screen.getByText('Avançar'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText('Avançar')).toBeInTheDocument());
  });

  it('should handle submit with copy and paste', async () => {
    renderWithContext(<OneTimePassword {...props} />);

    const [zero] = screen.getAllByRole('textbox');

    zero.focus();
    userEvent.paste('123456');

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText('Avançar')).toBeInTheDocument());
  });

  it('should handle resend otp', async () => {
    renderWithContext(<OneTimePassword {...props} />);

    const resend = screen.getByRole('button', { name: /Reenviar código/i });
    userEvent.click(resend);

    waitForElementToBeRemoved(resend);

    await waitFor(() =>
      expect(screen.getByText('Verifique seu e-mail para recuperar o código')).toBeInTheDocument()
    );
  });

  it('should handle form error', async () => {
    renderWithContext(<OneTimePassword {...props} />);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(screen.getAllByText(ERROR.REQUIRED).length).toBe(1));
  });

  it('should handle submit error', async () => {
    server.use(
      rest.post(ENDPOINT.LEAD.ACTIVATE('fake-id'), (_, response, context) => {
        return response(context.status(500), context.json(`Unknown error`));
      })
    );

    renderWithContext(<OneTimePassword {...props} />);

    const [zero, one, two, three, four, five] = screen.getAllByRole('textbox');

    await waitFor(() => userEvent.type(zero, '1'));
    await waitFor(() => userEvent.type(one, '2'));
    await waitFor(() => userEvent.type(two, '3'));
    await waitFor(() => userEvent.type(three, '4'));
    await waitFor(() => userEvent.type(four, '5'));
    await waitFor(() => userEvent.type(five, '6'));

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(screen.getByText(ERROR.FORM)).toBeInTheDocument());
  });
});
