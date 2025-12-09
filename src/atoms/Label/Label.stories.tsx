import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';
import { Input } from '../Input/Input';
import '../../styles/tokens.css';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form label atom. Provides accessible labels for form inputs with size variants, required indicators, and disabled states. Extends native HTML label props for full control.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant to match associated input components',
    },
    required: {
      control: 'boolean',
      description: 'Display required indicator (red asterisk after text)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state styling',
    },
    htmlFor: {
      control: 'text',
      description: 'Associates label with input element by ID',
    },
    children: {
      control: 'text',
      description: 'Label text content',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Username',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default label with medium size.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant for compact forms.',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size variant (default).',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant for prominent forms.',
      },
    },
  },
};

export const Required: Story = {
  args: {
    children: 'Email Address',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Label with required indicator (red asterisk) displayed after the text.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Field',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state with reduced opacity and muted color.',
      },
    },
  },
};

export const DisabledRequired: Story = {
  args: {
    children: 'Disabled Required Field',
    disabled: true,
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled label with required indicator.',
      },
    },
  },
};

export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '300px' }}>
      <Label htmlFor="username-input">Username</Label>
      <Input id="username-input" placeholder="Enter your username" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Label associated with an input using htmlFor. Clicking the label focuses the input.',
      },
    },
  },
};

export const RequiredWithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '300px' }}>
      <Label htmlFor="email-input" required>
        Email Address
      </Label>
      <Input id="email-input" type="email" placeholder="email@example.com" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Required label with associated input field.',
      },
    },
  },
};

export const DisabledWithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '300px' }}>
      <Label htmlFor="disabled-input" disabled>
        Disabled Field
      </Label>
      <Input id="disabled-input" disabled placeholder="Cannot edit this field" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled label with disabled input field.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <Label size="small">Small Label</Label>
      </div>
      <div>
        <Label size="medium">Medium Label</Label>
      </div>
      <div>
        <Label size="large">Large Label</Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All label size variants displayed together for comparison.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <Label>Normal Label</Label>
      </div>
      <div>
        <Label required>Required Label</Label>
      </div>
      <div>
        <Label disabled>Disabled Label</Label>
      </div>
      <div>
        <Label disabled required>
          Disabled Required Label
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All label states displayed together for comparison.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="form-name" required>
          Full Name
        </Label>
        <Input id="form-name" name="name" placeholder="John Doe" fullWidth />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="form-email" required>
          Email Address
        </Label>
        <Input id="form-email" name="email" type="email" placeholder="john@example.com" fullWidth />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="form-phone">Phone Number</Label>
        <Input id="form-phone" name="phone" type="tel" placeholder="(555) 123-4567" fullWidth />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="form-website" disabled>
          Website
        </Label>
        <Input
          id="form-website"
          name="website"
          type="url"
          placeholder="https://example.com"
          disabled
          fullWidth
        />
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example form demonstrating labels with inputs in various states: required, optional, and disabled.',
      },
    },
  },
};

export const SizeMatchingInputs: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="small-input" size="small">
          Small Label
        </Label>
        <Input id="small-input" placeholder="Small input" fullWidth />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="medium-input" size="medium">
          Medium Label
        </Label>
        <Input id="medium-input" placeholder="Medium input" fullWidth />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <Label htmlFor="large-input" size="large">
          Large Label
        </Label>
        <Input id="large-input" placeholder="Large input" fullWidth />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels sized to match their associated input components for visual consistency.',
      },
    },
  },
};
