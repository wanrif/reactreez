import LandingPage from '@pages/LandingPage';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@utils/testHelper';
import { screen, waitFor } from '@testing-library/react';

vi.mock('@app/reducer', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useGetPingQuery: vi.fn(),
  };
});

describe('LandingPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly on success', async () => {
    const { useGetPingQuery } = await import('@app/reducer');
    vi.mocked(useGetPingQuery).mockReturnValue({
      data: { message: 'John Wick' },
      error: undefined,
      isLoading: false,
    } as any);

    renderWithProviders(<LandingPage />);

    expect(screen.getByText(/Welcome to ReacTreez/i)).toBeDefined();
    await waitFor(() => {
      expect(screen.getByText(/John Wick/i)).toBeInTheDocument();
    });
  });

  it('handles loading state', async () => {
    const { useGetPingQuery } = await import('@app/reducer');
    vi.mocked(useGetPingQuery).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    } as any);

    renderWithProviders(<LandingPage />);

    expect(screen.getByText(/Welcome to ReacTreez/i)).toBeDefined();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('handles error state', async () => {
    const { useGetPingQuery } = await import('@app/reducer');
    vi.mocked(useGetPingQuery).mockReturnValue({
      data: undefined,
      error: { status: 'FETCH_ERROR', error: 'An error occurred' },
      isLoading: false,
    } as any);

    const consoleSpy = vi.spyOn(console, 'error');

    renderWithProviders(<LandingPage />);

    expect(screen.getByText(/Welcome to ReacTreez/i)).toBeDefined();
    await waitFor(() => {
      expect(screen.queryByText(/John Wick/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
