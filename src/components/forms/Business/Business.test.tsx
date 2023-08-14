import { rest, server } from '@configs/test/server';
import {
  changeInputMaskValue,
  renderWithContext,
  screen,
  userEvent,
  waitFor,
} from '@tests/custom-testing-library';
import { resources } from '@tests/fixtures.json';

import { ENDPOINT } from '@utils/constants';
import { ERROR } from '@utils/validations';

import { Business } from '.';

import type { Props } from '.';

const onSubmit = jest.fn();

const { revenues, segments } = resources;

const props: Props = {
  onSubmit,
  revenues,
  segments,
};

server.use(
  rest.post(ENDPOINT.RECAPTCHA.VALIDATE(), (_, response, context) =>
    response(context.status(200), context.json(true))
  )
);

describe('business', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render component', async () => {
    renderWithContext(<Business {...props} />);

    expect(screen.getByRole('button', { name: /Avançar/i })).toBeInTheDocument();
  });

  it('should handle submit', async () => {
    renderWithContext(<Business {...props} />);

    const radio = screen.getByRole('radio', { name: /Pessoa física/i });
    await waitFor(() => userEvent.click(radio));

    const storeName = screen.getByPlaceholderText(/Nome da loja/i);
    await waitFor(() => userEvent.type(storeName, 'Test'));

    const document = screen.getByPlaceholderText(/CPF/i) as HTMLInputElement;
    userEvent.click(document);
    await waitFor(() => {
      changeInputMaskValue(document, '30947840036');
    });

    const [first, second] = await waitFor(() => screen.getAllByRole('combobox'));
    userEvent.selectOptions(first, 'New Test');
    userEvent.selectOptions(second, 'New Test');

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('should handle person type change', async () => {
    renderWithContext(<Business {...props} />);

    const radio = screen.getByRole('radio', { name: /Pessoa jurídica/i });
    await waitFor(() => userEvent.click(radio));

    const storeName = screen.getByPlaceholderText(/Nome da loja/i);
    await waitFor(() => userEvent.type(storeName, 'Test'));

    const corporativeName = screen.getByPlaceholderText(/Razão social/i);
    userEvent.click(corporativeName);
    await waitFor(() => userEvent.type(corporativeName, 'Corporative name'));

    const document = screen.getByPlaceholderText(/CNPJ/i) as HTMLInputElement;
    userEvent.click(document);
    await waitFor(() => {
      changeInputMaskValue(document, '65262841000112');
    });

    const [first, second] = await waitFor(() => screen.getAllByRole('combobox'));
    userEvent.selectOptions(first, 'New Test');
    userEvent.selectOptions(second, 'New Test');

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('should handle form error', async () => {
    renderWithContext(<Business {...props} />);

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(screen.getAllByText(ERROR.REQUIRED).length).toBe(5));
  });

  it('should handle submit error', async () => {
    renderWithContext(<Business {...props} onSubmit={jest.fn().mockRejectedValue(new Error())} />);

    const radio = screen.getByRole('radio', { name: /Pessoa física/i });
    await waitFor(() => userEvent.click(radio));

    const storeName = screen.getByPlaceholderText(/Nome da loja/i);
    await waitFor(() => userEvent.type(storeName, 'Test'));

    const document = screen.getByPlaceholderText(/CPF/i) as HTMLInputElement;
    userEvent.click(document);
    await waitFor(() => {
      changeInputMaskValue(document, '30947840036');
    });

    const [first, second] = await waitFor(() => screen.getAllByRole('combobox'));
    userEvent.selectOptions(first, 'New Test');
    userEvent.selectOptions(second, 'New Test');

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(ERROR.FORM)).toBeInTheDocument());
  });
});
