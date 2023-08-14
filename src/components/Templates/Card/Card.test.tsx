import {
  renderWithContext,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@tests/custom-testing-library';

import { Card, Props } from './Card';

const commonProps: Props = {
  href: 'www.fake-url.com',
  image: {
    alt: 'fake image',
    src: '/fake-image',
  },
  segment: 'Fashion',
  badge: {
    content: 'fake badge',
    variation: 'trend',
  },
};

describe('Card', () => {
  it('should render active component', () => {
    renderWithContext(<Card {...commonProps} isActive />);

    expect(screen.getByRole('img', { name: /fake image/i })).toBeInTheDocument();
    expect(screen.getByText(/fake badge/i)).toBeInTheDocument();
    expect(screen.getByText(/fashion/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'template' })).toHaveAttribute(
      'aria-disabled',
      'false'
    );
  });

  it('should disabled when "isActive" is false', () => {
    renderWithContext(<Card {...commonProps} />);

    expect(screen.getByRole('option', { name: 'template' })).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('should render modal', async () => {
    renderWithContext(<Card {...commonProps} isActive />);

    const imageWrapper = screen.getByRole('img', { name: /fake image/i });

    userEvent.click(imageWrapper);
    waitForElementToBeRemoved(() => imageWrapper);

    await waitFor(() => expect(screen.getByText(/preview/i)).toBeInTheDocument());
  });

  it('should not open modal when "isActive" is false', async () => {
    renderWithContext(<Card {...commonProps} isActive={false} />);

    const imageWrapper = screen.getByRole('img', { name: /fake image/i });

    userEvent.click(imageWrapper);

    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /preview/i })).not.toBeInTheDocument()
    );
  });

  it('should close preview modal when clicked on "close" button', async () => {
    renderWithContext(<Card {...commonProps} isActive />);

    const imageWrapper = screen.getByRole('img', { name: /fake image/i });

    userEvent.click(imageWrapper);
    waitForElementToBeRemoved(() => imageWrapper);

    await waitFor(() => expect(screen.getByText(/preview/i)).toBeInTheDocument());

    userEvent.click(screen.getByRole('button', { name: /fechar/i }));

    waitForElementToBeRemoved(() => screen.getByText(/preview/i));
    expect(screen.getByText(/fake badge/i)).toBeInTheDocument();
  });
});
