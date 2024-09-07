import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import Locale from '@components/Locale';
import { renderWithProviders } from '@utils/testHelper';
import { act } from 'react';
import store from '@store/stores';
import { setLocale } from '@app/reducer';

describe('Locale Component', () => {
  it('renders the current locale', () => {
    store.dispatch(setLocale('en'));
    renderWithProviders(<Locale />);

    expect(screen.getByText('EN')).toBeDefined();
  });

  it('dispatches setLocale action when button is clicked', async () => {
    store.dispatch(setLocale('en'));
    renderWithProviders(<Locale />);

    const button = screen.getByRole('button', { name: /en/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(store.getState().app.locale).toBe('id');
  });
});
