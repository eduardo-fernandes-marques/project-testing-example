import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { rest, server } from '@configs/test/server';
import {
  changeInputMaskValue,
  renderWithContext,
  screen,
  userEvent,
  waitFor,
} from '@tests/custom-testing-library';

import { ENDPOINT } from '@utils/constants';
import { ERROR } from '@utils/validations';

import { Personal } from '.';

import type { Props } from '.';

const onSubmit = jest.fn();

const props: Props = {
  onSubmit,
};

jest.mock('react-google-recaptcha-v3');

server.use(
  rest.post(ENDPOINT.RECAPTCHA.VALIDATE(), (_, response, context) =>
    response(context.status(200), context.json(true))
  )
);

describe('personal', () => {
  beforeEach(() => {
    (useGoogleReCaptcha as jest.Mock).mockImplementation(() => ({
      executeRecaptcha: jest.fn().mockResolvedValue(true),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render component', async () => {
    renderWithContext(<Personal {...props} />);

    expect(screen.getByRole('button', { name: /Avançar/i })).toBeInTheDocument();
  });

  it('should handle submit', async () => {
    renderWithContext(<Personal {...props} />);

    const [name, email, phone] = screen.getAllByRole('textbox') as HTMLInputElement[];

    await waitFor(() => userEvent.type(name, 'Test'));
    await waitFor(() => userEvent.type(email, 'test@example.com'));

    await waitFor(() => changeInputMaskValue(phone, '51982661635'));

    const acceptedPrivacyPolicy = screen.getByRole('checkbox');

    userEvent.click(acceptedPrivacyPolicy);

    userEvent.click(screen.getByText('Avançar'));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('should handle form error', async () => {
    renderWithContext(<Personal {...props} />);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(screen.getAllByText(ERROR.REQUIRED).length).toBe(4));
  });

  it('should handle recaptcha execute error', async () => {
    (useGoogleReCaptcha as jest.Mock).mockImplementation(() => ({
      executeRecaptcha: undefined,
    }));

    renderWithContext(<Personal {...props} />);

    const [name, email, phone] = screen.getAllByRole('textbox') as HTMLInputElement[];

    await waitFor(() => userEvent.type(name, 'Test'));
    await waitFor(() => userEvent.type(email, 'test@example.com'));
    await waitFor(() => changeInputMaskValue(phone, '51982661635'));

    const acceptedPrivacyPolicy = screen.getByRole('checkbox');

    userEvent.click(acceptedPrivacyPolicy);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(screen.getByText(ERROR.FORM)).toBeInTheDocument());
  });

  it('should handle recaptcha validate error', async () => {
    server.use(
      rest.post(ENDPOINT.RECAPTCHA.VALIDATE(), (_, response, context) => {
        return response(context.status(200), context.json(false));
      })
    );

    renderWithContext(<Personal {...props} />);

    const [name, email, phone] = screen.getAllByRole('textbox') as HTMLInputElement[];

    await waitFor(() => userEvent.type(name, 'Test'));
    await waitFor(() => userEvent.type(email, 'test@example.com'));
    await waitFor(() => changeInputMaskValue(phone, '51982661635'));

    const acceptedPrivacyPolicy = screen.getByRole('checkbox');

    userEvent.click(acceptedPrivacyPolicy);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(screen.getByText(ERROR.FORM)).toBeInTheDocument());
  });

  it('should handle submit error', async () => {
    renderWithContext(<Personal {...props} onSubmit={jest.fn().mockRejectedValue(new Error())} />);

    const [name, email, phone] = screen.getAllByRole('textbox') as HTMLInputElement[];

    await waitFor(() => userEvent.type(name, 'Test'));
    await waitFor(() => userEvent.type(email, 'test@example.com'));
    await waitFor(() => changeInputMaskValue(phone, '51982661635'));

    const acceptedPrivacyPolicy = screen.getByRole('checkbox');

    userEvent.click(acceptedPrivacyPolicy);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(ERROR.FORM)).toBeInTheDocument());
  });
});
