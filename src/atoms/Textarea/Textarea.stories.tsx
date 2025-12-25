import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';
import '../../styles/tokens.css';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Multi-line text input atom. Provides error states and full accessibility. Supports vertical resizing and configurable row height. Extends native HTML textarea props for full control.',
      },
    },
  },
  argTypes: {
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
    error: {
      control: 'boolean',
      description: 'Error state - applies error styling',
    },
    errorMessage: {
      control: 'text',
      description: 'Optional error message to display below the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make textarea full width of its container',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    onChange: {
      action: 'changed',
      description: 'Change event handler',
    },
    onFocus: {
      action: 'focused',
      description: 'Focus event handler',
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur event handler',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default textarea with placeholder text and 3 visible rows.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Pre-filled multi-line value.\nThis is the second line.',
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with a default multi-line value.',
      },
    },
  },
};

export const CustomRows: Story = {
  args: {
    rows: 6,
    placeholder: 'Enter a longer message...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with 6 visible rows for longer content.',
      },
    },
  },
};

export const SingleRow: Story = {
  args: {
    rows: 1,
    placeholder: 'Single row textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textarea with a single visible row.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state applies red border styling to indicate validation failure.',
      },
    },
  },
};

export const WithErrorMessage: Story = {
  args: {
    error: true,
    errorMessage: 'This field is required',
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error state with an error message displayed below the textarea. The message is linked via aria-describedby for screen readers.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents interaction and reduces opacity. Resize is also disabled.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width textarea',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Full width textarea expands to fill its container.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Textarea placeholder="Default state" />
      <Textarea error placeholder="Error state" />
      <Textarea error errorMessage="This field is required" placeholder="Error with message" />
      <Textarea disabled placeholder="Disabled state" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All textarea states displayed together for comparison.',
      },
    },
  },
};

export const RowVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Textarea rows={1} placeholder="1 row" />
      <Textarea rows={3} placeholder="3 rows (default)" />
      <Textarea rows={6} placeholder="6 rows" />
      <Textarea rows={10} placeholder="10 rows" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with different row counts for various content lengths.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '400px' }}>
      <div>
        <label htmlFor="description" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter a description..."
          rows={4}
          fullWidth
        />
      </div>
      <div>
        <label htmlFor="notes" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Notes (optional)
        </label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Add any additional notes..."
          rows={3}
          fullWidth
        />
      </div>
      <div>
        <label htmlFor="feedback" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Feedback
        </label>
        <Textarea
          id="feedback"
          name="feedback"
          placeholder="Tell us what you think..."
          rows={5}
          error
          errorMessage="Please provide more detail (minimum 50 characters)"
          fullWidth
        />
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example form demonstrating textareas with external labels and validation states.',
      },
    },
  },
};
