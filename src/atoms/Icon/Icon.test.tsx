import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders chevron-up icon', () => {
    const { container } = render(<Icon name="chevron-up" aria-label="Sort ascending" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders chevron-down icon', () => {
    const { container } = render(<Icon name="chevron-down" aria-label="Sort descending" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders chevron-left icon', () => {
    const { container } = render(<Icon name="chevron-left" aria-label="Previous" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders chevron-right icon', () => {
    const { container } = render(<Icon name="chevron-right" aria-label="Next" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders sort icon', () => {
    const { container } = render(<Icon name="sort" aria-label="Sort" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders sort-asc icon', () => {
    const { container } = render(<Icon name="sort-asc" aria-label="Sorted ascending" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders sort-desc icon', () => {
    const { container } = render(<Icon name="sort-desc" aria-label="Sorted descending" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies small size', () => {
    const { container } = render(<Icon name="sort" size="sm" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toContain('sm');
  });

  it('applies medium size by default', () => {
    const { container } = render(<Icon name="sort" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toContain('md');
  });

  it('applies large size', () => {
    const { container } = render(<Icon name="sort" size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toContain('lg');
  });

  it('applies custom className', () => {
    const { container } = render(<Icon name="sort" className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('has aria-label when provided', () => {
    render(<Icon name="sort" aria-label="Sort table" />);
    const icon = screen.getByLabelText('Sort table');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('role', 'img');
  });

  it('is aria-hidden when no aria-label provided', () => {
    const { container } = render(<Icon name="sort" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role');
  });

  it('forwards additional props to svg', () => {
    const { container } = render(<Icon name="sort" data-testid="custom-icon" />);
    expect(container.querySelector('[data-testid="custom-icon"]')).toBeInTheDocument();
  });
});
