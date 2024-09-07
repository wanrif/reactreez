import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import Theme from '@components/Theme';
import { toggleTheme } from '@components/Theme/thunk';
import { renderWithProviders } from '@utils/testHelper';
import { act } from 'react';
import store from '@store/stores';
import { setTheme } from '@app/reducer';

// Mock the react-icons
vi.mock('react-icons/bs', () => ({
  BsFillMoonStarsFill: () => <div data-testid='moon-icon'>Moon</div>,
  BsSunFill: () => <div data-testid='sun-icon'>Sun</div>,
}));

// Mock the thunk
vi.mock('@components/Theme/thunk', () => ({
  toggleTheme: vi.fn((payload) => (dispatch: (arg0: { payload: 'light' | 'dark'; type: 'app/setTheme' }) => void) => {
    if (payload.cbSuccess) {
      payload.cbSuccess();
    }
    dispatch(setTheme(payload.theme));
  }),
}));

describe('Theme Component', () => {
  it('renders sun icon when theme is light', () => {
    store.dispatch(setTheme('light'));
    renderWithProviders(<Theme />);

    expect(screen.getByTestId('sun-icon')).toBeDefined();
    expect(screen.queryByTestId('moon-icon')).toBeNull();
  });

  it('renders moon icon when theme is dark', () => {
    store.dispatch(setTheme('dark'));
    renderWithProviders(<Theme />);

    expect(screen.getByTestId('moon-icon')).toBeDefined();
    expect(screen.queryByTestId('sun-icon')).toBeNull();
  });

  it('dispatches toggleTheme action when button is clicked (light)', async () => {
    store.dispatch(setTheme('light'));
    renderWithProviders(<Theme />);

    const button = screen.getByRole('button', { name: /toggleTheme/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(toggleTheme).toHaveBeenCalledWith({
      theme: 'dark',
      cbSuccess: expect.any(Function),
    });
  });

  it('dispatches toggleTheme action when button is clicked (dark)', async () => {
    store.dispatch(setTheme('dark'));
    renderWithProviders(<Theme />);

    const button = screen.getByRole('button', { name: /toggleTheme/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(toggleTheme).toHaveBeenCalledWith({
      theme: 'light',
      cbSuccess: expect.any(Function),
    });
  });
});
