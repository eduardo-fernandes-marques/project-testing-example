import { renderWithContext, screen, userEvent, waitFor } from '@tests/custom-testing-library';

import { Props, Templates } from './Templates';

const commonProps: Props = {
  payload: [
    {
      name: 'fake-1',
      href: 'www.fake-url.com',
      image: '/fake-image',
      segment: 'Fashion',
    },
    {
      name: 'fake-2',
      href: 'www.fake-url.com',
      image: '/fake-image-2',
      segment: 'Fashion',
    },
  ],
};

describe('Templates', () => {
  it('should render component', () => {
    const onChange = jest.fn();
    renderWithContext(<Templates {...commonProps} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledWith('fake-1');
    expect(screen.queryByLabelText(/anterior/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/próximo/i)).toBeInTheDocument();
  });

  it('should render with empty payload', () => {
    const onChange = jest.fn();
    renderWithContext(<Templates {...commonProps} payload={[]} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledWith('');
    expect(screen.queryByLabelText(/anterior/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/próximo/i)).not.toBeInTheDocument();
  });

  it('should navigate between templates', async () => {
    const onChange = jest.fn();
    renderWithContext(<Templates {...commonProps} onChange={onChange} />);

    const next = screen.getByLabelText(/próximo/i);

    expect(onChange).toHaveBeenCalledWith('fake-1');
    expect(screen.queryByLabelText(/anterior/i)).not.toBeInTheDocument();
    expect(next).toBeInTheDocument();

    userEvent.click(next);
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('fake-2'));

    const previous = screen.getByLabelText(/anterior/i);
    expect(previous).toBeInTheDocument();

    userEvent.click(previous);
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('fake-1'));
    expect(screen.queryByLabelText(/anterior/i)).not.toBeInTheDocument();
  });
});
