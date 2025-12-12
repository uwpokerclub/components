import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('has default aria-label', () => {
    render(<Spinner />);
    const spinner = screen.getByLabelText('Loading');
    expect(spinner).toBeInTheDocument();
  });

  it('accepts custom aria-label', () => {
    render(<Spinner aria-label="Loading data" />);
    const spinner = screen.getByLabelText('Loading data');
    expect(spinner).toBeInTheDocument();
  });

  it('applies small size', () => {
    const { container } = render(<Spinner size="sm" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner?.className).toContain('sm');
  });

  it('applies medium size by default', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner?.className).toContain('md');
  });

  it('applies large size', () => {
    const { container } = render(<Spinner size="lg" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner?.className).toContain('lg');
  });

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('forwards additional props', () => {
    render(<Spinner data-testid="custom-spinner" />);
    expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
  });

  it('renders SVG with circle', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    const circle = container.querySelector('circle');
    expect(svg).toBeInTheDocument();
    expect(circle).toBeInTheDocument();
  });
});
