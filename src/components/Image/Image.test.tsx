import { screen } from '@testing-library/react';

import { renderWithTheme } from '@tests/custom-testing-library';

import { Image } from './Image';

describe('Unit > Component > Image', () => {
  it('should render correctly', () => {
    const alt = 'Placeholder image to test the component';
    renderWithTheme(<Image src="https://picsum.photos/200" alt={alt} />);

    expect(screen.getByAltText(alt)).toBeInTheDocument();
  });
});
