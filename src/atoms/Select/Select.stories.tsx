import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import '../../styles/tokens.css';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'orange', label: 'Orange' },
];

const countryOptions = [
  { value: 'ca', label: 'Canada' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
];

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Select (dropdown) component for choosing from a list of options. Native select element with custom styling for consistent design. Supports error, success, and disabled states with multiple size variants. Extends native HTML select props for full control.',
      },
    },
  },
  argTypes: {
    options: {
      description: 'Array of select options with value and label',
      control: 'object',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown as disabled first option',
    },
    error: {
      control: 'boolean',
      description: 'Error state - applies error styling',
    },
    errorMessage: {
      control: 'text',
      description: 'Optional error message to display below the select',
    },
    success: {
      control: 'boolean',
      description: 'Success/valid state - applies success styling',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the select',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make select full width of its container',
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Select a fruit...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default select with placeholder text.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    options: fruitOptions,
    defaultValue: 'banana',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with a pre-selected default value.',
      },
    },
  },
};

export const NoPlaceholder: Story = {
  args: {
    options: fruitOptions,
  },
  parameters: {
    docs: {
      description: {
        story: 'Select without placeholder - first option is selected by default.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Select a fruit...',
    error: true,
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
    options: fruitOptions,
    placeholder: 'Select a fruit...',
    error: true,
    errorMessage: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error state with an error message displayed below the select. The message is linked via aria-describedby for screen readers.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    options: fruitOptions,
    defaultValue: 'apple',
    success: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Success state applies green border styling to indicate valid selection.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Cannot select',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents interaction and reduces opacity.',
      },
    },
  },
};

export const DisabledWithValue: Story = {
  args: {
    options: fruitOptions,
    defaultValue: 'cherry',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled select can still display a selected value.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Small select',
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant - 32px height.',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Medium select',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size variant - 40px height (default).',
      },
    },
  },
};

export const Large: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Large select',
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant - 48px height.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    options: fruitOptions,
    placeholder: 'Full width select',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Full width select expands to fill its container.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Select options={fruitOptions} placeholder="Small" size="small" fullWidth />
      <Select options={fruitOptions} placeholder="Medium (default)" size="medium" fullWidth />
      <Select options={fruitOptions} placeholder="Large" size="large" fullWidth />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All size variants displayed together for comparison.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <Select options={fruitOptions} placeholder="Default state" fullWidth />
      <Select options={fruitOptions} defaultValue="apple" success fullWidth />
      <Select options={fruitOptions} placeholder="Error state" error fullWidth />
      <Select
        options={fruitOptions}
        placeholder="Error with message"
        error
        errorMessage="This field is required"
        fullWidth
      />
      <Select options={fruitOptions} placeholder="Disabled state" disabled fullWidth />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All select states displayed together for comparison.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <div>
        <label htmlFor="country" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Country
        </label>
        <Select
          id="country"
          name="country"
          options={countryOptions}
          placeholder="Select your country..."
          fullWidth
          required
        />
      </div>
      <div>
        <label htmlFor="fruit" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Favorite Fruit
        </label>
        <Select
          id="fruit"
          name="fruit"
          options={fruitOptions}
          placeholder="Choose a fruit..."
          fullWidth
          required
        />
      </div>
      <div>
        <label htmlFor="invalid" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Invalid Selection
        </label>
        <Select
          id="invalid"
          name="invalid"
          options={fruitOptions}
          placeholder="This field has an error"
          error
          errorMessage="Please select a valid option"
          fullWidth
        />
      </div>
      <div>
        <label htmlFor="valid" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Valid Selection
        </label>
        <Select
          id="valid"
          name="valid"
          options={fruitOptions}
          defaultValue="banana"
          success
          fullWidth
        />
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example form demonstrating selects with external labels and validation states.',
      },
    },
  },
};

export const MixedSizesInForm: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <label
          htmlFor="small-select"
          style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}
        >
          Compact
        </label>
        <Select
          id="small-select"
          options={fruitOptions}
          placeholder="Small"
          size="small"
          fullWidth
        />
      </div>
      <div style={{ flex: 1 }}>
        <label htmlFor="medium-select" style={{ display: 'block', marginBottom: '0.25rem' }}>
          Standard
        </label>
        <Select
          id="medium-select"
          options={fruitOptions}
          placeholder="Medium"
          size="medium"
          fullWidth
        />
      </div>
      <div style={{ flex: 1 }}>
        <label
          htmlFor="large-select"
          style={{ display: 'block', marginBottom: '0.25rem', fontSize: '1.125rem' }}
        >
          Large
        </label>
        <Select
          id="large-select"
          options={fruitOptions}
          placeholder="Large"
          size="large"
          fullWidth
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Different size variants used in a form layout to match different contexts.',
      },
    },
  },
};
