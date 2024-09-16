import MainLayout from '@layouts/MainLayout';
import { renderWithProviders } from '@utils/testHelper';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('MainLayout', () => {
  it('renders correctly', () => {
    const children = <div>Main Layout</div>;
    renderWithProviders(<MainLayout>{children}</MainLayout>);
    expect(screen.getByText(/Main Layout/i)).toBeDefined();
  });

  it('renders with a header', () => {
    const children = <div>Main Layout</div>;
    renderWithProviders(<MainLayout header>{children}</MainLayout>);
    expect(screen.getByText(/Navbar/i)).toBeDefined();
  });
});
