import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders pagination controls', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination totalItems={100} pageSize={10} currentPage={1} onPageChange={handlePageChange} />
    );

    expect(screen.getByLabelText('Pagination navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('does not render when total pages is 1 or less', () => {
    const { container } = render(
      <Pagination totalItems={5} pageSize={10} currentPage={1} onPageChange={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders page numbers', () => {
    render(<Pagination totalItems={50} pageSize={10} currentPage={1} onPageChange={vi.fn()} />);

    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 5')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(<Pagination totalItems={50} pageSize={10} currentPage={3} onPageChange={vi.fn()} />);

    const currentPage = screen.getByLabelText('Page 3');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  it('disables previous button on first page', () => {
    render(<Pagination totalItems={50} pageSize={10} currentPage={1} onPageChange={vi.fn()} />);

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination totalItems={50} pageSize={10} currentPage={5} onPageChange={vi.fn()} />);

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when clicking page number', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(
      <Pagination totalItems={50} pageSize={10} currentPage={1} onPageChange={handlePageChange} />
    );

    await user.click(screen.getByLabelText('Page 3'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when clicking next', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(
      <Pagination totalItems={50} pageSize={10} currentPage={2} onPageChange={handlePageChange} />
    );

    await user.click(screen.getByLabelText('Next page'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when clicking previous', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(
      <Pagination totalItems={50} pageSize={10} currentPage={3} onPageChange={handlePageChange} />
    );

    await user.click(screen.getByLabelText('Previous page'));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('shows first and last page buttons by default', () => {
    render(<Pagination totalItems={100} pageSize={10} currentPage={5} onPageChange={vi.fn()} />);

    expect(screen.getByLabelText('First page')).toBeInTheDocument();
    expect(screen.getByLabelText('Last page')).toBeInTheDocument();
  });

  it('hides first and last page buttons when showFirstLast is false', () => {
    render(
      <Pagination
        totalItems={100}
        pageSize={10}
        currentPage={5}
        onPageChange={vi.fn()}
        showFirstLast={false}
      />
    );

    expect(screen.queryByLabelText('First page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Last page')).not.toBeInTheDocument();
  });

  it('calls onPageChange with first page when clicking first button', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(
      <Pagination totalItems={100} pageSize={10} currentPage={5} onPageChange={handlePageChange} />
    );

    await user.click(screen.getByLabelText('First page'));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with last page when clicking last button', async () => {
    const user = userEvent.setup();
    const handlePageChange = vi.fn();
    render(
      <Pagination totalItems={100} pageSize={10} currentPage={5} onPageChange={handlePageChange} />
    );

    await user.click(screen.getByLabelText('Last page'));
    expect(handlePageChange).toHaveBeenCalledWith(10);
  });

  it('shows ellipsis for large page counts', () => {
    render(<Pagination totalItems={200} pageSize={10} currentPage={1} onPageChange={vi.fn()} />);

    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('applies compact variant', () => {
    const { container } = render(
      <Pagination
        totalItems={50}
        pageSize={10}
        currentPage={1}
        onPageChange={vi.fn()}
        variant="compact"
      />
    );

    const nav = container.querySelector('nav');
    expect(nav?.className).toContain('compact');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Pagination
        totalItems={50}
        pageSize={10}
        currentPage={1}
        onPageChange={vi.fn()}
        className="custom-class"
      />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('disables first page button on first page', () => {
    render(<Pagination totalItems={100} pageSize={10} currentPage={1} onPageChange={vi.fn()} />);

    const firstButton = screen.getByLabelText('First page');
    expect(firstButton).toBeDisabled();
  });

  it('disables last page button on last page', () => {
    render(<Pagination totalItems={100} pageSize={10} currentPage={10} onPageChange={vi.fn()} />);

    const lastButton = screen.getByLabelText('Last page');
    expect(lastButton).toBeDisabled();
  });
});
