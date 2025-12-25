import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import '../../styles/tokens.css';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text input field atom. Supports text, email, password, number, search, tel, url, date, time, and datetime-local input types. Provides error states, prefix/suffix slots, and full accessibility. Extends native HTML input props for full control.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'search',
        'tel',
        'url',
        'date',
        'time',
        'datetime-local',
      ],
      description: 'Type of input',
    },
    error: {
      control: 'boolean',
      description: 'Error state - applies error styling',
    },
    errorMessage: {
      control: 'text',
      description: 'Optional error message to display below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make input full width of its container',
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default text input with placeholder text.',
      },
    },
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input type with appropriate placeholder.',
      },
    },
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
  parameters: {
    docs: {
      description: {
        story: 'Password input type that masks the entered text.',
      },
    },
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Number input type for numeric values. Spinner buttons are hidden for cleaner appearance.',
      },
    },
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Search input type with appropriate semantic role.',
      },
    },
  },
};

export const Date: Story = {
  args: {
    type: 'date',
  },
  parameters: {
    docs: {
      description: {
        story: 'Date input type with native browser date picker.',
      },
    },
  },
};

export const Time: Story = {
  args: {
    type: 'time',
  },
  parameters: {
    docs: {
      description: {
        story: 'Time input type with native browser time picker.',
      },
    },
  },
};

export const DateTimeLocal: Story = {
  args: {
    type: 'datetime-local',
  },
  parameters: {
    docs: {
      description: {
        story: 'DateTime-local input type with native browser date and time picker.',
      },
    },
  },
};

export const DateTimeStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Input type="datetime-local" />
      <Input type="datetime-local" error errorMessage="Please select a valid date and time" />
      <Input type="datetime-local" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DateTime-local input in default, error, and disabled states.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Pre-filled value',
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a default value.',
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
          'Error state with an error message displayed below the input. The message is linked via aria-describedby for screen readers.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
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
    placeholder: 'Full width input',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Full width input expands to fill its container.',
      },
    },
  },
};

export const WithPrefixIcon: Story = {
  args: {
    placeholder: 'Search...',
    prefix: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 10.5L14 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a search icon prefix.',
      },
    },
  },
};

export const WithPrefixText: Story = {
  args: {
    placeholder: 'example.com',
    prefix: <span style={{ color: 'var(--color-text-secondary)' }}>https://</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with text prefix for URL input.',
      },
    },
  },
};

export const WithSuffixIcon: Story = {
  args: {
    placeholder: 'Enter text...',
    defaultValue: 'Valid input',
    suffix: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M13.5 4.5L6 12L2.5 8.5"
          stroke="var(--color-success)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a checkmark icon suffix to indicate valid input.',
      },
    },
  },
};

export const WithSuffixButton: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    suffix: (
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
        }}
        aria-label="Toggle password visibility"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with an interactive button suffix for toggling password visibility.',
      },
    },
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    type: 'number',
    defaultValue: '100',
    prefix: <span style={{ color: 'var(--color-text-secondary)' }}>$</span>,
    suffix: <span style={{ color: 'var(--color-text-secondary)' }}>.00</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with both prefix and suffix for currency input.',
      },
    },
  },
};

export const AllInputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="email@example.com" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
      <Input type="search" placeholder="Search..." />
      <Input type="date" />
      <Input type="time" />
      <Input type="datetime-local" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All supported input types displayed together for comparison.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Input placeholder="Default state" />
      <Input error placeholder="Error state" />
      <Input error errorMessage="This field is required" placeholder="Error with message" />
      <Input disabled placeholder="Disabled state" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input states displayed together for comparison.',
      },
    },
  },
};

export const PrefixSuffixExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Input
        placeholder="Search..."
        prefix={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="2" />
          </svg>
        }
      />
      <Input
        defaultValue="Valid input"
        suffix={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="var(--color-success)" strokeWidth="2" />
          </svg>
        }
      />
      <Input
        type="number"
        defaultValue="100"
        prefix={<span style={{ color: 'var(--color-text-secondary)' }}>$</span>}
        suffix={<span style={{ color: 'var(--color-text-secondary)' }}>.00</span>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Common prefix and suffix patterns: search icon, validation checkmark, and currency symbols.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <div>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Name
        </label>
        <Input id="name" name="name" placeholder="John Doe" fullWidth required />
      </div>
      <div>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          fullWidth
          required
        />
      </div>
      <div>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          fullWidth
          required
        />
      </div>
      <div>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Username
        </label>
        <Input
          id="username"
          name="username"
          error
          errorMessage="Username is already taken"
          placeholder="username"
          fullWidth
        />
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example form demonstrating inputs with external labels and validation states.',
      },
    },
  },
};
