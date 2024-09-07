import Button from '@components/Button';
import { renderWithProviders } from '@utils/testHelper';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Button Component', () => {
  it('renders with the correct text', () => {
    renderWithProviders(<Button text='Click Me' type='button' />);
    expect(screen.getByText('Click Me')).toBeDefined();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    renderWithProviders(<Button text='Click Me' onClick={handleClick} type='button' />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct className', () => {
    renderWithProviders(<Button text='Click Me' type='button' className='custom-class' />);
    expect(screen.getByText('Click Me')).toHaveClass('custom-class');
  });

  it('is disabled when the disabled prop is true', () => {
    renderWithProviders(<Button text='Click Me' type='button' disabled />);
    expect(screen.getByText('Click Me')).toBeDisabled();
  });

  it('has the correct type attribute', () => {
    renderWithProviders(<Button text='Submit' type='submit' />);
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
  });
});
