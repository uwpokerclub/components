import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 1,
    onPageChange: (page) => {
      console.log('Page changed to:', page);
    },
  },
};

export const MiddlePage: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 5,
    onPageChange: (page) => {
      console.log('Page changed to:', page);
    },
  },
};

export const LastPage: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 10,
    onPageChange: (page) => {
      console.log('Page changed to:', page);
    },
  },
};

export const ManyPages: Story = {
  args: {
    totalItems: 1000,
    pageSize: 10,
    currentPage: 50,
    onPageChange: (page) => {
      console.log('Page changed to:', page);
    },
  },
};

export const WithoutFirstLast: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 5,
    showFirstLast: false,
    onPageChange: (page) => {
      console.log('Page changed to:', page);
    },
  },
};

export const Compact: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 5,
    variant: 'compact',
    onPageChange: (page) => {
      console.log('Page changed to:', page);
    },
  },
};

export const FewPages: Story = {
  args: {
    totalItems: 25,
    pageSize: 10,
    currentPage: 2,
    onPageChange: (page) => {
      console.log('Page changed to:', page);
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalItems = 95;
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '600px' }}>
        <div
          style={{
            padding: '1rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius-md)',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '0.5rem', fontWeight: 'var(--font-weight-semibold)' }}>
            Page {currentPage} of {totalPages}
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            Showing items {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
          </div>
        </div>

        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button
            onClick={() => {
              setCurrentPage(1);
            }}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--border-radius-sm)',
              background: 'var(--color-background)',
              cursor: 'pointer',
            }}
          >
            Jump to First
          </button>
          <button
            onClick={() => {
              setCurrentPage(totalPages);
            }}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--border-radius-sm)',
              background: 'var(--color-background)',
              cursor: 'pointer',
            }}
          >
            Jump to Last
          </button>
        </div>
      </div>
    );
  },
};

export const ComparisonVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      <div>
        <div style={{ marginBottom: '0.75rem', fontWeight: 'var(--font-weight-semibold)' }}>
          Default Variant
        </div>
        <Pagination
          totalItems={100}
          pageSize={10}
          currentPage={5}
          onPageChange={() => {
            /* noop */
          }}
        />
      </div>
      <div>
        <div style={{ marginBottom: '0.75rem', fontWeight: 'var(--font-weight-semibold)' }}>
          Compact Variant
        </div>
        <Pagination
          totalItems={100}
          pageSize={10}
          currentPage={5}
          variant="compact"
          onPageChange={() => {
            /* noop */
          }}
        />
      </div>
    </div>
  ),
};
