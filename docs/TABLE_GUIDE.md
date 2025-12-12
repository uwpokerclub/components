# Table Component Guide

The Table organism component provides a feature-rich, accessible data table with sorting, pagination, selection, and customizable styling.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Features](#features)
  - [Sorting](#sorting)
  - [Pagination](#pagination)
  - [Row Selection](#row-selection)
  - [Header Variants](#header-variants)
  - [Table Variants](#table-variants)
  - [Custom Cell Rendering](#custom-cell-rendering)
  - [Loading & Empty States](#loading--empty-states)
- [API Reference](#api-reference)
- [Examples](#examples)

## Basic Usage

```tsx
import { Table, TableColumn } from '@uwpokerclub/components';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', accessor: 'name' },
  { key: 'email', header: 'Email', accessor: 'email' },
  { key: 'role', header: 'Role', accessor: 'role' },
];

function MyTable() {
  return <Table columns={columns} data={users} />;
}
```

## Features

### Sorting

Enable sorting by adding the `sortable` prop. The table supports both **controlled** and **uncontrolled** sorting modes.

#### Uncontrolled Sorting (Automatic)

```tsx
<Table columns={columns} data={users} sortable />
```

The table manages sorting state internally. Click column headers to toggle between ascending and descending order.

#### Controlled Sorting

```tsx
function MyTable() {
  const [sortKey, setSortKey] = useState<string>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  return (
    <Table
      columns={columns}
      data={users}
      sortable
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={(key, direction) => {
        setSortKey(key);
        setSortDirection(direction);
      }}
    />
  );
}
```

#### Disable Sorting on Specific Columns

```tsx
const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', accessor: 'name', sortable: true },
  { key: 'email', header: 'Email', accessor: 'email', sortable: false }, // Not sortable
];
```

### Pagination

Add pagination to handle large datasets. Supports both **controlled** and **uncontrolled** modes.

#### Uncontrolled Pagination (Automatic)

```tsx
<Table
  columns={columns}
  data={users}
  pagination={{
    pageSize: 10,
  }}
/>
```

#### Controlled Pagination

```tsx
function MyTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Table
      columns={columns}
      data={users}
      pagination={{
        pageSize: 10,
        currentPage: currentPage,
        onPageChange: setCurrentPage,
      }}
    />
  );
}
```

### Row Selection

Enable multi-select checkboxes with the `selectable` prop.

```tsx
function MyTable() {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  return (
    <Table
      columns={columns}
      data={users}
      selectable
      onSelectionChange={setSelectedRows}
      getRowKey={(row) => row.id} // Important for tracking selections
    />
  );
}
```

**Important:** Provide a `getRowKey` function to uniquely identify rows. This ensures selections are tracked correctly, especially with pagination.

### Header Variants

Customize the header background color:

```tsx
// Default grey header
<Table columns={columns} data={users} headerVariant="default" />

// Gold/primary color header
<Table columns={columns} data={users} headerVariant="primary" />

// Purple/secondary color header
<Table columns={columns} data={users} headerVariant="secondary" />
```

### Table Variants

Choose from different visual styles:

```tsx
// Default style
<Table columns={columns} data={users} variant="default" />

// Striped rows (alternating background)
<Table columns={columns} data={users} variant="striped" />

// Bordered cells
<Table columns={columns} data={users} variant="bordered" />

// Compact spacing
<Table columns={columns} data={users} variant="compact" />
```

### Custom Cell Rendering

Customize how cell values are displayed using the `render` function:

```tsx
const columns: TableColumn<User>[] = [
  {
    key: 'status',
    header: 'Status',
    accessor: 'status',
    render: (value, row) => (
      <span
        style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          backgroundColor: value === 'active' ? '#e6f4ea' : '#fce8e6',
          color: value === 'active' ? '#0d652d' : '#a50e0e',
        }}
      >
        {value}
      </span>
    ),
  },
];
```

### Accessor Functions

Use functions to compute cell values:

```tsx
const columns: TableColumn<User>[] = [
  {
    key: 'fullInfo',
    header: 'User',
    accessor: (row) => `${row.name} (${row.role})`,
  },
];
```

### Loading & Empty States

#### Loading State

```tsx
<Table columns={columns} data={users} loading />
```

Shows a spinner while data is being fetched.

#### Empty State

```tsx
<Table
  columns={columns}
  data={[]}
  emptyState={
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h3>No users found</h3>
      <p>Try adjusting your filters or create a new user.</p>
    </div>
  }
/>
```

## API Reference

### TableProps

| Prop                | Type                                                | Default               | Description                        |
| ------------------- | --------------------------------------------------- | --------------------- | ---------------------------------- |
| `columns`           | `TableColumn<T>[]`                                  | **Required**          | Column definitions                 |
| `data`              | `T[]`                                               | **Required**          | Table data                         |
| `variant`           | `'default' \| 'striped' \| 'bordered' \| 'compact'` | `'default'`           | Visual style variant               |
| `headerVariant`     | `'default' \| 'primary' \| 'secondary'`             | `'default'`           | Header color variant               |
| `selectable`        | `boolean`                                           | `false`               | Enable row selection               |
| `onSelectionChange` | `(rows: T[]) => void`                               | -                     | Callback when selection changes    |
| `pagination`        | `PaginationConfig`                                  | -                     | Pagination configuration           |
| `sortable`          | `boolean`                                           | `false`               | Enable sorting                     |
| `sortKey`           | `string`                                            | -                     | Controlled sort column key         |
| `sortDirection`     | `'asc' \| 'desc'`                                   | -                     | Controlled sort direction          |
| `onSort`            | `(key: string, direction: 'asc' \| 'desc') => void` | -                     | Callback when sort changes         |
| `loading`           | `boolean`                                           | `false`               | Show loading state                 |
| `emptyState`        | `ReactNode`                                         | `'No data available'` | Content to show when data is empty |
| `getRowKey`         | `(row: T, index: number) => string \| number`       | `(_, index) => index` | Function to get unique row key     |
| `className`         | `string`                                            | -                     | Additional CSS class               |

### TableColumn

| Property   | Type                                | Required | Description                                          |
| ---------- | ----------------------------------- | -------- | ---------------------------------------------------- |
| `key`      | `string`                            | ✓        | Unique column identifier                             |
| `header`   | `string`                            | ✓        | Column header text                                   |
| `accessor` | `keyof T \| (row: T) => ReactNode`  | ✓        | Key or function to get cell value                    |
| `sortable` | `boolean`                           | -        | Override column sortability (when table is sortable) |
| `render`   | `(value: any, row: T) => ReactNode` | -        | Custom cell renderer                                 |

### PaginationConfig

| Property       | Type                     | Required | Description                            |
| -------------- | ------------------------ | -------- | -------------------------------------- |
| `pageSize`     | `number`                 | ✓        | Number of rows per page                |
| `currentPage`  | `number`                 | -        | Current page (controlled mode)         |
| `onPageChange` | `(page: number) => void` | -        | Page change callback (controlled mode) |

## Examples

### Complete Feature-Rich Table

```tsx
import { Table, TableColumn } from '@uwpokerclub/components';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

function UsersTable() {
  const [users, setUsers] = useState<User[]>([...]);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [sortKey, setSortKey] = useState<string>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const columns: TableColumn<User>[] = [
    { key: 'name', header: 'Name', accessor: 'name' },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'role', header: 'Role', accessor: 'role' },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span
          style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            fontWeight: 500,
            backgroundColor: value === 'active' ? '#e6f4ea' : '#fce8e6',
            color: value === 'active' ? '#0d652d' : '#a50e0e',
          }}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    { key: 'joinDate', header: 'Join Date', accessor: 'joinDate' },
  ];

  return (
    <Table
      columns={columns}
      data={users}
      variant="striped"
      headerVariant="primary"
      selectable
      sortable
      loading={loading}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={(key, direction) => {
        setSortKey(key);
        setSortDirection(direction);
      }}
      onSelectionChange={setSelectedRows}
      pagination={{
        pageSize: 10,
        currentPage: currentPage,
        onPageChange: setCurrentPage,
      }}
      getRowKey={(row) => row.id}
      emptyState={
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>No users found</h3>
          <p>Try adjusting your filters or create a new user.</p>
        </div>
      }
    />
  );
}
```

### Simple Read-Only Table

```tsx
const columns: TableColumn<Product>[] = [
  { key: 'name', header: 'Product', accessor: 'name' },
  { key: 'price', header: 'Price', accessor: (row) => `$${row.price.toFixed(2)}` },
  { key: 'stock', header: 'Stock', accessor: 'stock' },
];

<Table columns={columns} data={products} variant="bordered" />;
```

### Server-Side Pagination & Sorting

```tsx
function ServerSideTable() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await fetch(
        `/api/users?page=${currentPage}&pageSize=${pageSize}&sortBy=${sortKey}&order=${sortDirection}`
      );
      const json = await result.json();
      setData(json.data);
      setTotalItems(json.total);
      setLoading(false);
    }
    fetchData();
  }, [currentPage, sortKey, sortDirection]);

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      sortable
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={(key, direction) => {
        setSortKey(key);
        setSortDirection(direction);
        setCurrentPage(1); // Reset to first page on sort
      }}
      pagination={{
        pageSize: pageSize,
        currentPage: currentPage,
        onPageChange: setCurrentPage,
      }}
    />
  );
}
```

## Accessibility

The Table component follows WCAG 2.1 AA guidelines:

- ✅ Semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)
- ✅ ARIA attributes for sortable columns (`aria-sort`)
- ✅ ARIA labels for interactive elements
- ✅ Keyboard navigation (Tab, Space, Enter)
- ✅ Screen reader announcements
- ✅ Proper focus states

## Responsive Design

The table uses horizontal scroll on smaller screens to maintain table structure. The container has `overflow-x: auto` to ensure all columns remain accessible on mobile devices.

## Styling

The Table component uses CSS variables from the design system. All colors, spacing, and typography automatically adapt to light/dark themes via the `[data-theme]` attribute.

## Performance

- **Pagination**: Limits rendered rows for better performance with large datasets
- **Pure Components**: Minimizes unnecessary re-renders
- **Memoization**: Sort and pagination logic is memoized
- **No Virtualization**: For datasets over 1000+ items, consider server-side pagination

## Best Practices

1. **Always provide `getRowKey`** when using `selectable` to ensure selections are tracked correctly
2. **Use controlled mode** for server-side pagination and sorting
3. **Keep column definitions stable** (use `useMemo` or define outside component)
4. **Provide accessible labels** for custom cell renderers
5. **Handle loading states** to improve perceived performance
6. **Use custom empty states** to guide users when no data is available
