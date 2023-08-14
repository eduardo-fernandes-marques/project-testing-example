/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { rest, server } from '@configs/test/server';
import {
  changeInputMaskValue,
  getDefaultNormalizer,
  renderWithContext,
  screen,
  userEvent,
  waitFor,
} from '@tests/custom-testing-library';

import { COMPLETE_FLOW } from '@hooks/useStep';

import Home from '@pages';

import { ENDPOINT } from '@utils/constants';

import { lead, resources } from './fixtures.json';

jest.mock('react-google-recaptcha-v3');

server.use(
  rest.get(ENDPOINT.FLOW.RESOURCES(), (_, response, context) => {
    return response(context.status(200), context.json(resources));
  }),
  rest.post(ENDPOINT.RECAPTCHA.VALIDATE(), (_, response, context) => {
    return response(context.status(200), context.json(true));
  }),
  rest.patch(ENDPOINT.LEAD.UPDATE(lead.id), (_, response, context) => {
    return response(context.status(201), context.json(lead));
  }),
  rest.post(ENDPOINT.LEAD.CREATE, (_, response, context) => {
    return response(context.status(201), context.json(lead));
  }),
  rest.post(ENDPOINT.LEAD.ACTIVATE(lead.id), (_, response, context) => {
    return response(context.status(200), context.json({}));
  }),
  rest.post(ENDPOINT.LEAD.SUBMIT(lead.id), (_, response, context) => {
    return response(context.status(200), context.json({}));
  })
);

describe('home', () => {
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
    renderWithContext(<Home />);

    await waitFor(() => {
      expect(screen.getByText(COMPLETE_FLOW.FIRST.title)).toBeInTheDocument();
      expect(screen.getByText(COMPLETE_FLOW.FIRST.description)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Avançar/i })).toBeInTheDocument();
    });
  });

  it('should handle previous step', async () => {
    renderWithContext(<Home />);

    const [name, email, phone] = screen.getAllByRole('textbox') as HTMLInputElement[];

    await waitFor(() => userEvent.type(name, 'Test'));
    await waitFor(() => userEvent.type(email, 'test@example.com'));
    await waitFor(() => changeInputMaskValue(phone, '51999999999'));

    const acceptedPrivacyPolicy = screen.getByRole('checkbox');

    await waitFor(() => userEvent.click(acceptedPrivacyPolicy));

    userEvent.click(screen.getByText('Avançar'));

    await waitFor(() => {
      expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
      expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Voltar'));

    await waitFor(() => {
      expect(screen.getByText(COMPLETE_FLOW.FIRST.title)).toBeInTheDocument();
      expect(screen.getByText(COMPLETE_FLOW.FIRST.description)).toBeInTheDocument();
    });
  });

  describe('complete flow', () => {
    it('should render second step', async () => {
      renderWithContext(<Home />);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });
    });

    it('should render thrid step', async () => {
      renderWithContext(<Home />);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

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

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });
    });

    it('should render fourth step', async () => {
      renderWithContext(<Home />);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });

      const [hasECommerce] = screen.getAllByRole('radio');

      await waitFor(() => userEvent.click(hasECommerce));

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.description)).toBeInTheDocument();
      });
    });

    it('should render fifth step', async () => {
      renderWithContext(<Home />);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.description)).toBeInTheDocument();
      });

      const radio = screen.getByLabelText(/vtex/i);

      userEvent.click(radio);
      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.description)).toBeInTheDocument();
      });
    });

    it('should render sixth step', async () => {
      renderWithContext(<Home />);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.description)).toBeInTheDocument();
      });
    });

    it('should render seventh step', async () => {
      renderWithContext(<Home />);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.description)).toBeInTheDocument();
      });

      const plan = screen.getByLabelText(/Scale/i);
      const acceptedTerms = screen.getByLabelText(/Aceito os/i);

      userEvent.click(plan);
      userEvent.click(acceptedTerms);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SEVENTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SEVENTH.description)).toBeInTheDocument();
      });
    });

    it('should render eighth step', async () => {
      renderWithContext(<Home />);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FOURTH.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SEVENTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SEVENTH.description)).toBeInTheDocument();
      });

      const [zero, one, two, three, four, five] = screen.getAllByRole('textbox');

      await waitFor(() => userEvent.type(zero, '1'));
      await waitFor(() => userEvent.type(one, '2'));
      await waitFor(() => userEvent.type(two, '3'));
      await waitFor(() => userEvent.type(three, '4'));
      await waitFor(() => userEvent.type(four, '5'));
      await waitFor(() => userEvent.type(five, '6'));

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.EIGHTH.title)).toBeInTheDocument();
        expect(
          screen.getByText(COMPLETE_FLOW.EIGHTH.description, {
            normalizer: getDefaultNormalizer({ collapseWhitespace: false, trim: false }),
          })
        ).toBeInTheDocument();
      });
    });
  });

  describe('without ecommerce flow', () => {
    it('should render second step', async () => {
      window.sessionStorage.clear();

      renderWithContext(<Home />);

      const [name, email, phone] = screen.getAllByRole('textbox') as HTMLInputElement[];

      await waitFor(() => userEvent.type(name, 'Test'));
      await waitFor(() => userEvent.type(email, 'test@example.com'));
      await waitFor(() => changeInputMaskValue(phone, '51999999999'));

      const acceptedPrivacyPolicy = screen.getByRole('checkbox');

      await waitFor(() => userEvent.click(acceptedPrivacyPolicy));

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

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

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });
    });

    it('should render thrid step', async () => {
      window.sessionStorage.clear();

      renderWithContext(<Home />);

      const [name, email, phone] = screen.getAllByRole('textbox') as HTMLInputElement[];

      await waitFor(() => userEvent.type(name, 'Test'));
      await waitFor(() => userEvent.type(email, 'test@example.com'));
      await waitFor(() => changeInputMaskValue(phone, '51999999999'));

      const acceptedPrivacyPolicy = screen.getByRole('checkbox');

      await waitFor(() => userEvent.click(acceptedPrivacyPolicy));

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

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

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });

      const hasNotECommerce = screen.getByRole('radio', { name: /Estou começando do zero/i });

      userEvent.click(hasNotECommerce);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.description)).toBeInTheDocument();
      });
    });

    it('should render fourth step', async () => {
      window.sessionStorage.clear();

      renderWithContext(<Home />);

      const [name, email, phone] = screen.getAllByRole('textbox') as HTMLInputElement[];

      await waitFor(() => userEvent.type(name, 'Test'));
      await waitFor(() => userEvent.type(email, 'test@example.com'));
      await waitFor(() => changeInputMaskValue(phone, '51999999999'));

      const acceptedPrivacyPolicy = screen.getByRole('checkbox');

      await waitFor(() => userEvent.click(acceptedPrivacyPolicy));

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

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

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });

      const hasNotECommerce = screen.getByRole('radio', { name: /Estou começando do zero/i });

      userEvent.click(hasNotECommerce);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.description)).toBeInTheDocument();
      });

      const plan = screen.getByLabelText(/Scale/i);
      const acceptedTerms = screen.getByRole('checkbox');

      userEvent.click(plan);
      userEvent.click(acceptedTerms);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SEVENTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SEVENTH.description)).toBeInTheDocument();
      });
    });

    it('should render sixth step', async () => {
      window.sessionStorage.clear();

      renderWithContext(<Home />);

      const [name, email, phone] = screen.getAllByRole('textbox') as HTMLInputElement[];

      await waitFor(() => userEvent.type(name, 'Test'));
      await waitFor(() => userEvent.type(email, 'test@example.com'));
      await waitFor(() => changeInputMaskValue(phone, '51999999999'));

      const acceptedPrivacyPolicy = screen.getByRole('checkbox');

      await waitFor(() => userEvent.click(acceptedPrivacyPolicy));

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SECOND.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SECOND.description)).toBeInTheDocument();
      });

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

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.THIRD.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.THIRD.description)).toBeInTheDocument();
      });

      const hasNotECommerce = screen.getByRole('radio', { name: /Estou começando do zero/i });

      userEvent.click(hasNotECommerce);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.FIFTH.description)).toBeInTheDocument();
      });

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.title)).toBeInTheDocument();
        expect(screen.getByText(COMPLETE_FLOW.SIXTH.description)).toBeInTheDocument();
      });

      const plan = screen.getByLabelText(/Scale/i);
      const acceptedTerms = screen.getByLabelText(/Aceito os/i);

      userEvent.click(plan);
      userEvent.click(acceptedTerms);

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.SEVENTH.title)).toBeInTheDocument();
        expect(
          screen.getByText(COMPLETE_FLOW.SEVENTH.description, {
            normalizer: getDefaultNormalizer({ collapseWhitespace: false, trim: false }),
          })
        ).toBeInTheDocument();
      });

      const [zero, one, two, three, four, five] = screen.getAllByRole('textbox');

      await waitFor(() => userEvent.type(zero, '1'));
      await waitFor(() => userEvent.type(one, '2'));
      await waitFor(() => userEvent.type(two, '3'));
      await waitFor(() => userEvent.type(three, '4'));
      await waitFor(() => userEvent.type(four, '5'));
      await waitFor(() => userEvent.type(five, '6'));

      userEvent.click(screen.getByText('Avançar'));

      await waitFor(() => {
        expect(screen.getByText(COMPLETE_FLOW.EIGHTH.title)).toBeInTheDocument();
        expect(
          screen.getByText(COMPLETE_FLOW.EIGHTH.description, {
            normalizer: getDefaultNormalizer({ collapseWhitespace: false, trim: false }),
          })
        ).toBeInTheDocument();
      });
    });
  });
});
