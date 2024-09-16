import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import Locale from '@components/Locale';
import { renderWithProviders } from '@utils/testHelper';
import { act } from 'react';
import store from '@store/configureStore';

describe('Locale Component', async () => {
  it('renders the current locale', async () => {
    renderWithProviders(<Locale />);

    expect(screen.getByText('EN')).toBeDefined();
  });

  it('dispatches setLocale action when button is clicked', async () => {
    renderWithProviders(<Locale />);

    const button = screen.getByRole('button', { name: /EN/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(store.getState().app.locale).toBe('id');
  });
});
