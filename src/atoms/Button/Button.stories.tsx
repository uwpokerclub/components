import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import '../../styles/tokens.css';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary UI interaction element. Supports multiple variants, sizes, loading states, and icon combinations. Extends native HTML button props for full control.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state - shows spinner and disables the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width of its container',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary button using UWPSC gold color. Use for main actions.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button using UW purple color. Use for secondary actions.',
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary outline button. Use for less prominent actions.',
      },
    },
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
  parameters: {
    docs: {
      description: {
        story: 'Destructive button for dangerous actions like delete or remove.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size button (2rem / 32px height).',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size button (2.5rem / 40px height). This is the default size.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size button (3rem / 48px height).',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state shows a spinner and disables the button to prevent double clicks.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents interaction and reduces opacity.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Full width button expands to fill its container.',
      },
    },
  },
};

export const WithIconBefore: Story = {
  args: {
    iconBefore: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 0L9.79611 6.20389L16 8L9.79611 9.79611L8 16L6.20389 9.79611L0 8L6.20389 6.20389L8 0Z"
          fill="currentColor"
        />
      </svg>
    ),
    children: 'With Icon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned before the text.',
      },
    },
  },
};

export const WithIconAfter: Story = {
  args: {
    iconAfter: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M5.5 3L4.79289 3.70711L8.08579 7H1.5V8H8.08579L4.79289 11.2929L5.5 12L10 7.5L5.5 3Z"
          fill="currentColor"
        />
      </svg>
    ),
    children: 'Next',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned after the text.',
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    iconBefore: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    'aria-label': 'Add item',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only button without text. Always provide an aria-label for accessibility.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together for comparison.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button>Default</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button states displayed together for comparison.',
      },
    },
  },
};

export const IconCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'start' }}>
      <Button
        iconBefore={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0L9.79611 6.20389L16 8L9.79611 9.79611L8 16L6.20389 9.79611L0 8L6.20389 6.20389L8 0Z"
              fill="currentColor"
            />
          </svg>
        }
      >
        Icon Before
      </Button>
      <Button
        iconAfter={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M5.5 3L4.79289 3.70711L8.08579 7H1.5V8H8.08579L4.79289 11.2929L5.5 12L10 7.5L5.5 3Z"
              fill="currentColor"
            />
          </svg>
        }
      >
        Icon After
      </Button>
      <Button
        iconBefore={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
        aria-label="Add item"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different icon combinations: before text, after text, and icon-only.',
      },
    },
  },
};
