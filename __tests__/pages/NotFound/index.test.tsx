import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import NotFound from '@pages/NotFound';
import { renderWithProviders } from '@utils/testHelper';
import { act } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '@store/configureStore';
import { toggleTheme } from '@components/Theme/thunk';
import { setTheme } from '@app/reducer';

// Mock the useNavigate hook
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

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

describe('NotFound Page', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('renders correctly', () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText(/Page not found/i)).toBeDefined();
  });

  it('navigate to home page when home button is clicked', async () => {
    renderWithProviders(<NotFound />);

    const button = screen.getByRole('button', { name: /Home/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navigate to correct link when navbar link is clicked', async () => {
    renderWithProviders(<NotFound />);

    const aboutButton = screen.getByRole('button', { name: /About/i });
    await act(async () => {
      fireEvent.click(aboutButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });

  it('change theme', async () => {
    renderWithProviders(<NotFound />);

    const button = screen.getByRole('button', { name: /toggleTheme/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(toggleTheme).toHaveBeenCalledWith({
      theme: 'light',
      cbSuccess: expect.any(Function),
    });
  });

  it('change language', async () => {
    renderWithProviders(<NotFound />);

    const button = screen.getByRole('button', { name: /en/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(store.getState().app.locale).toBe('id');
  });

  it('navigates to home page when clicking on the navbar title', async () => {
    renderWithProviders(<NotFound />);

    const navbarTitle = screen.getByText('Navbar');
    await act(async () => {
      fireEvent.click(navbarTitle);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('renders all navbar links', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByRole('button', { name: /Beranda/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Tentang/i })).toBeDefined();
  });

  it('uses translation for not found text', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByText('Halaman tidak ditemukan')).toBeDefined();
  });
});
