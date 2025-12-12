import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const CustomLabel: Story = {
  args: {
    'aria-label': 'Loading your data',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Spinner size="sm" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Small</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="md" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Medium</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="lg" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Large</div>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--border-radius-md)',
        minWidth: '300px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <Spinner size="sm" />
        <span>Loading data...</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Spinner size="lg" />
      </div>
    </div>
  ),
};
