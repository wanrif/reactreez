import Navbar from '@components/Navbar';
import { renderWithProviders } from '@utils/testHelper';
import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { useNavigate } from 'react-router-dom';
import store from '@store/configureStore';
import { loggedIn } from '@pages/Login/reducer';

// Mock the useNavigate hook
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('Navbar Component', async () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
    store.subscribe(() => {
      vi.clearAllMocks();
    });
  });

  it('renders correctly', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Home/i)).toBeDefined();
  });

  it('navigate to correct link when navbar link is clicked', async () => {
    renderWithProviders(<Navbar />);

    const aboutButton = screen.getByRole('button', { name: /About/i });
    act(() => {
      fireEvent.click(aboutButton);
    });
  });

  it('navigate to login page when login button is clicked', async () => {
    renderWithProviders(<Navbar />);

    const loginButton = screen.getByRole('button', { name: /Login/i });
    act(() => {
      fireEvent.click(loginButton);
    });
  });

  it('click logout when is authenticated', async () => {
    const mockLogin = {
      access_token: 'access-token',
      refresh_token: 'refresh-token',
      isAuthenticated: true,
    };
    store.dispatch(loggedIn(mockLogin));

    renderWithProviders(<Navbar />);

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    act(() => {
      fireEvent.click(logoutButton);
    });
  });

  it('navigates to home page when clicking on the navbar title', async () => {
    renderWithProviders(<Navbar />);

    const navbarTitle = screen.getByText('Navbar');
    await act(async () => {
      fireEvent.click(navbarTitle);
    });
  });
});
