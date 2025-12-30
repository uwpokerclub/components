import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Table } from './Table';
import type { TableColumn } from './Table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Moderator',
    status: 'inactive',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-04-05',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-05-12',
  },
];

const largeDataset: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Moderator'][i % 3],
  status: i % 3 === 0 ? 'inactive' : 'active',
  joinDate: new Date(2023, i % 12, (i % 28) + 1).toISOString().split('T')[0],
}));

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', accessor: 'name' },
  { key: 'email', header: 'Email', accessor: 'email' },
  { key: 'role', header: 'Role', accessor: 'role' },
  { key: 'status', header: 'Status', accessor: 'status' },
  { key: 'joinDate', header: 'Join Date', accessor: 'joinDate' },
];

const meta = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const Striped: Story = {
  args: {
    columns,
    data: sampleData,
    variant: 'striped',
  },
};

export const Bordered: Story = {
  args: {
    columns,
    data: sampleData,
    variant: 'bordered',
  },
};

export const Compact: Story = {
  args: {
    columns,
    data: sampleData,
    variant: 'compact',
  },
};

export const WithSorting: Story = {
  args: {
    columns,
    data: sampleData,
    sortable: true,
  },
};

export const WithSelection: Story = {
  args: {
    columns,
    data: sampleData,
    selectable: true,
    onSelectionChange: (selectedRows) => {
      console.log('Selected:', selectedRows);
    },
  },
};

export const PrimaryHeader: Story = {
  args: {
    columns,
    data: sampleData,
    headerVariant: 'primary',
  },
};

export const SecondaryHeader: Story = {
  args: {
    columns,
    data: sampleData,
    headerVariant: 'secondary',
  },
};

export const PrimaryHeaderWithSelection: Story = {
  args: {
    columns,
    data: sampleData,
    headerVariant: 'primary',
    selectable: true,
    sortable: true,
    onSelectionChange: (selectedRows) => {
      console.log('Selected:', selectedRows);
    },
  },
};

export const SecondaryHeaderWithSorting: Story = {
  args: {
    columns,
    data: sampleData,
    headerVariant: 'secondary',
    sortable: true,
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: largeDataset,
    pagination: {
      pageSize: 10,
    },
  },
};

export const WithAllFeatures: Story = {
  args: {
    columns,
    data: largeDataset,
    variant: 'striped',
    sortable: true,
    selectable: true,
    pagination: {
      pageSize: 10,
    },
    onSelectionChange: (selectedRows) => {
      console.log('Selected:', selectedRows);
    },
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: sampleData,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
  },
};

export const CustomEmptyState: Story = {
  args: {
    columns,
    data: [],
    emptyState: (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>No users found</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Try adjusting your filters or create a new user.
        </p>
      </div>
    ),
  },
};

export const CustomCellRenderer: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name', accessor: 'name' },
      { key: 'email', header: 'Email', accessor: 'email' },
      {
        key: 'status',
        header: 'Status',
        accessor: 'status',
        render: (value: string) => (
          <span
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              backgroundColor:
                value === 'active' ? 'var(--color-success-light)' : 'var(--color-danger-light)',
              color: value === 'active' ? 'var(--color-success-dark)' : 'var(--color-danger-dark)',
            }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        ),
      },
    ],
    data: sampleData,
  },
};

export const WithAccessorFunction: Story = {
  args: {
    columns: [
      {
        key: 'fullName',
        header: 'User',
        accessor: (row: User) => `${row.name} (${row.role})`,
      },
      { key: 'email', header: 'Email', accessor: 'email' },
      { key: 'status', header: 'Status', accessor: 'status' },
    ],
    data: sampleData,
  },
};

export const ControlledSorting: Story = {
  render: () => {
    const [sortKey, setSortKey] = useState<string>();
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    return (
      <div>
        <div style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
          Current sort: {sortKey || 'none'} ({sortDirection})
        </div>
        <Table
          columns={columns}
          data={sampleData}
          sortable
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={(key, direction) => {
            setSortKey(key);
            setSortDirection(direction);
          }}
        />
      </div>
    );
  },
};

export const ControlledPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    return (
      <div>
        <div style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
          Current page: {currentPage}
        </div>
        <Table
          columns={columns}
          data={largeDataset}
          pagination={{
            pageSize,
            currentPage,
            onPageChange: setCurrentPage,
          }}
        />
      </div>
    );
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const [sortKey, setSortKey] = useState<string>();
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div
          style={{
            padding: '1rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius-md)',
            backgroundColor: 'var(--color-background-secondary)',
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Selected rows:</strong> {selectedRows.length}
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Sort:</strong> {sortKey || 'none'} ({sortDirection})
          </div>
          <div>
            <strong>Page:</strong> {currentPage}
          </div>
        </div>

        <Table
          columns={columns}
          data={largeDataset}
          variant="striped"
          sortable
          selectable
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={(key, direction) => {
            setSortKey(key);
            setSortDirection(direction);
          }}
          onSelectionChange={setSelectedRows}
          pagination={{
            pageSize: 10,
            currentPage,
            onPageChange: setCurrentPage,
          }}
          getRowKey={(row) => row.id}
        />
      </div>
    );
  },
};

export const ResponsiveTable: Story = {
  args: {
    columns,
    data: sampleData,
    variant: 'striped',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const CompactWithPagination: Story = {
  args: {
    columns,
    data: largeDataset,
    variant: 'compact',
    pagination: {
      pageSize: 10,
    },
  },
};

/**
 * Demonstrates the data-qa props feature for E2E testing.
 * Use `headerProps`, `cellProps`, and `rowProps` to add data-qa attributes
 * to table elements for reliable test selectors.
 */
export const WithDataQaAttributes: Story = {
  args: {
    columns: [
      {
        key: 'id',
        header: 'ID',
        accessor: 'id',
        headerProps: { 'data-qa': 'id-header' },
        cellProps: (row: User) => ({ 'data-qa': `user-id-${row.id}` }),
      },
      {
        key: 'name',
        header: 'Name',
        accessor: 'name',
        headerProps: { 'data-qa': 'name-header' },
        cellProps: (row: User) => ({ 'data-qa': `user-name-${row.id}` }),
      },
      {
        key: 'email',
        header: 'Email',
        accessor: 'email',
        headerProps: { 'data-qa': 'email-header' },
        cellProps: (row: User) => ({ 'data-qa': `user-email-${row.id}` }),
      },
      {
        key: 'status',
        header: 'Status',
        accessor: 'status',
        headerProps: { 'data-qa': 'status-header' },
        cellProps: (row: User) => ({ 'data-qa': `user-status-${row.id}` }),
      },
    ],
    data: sampleData,
    sortable: true,
    rowProps: (row: User) => ({ 'data-qa': `user-row-${row.id}` }),
  },
};
