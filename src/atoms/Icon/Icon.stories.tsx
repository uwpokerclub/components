import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChevronUp: Story = {
  args: {
    name: 'chevron-up',
    'aria-label': 'Chevron up',
  },
};

export const ChevronDown: Story = {
  args: {
    name: 'chevron-down',
    'aria-label': 'Chevron down',
  },
};

export const ChevronLeft: Story = {
  args: {
    name: 'chevron-left',
    'aria-label': 'Chevron left',
  },
};

export const ChevronRight: Story = {
  args: {
    name: 'chevron-right',
    'aria-label': 'Chevron right',
  },
};

export const Sort: Story = {
  args: {
    name: 'sort',
    'aria-label': 'Sort',
  },
};

export const SortAscending: Story = {
  args: {
    name: 'sort-asc',
    'aria-label': 'Sort ascending',
  },
};

export const SortDescending: Story = {
  args: {
    name: 'sort-desc',
    'aria-label': 'Sort descending',
  },
};

export const SmallSize: Story = {
  args: {
    name: 'sort',
    size: 'sm',
    'aria-label': 'Small icon',
  },
};

export const MediumSize: Story = {
  args: {
    name: 'sort',
    size: 'md',
    'aria-label': 'Medium icon',
  },
};

export const LargeSize: Story = {
  args: {
    name: 'sort',
    size: 'lg',
    'aria-label': 'Large icon',
  },
};

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
        padding: '1rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Icon name="chevron-up" aria-label="Chevron up" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>chevron-up</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="chevron-down" aria-label="Chevron down" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>chevron-down</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="chevron-left" aria-label="Chevron left" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>chevron-left</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="chevron-right" aria-label="Chevron right" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>chevron-right</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="sort" aria-label="Sort" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>sort</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="sort-asc" aria-label="Sort ascending" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>sort-asc</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="sort-desc" aria-label="Sort descending" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>sort-desc</div>
      </div>
    </div>
  ),
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
        <Icon name="sort" size="sm" aria-label="Small" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Small</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="sort" size="md" aria-label="Medium" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Medium</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="sort" size="lg" aria-label="Large" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Large</div>
      </div>
    </div>
  ),
};
