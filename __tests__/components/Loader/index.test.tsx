import Loader from '@components/Loader';
import { renderWithProviders } from '@utils/testHelper';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Loader Component', () => {
  it('renders correctly', () => {
    renderWithProviders(<Loader />);

    expect(screen.getByTestId('loader')).toBeDefined();
  });
});
