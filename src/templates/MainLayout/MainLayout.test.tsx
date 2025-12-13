import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('renders children content', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders as a semantic main element', () => {
    const { container } = render(
      <MainLayout>
        <p>Content</p>
      </MainLayout>
    );

    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent('Content');
  });

  it('applies custom className', () => {
    const { container } = render(
      <MainLayout className="custom-layout">
        <div>Content</div>
      </MainLayout>
    );

    const mainElement = container.querySelector('main');
    expect(mainElement).toHaveClass('custom-layout');
  });

  it('preserves base styles when custom className is added', () => {
    const { container } = render(
      <MainLayout className="custom-layout">
        <div>Content</div>
      </MainLayout>
    );

    const mainElement = container.querySelector('main');
    expect(mainElement?.className).toContain('custom-layout');
    // Verify base styles are also present (CSS module generates hashed names)
    expect(mainElement?.className.split(' ').length).toBeGreaterThan(1);
  });

  it('forwards additional HTML attributes', () => {
    render(
      <MainLayout data-testid="main-layout" aria-label="Main content area">
        <div>Content</div>
      </MainLayout>
    );

    const mainElement = screen.getByTestId('main-layout');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveAttribute('aria-label', 'Main content area');
  });

  it('renders multiple children elements', () => {
    render(
      <MainLayout>
        <h1>Page Title</h1>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </MainLayout>
    );

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
  });

  it('renders complex nested content', () => {
    render(
      <MainLayout>
        <div>
          <header>
            <h1>Header</h1>
          </header>
          <article>
            <h2>Article Title</h2>
            <p>Article content</p>
          </article>
          <footer>Footer content</footer>
        </div>
      </MainLayout>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Article Title')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('handles undefined className gracefully', () => {
    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    const mainElement = container.querySelector('main');
    expect(mainElement?.className).toBeTruthy();
    expect(mainElement?.className).not.toContain('undefined');
  });

  it('applies layout styles via CSS module', () => {
    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    const mainElement = container.querySelector('main');
    expect(mainElement?.className).toBeTruthy();
    expect(mainElement?.className.length).toBeGreaterThan(0);
  });
});
