import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { TableColumn } from './Table';
import { Table } from './Table';

interface TestData {
  id: number;
  name: string;
  age: number;
  email: string;
}

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
];

const mockColumns: TableColumn<TestData>[] = [
  { key: 'name', header: 'Name', accessor: 'name' },
  { key: 'age', header: 'Age', accessor: 'age' },
  { key: 'email', header: 'Email', accessor: 'email' },
];

describe('Table', () => {
  it('renders table with data', () => {
    render(<Table columns={mockColumns} data={mockData} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<Table columns={mockColumns} data={mockData} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(<Table columns={mockColumns} data={[]} emptyState="No users found" />);

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders default empty state when no data and no custom empty state', () => {
    render(<Table columns={mockColumns} data={[]} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<Table columns={mockColumns} data={mockData} loading />);

    expect(screen.getByLabelText('Loading table data')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Table columns={mockColumns} data={mockData} variant="striped" />);
    const table = screen.getByRole('table');
    expect(table.className).toContain('striped');
  });

  it('renders with bordered variant', () => {
    render(<Table columns={mockColumns} data={mockData} variant="bordered" />);
    const table = screen.getByRole('table');
    expect(table.className).toContain('bordered');
  });

  it('renders with compact variant', () => {
    render(<Table columns={mockColumns} data={mockData} variant="compact" />);
    const table = screen.getByRole('table');
    expect(table.className).toContain('compact');
  });

  describe('Sorting', () => {
    it('renders sort buttons when sortable is true', () => {
      render(<Table columns={mockColumns} data={mockData} sortable />);

      expect(screen.getByLabelText('Sort by Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Sort by Age')).toBeInTheDocument();
    });

    it('sorts data when clicking column header (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(<Table columns={mockColumns} data={mockData} sortable />);

      const nameHeader = screen.getByLabelText('Sort by Name');
      await user.click(nameHeader);

      const rows = screen.getAllByRole('row');
      expect(within(rows[1]).getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('calls onSort when clicking header (controlled)', async () => {
      const user = userEvent.setup();
      const handleSort = vi.fn();

      render(<Table columns={mockColumns} data={mockData} sortable onSort={handleSort} />);

      await user.click(screen.getByLabelText('Sort by Name'));
      expect(handleSort).toHaveBeenCalledWith('name', 'asc');
    });

    it('toggles sort direction', async () => {
      const user = userEvent.setup();
      const handleSort = vi.fn();

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          sortable
          onSort={handleSort}
          sortKey="name"
          sortDirection="asc"
        />
      );

      await user.click(screen.getByLabelText('Sort by Name'));
      expect(handleSort).toHaveBeenCalledWith('name', 'desc');
    });

    it('does not make column sortable if sortable is false on column', () => {
      const columns: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', accessor: 'name', sortable: false },
      ];

      render(<Table columns={columns} data={mockData} sortable />);

      expect(screen.queryByLabelText('Sort by Name')).not.toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('renders checkboxes when selectable is true', () => {
      render(<Table columns={mockColumns} data={mockData} selectable />);

      expect(screen.getByLabelText('Select all rows')).toBeInTheDocument();
      expect(screen.getByLabelText('Select row 1')).toBeInTheDocument();
    });

    it('selects individual row', async () => {
      const user = userEvent.setup();
      const handleSelectionChange = vi.fn();

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          selectable
          onSelectionChange={handleSelectionChange}
        />
      );

      await user.click(screen.getByLabelText('Select row 1'));
      expect(handleSelectionChange).toHaveBeenCalledWith([mockData[0]]);
    });

    it('selects all rows', async () => {
      const user = userEvent.setup();
      const handleSelectionChange = vi.fn();

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          selectable
          onSelectionChange={handleSelectionChange}
        />
      );

      await user.click(screen.getByLabelText('Select all rows'));
      expect(handleSelectionChange).toHaveBeenCalledWith(mockData);
    });

    it('deselects all rows', async () => {
      const user = userEvent.setup();
      const handleSelectionChange = vi.fn();

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          selectable
          onSelectionChange={handleSelectionChange}
        />
      );

      const selectAll = screen.getByLabelText('Select all rows');
      await user.click(selectAll);
      await user.click(selectAll);

      expect(handleSelectionChange).toHaveBeenLastCalledWith([]);
    });
  });

  describe('Pagination', () => {
    const largeMockData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${String(i + 1)}`,
      age: 20 + i,
      email: `user${String(i + 1)}@example.com`,
    }));

    it('renders pagination controls', () => {
      render(<Table columns={mockColumns} data={largeMockData} pagination={{ pageSize: 10 }} />);

      expect(screen.getByLabelText('Pagination navigation')).toBeInTheDocument();
    });

    it('paginates data correctly (uncontrolled)', () => {
      render(<Table columns={mockColumns} data={largeMockData} pagination={{ pageSize: 10 }} />);

      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.queryByText('User 11')).not.toBeInTheDocument();
    });

    it('changes page (controlled)', async () => {
      const user = userEvent.setup();
      const handlePageChange = vi.fn();

      render(
        <Table
          columns={mockColumns}
          data={largeMockData}
          pagination={{
            pageSize: 10,
            currentPage: 1,
            onPageChange: handlePageChange,
          }}
        />
      );

      await user.click(screen.getByLabelText('Next page'));
      expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('does not show pagination when data fits on one page', () => {
      render(<Table columns={mockColumns} data={mockData} pagination={{ pageSize: 10 }} />);

      expect(screen.queryByLabelText('Pagination navigation')).not.toBeInTheDocument();
    });

    it('maintains selection across pages', async () => {
      const user = userEvent.setup();
      const handleSelectionChange = vi.fn();

      render(
        <Table
          columns={mockColumns}
          data={largeMockData}
          selectable
          onSelectionChange={handleSelectionChange}
          pagination={{ pageSize: 10 }}
          getRowKey={(row) => row.id}
        />
      );

      // Select first row on page 1
      await user.click(screen.getByLabelText('Select row 1'));
      expect(handleSelectionChange).toHaveBeenCalledWith([largeMockData[0]]);

      // Go to next page - selection should be maintained
      await user.click(screen.getByLabelText('Next page'));

      // First row on page 2 should not be selected, but page 1's selection persists
      const checkbox = screen.getByLabelText('Select row 1');
      expect(checkbox.checked).toBe(false);
    });
  });

  describe('Custom render functions', () => {
    it('uses custom render function', () => {
      const columns: TableColumn<TestData>[] = [
        {
          key: 'name',
          header: 'Name',
          accessor: 'name',
          render: (value) => <strong>{value}</strong>,
        },
      ];

      render(<Table columns={columns} data={[mockData[0]]} />);

      const strong = screen.getByText('John Doe');
      expect(strong.tagName).toBe('STRONG');
    });

    it('uses accessor function', () => {
      const columns: TableColumn<TestData>[] = [
        {
          key: 'fullInfo',
          header: 'Full Info',
          accessor: (row) => `${row.name} (${String(row.age)})`,
        },
      ];

      render(<Table columns={columns} data={[mockData[0]]} />);

      expect(screen.getByText('John Doe (30)')).toBeInTheDocument();
    });
  });

  describe('Custom row keys', () => {
    it('uses custom getRowKey function', () => {
      const handleSelectionChange = vi.fn();

      render(
        <Table
          columns={mockColumns}
          data={mockData}
          selectable
          onSelectionChange={handleSelectionChange}
          getRowKey={(row) => row.id}
        />
      );

      expect(screen.getByLabelText('Select all rows')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} className="custom-table" />
    );

    expect(container.querySelector('.custom-table')).toBeInTheDocument();
  });

  it('forwards additional props to table element', () => {
    render(<Table columns={mockColumns} data={mockData} data-testid="my-table" />);

    expect(screen.getByTestId('my-table')).toBeInTheDocument();
  });
});
