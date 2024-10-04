import { screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
import { renderWithProviders } from '@utils/testHelper';
import Login from '@pages/Login';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useNavigate } from 'react-router-dom';
import { act } from 'react';
import { doLogin } from '@pages/Login/thunk';

// Mock dependencies
vi.mock('@store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(() => ({ state: { from: '/dashboard' } })),
}));

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
  },
}));

vi.mock('@pages/Login/thunk', () => ({
  doLogin: {
    fn: vi.fn(),
    unwrap: vi.fn(),
  },
}));

vi.mock('@service/api', () => ({
  login: vi.fn(),
}));

describe('Login Component', () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useAppSelector as unknown as Mock).mockReturnValue(false);
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('renders login form correctly', () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });

    // await waitFor(() => {
    //   const mockLoginResponse = {
    //     email: 'test@example.com',
    //     password: 'password123',
    //   };
    //   (doLogin as unknown as Mock).mockReturnValue(() => Promise.resolve(mockLoginResponse));

    //   (useAppSelector as unknown as Mock).mockReturnValue(true);
    // });
  });

  it('disables submit button when loading', () => {
    (useAppSelector as unknown as Mock).mockReturnValue(true);
    renderWithProviders(<Login />);

    const submitButton = screen.getByText('Loading...');
    expect(submitButton).toBeDisabled();
  });

  it('navigates to home on logo click', () => {
    renderWithProviders(<Login />);

    fireEvent.click(screen.getByAltText('Logo'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
