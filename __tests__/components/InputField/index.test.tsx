import InputField from '@components/InputField';
import { renderWithProviders } from '@utils/testHelper';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: vi.fn(),
    errors: {},
  }),
}));

describe('InputField Component', () => {
  it('renders correctly', () => {
    renderWithProviders(
      <InputField
        autoFocus
        type='email'
        placeholder='Enter your email'
        register={vi.fn()}
        name='email'
        error={undefined}
      />
    );

    expect(screen.getByPlaceholderText('Enter your email')).toBeDefined();
  });

  it('renders with error', () => {
    renderWithProviders(
      <InputField
        autoFocus
        type='email'
        placeholder='Enter your email'
        register={vi.fn()}
        name='email'
        error='Email is required'
      />
    );

    expect(screen.getByText('Email is required')).toBeDefined();
  });
});
