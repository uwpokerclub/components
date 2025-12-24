import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormField } from './FormField';
import { Input } from '../../atoms/Input';
import { Select } from '../../atoms/Select';
import { Checkbox } from '../../atoms/Checkbox';
import '../../styles/tokens.css';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FormField molecule combines a Label, input component, optional hint text, and error message into a cohesive form field. Uses render props pattern to provide ARIA attributes to child components for proper accessibility.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the form field',
    },
    htmlFor: {
      control: 'text',
      description: 'ID for the input element',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    required: {
      control: 'boolean',
      description: 'Show required indicator',
    },
    hint: {
      control: 'text',
      description: 'Helper text below the label',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email',
  },
  render: (args) => (
    <FormField {...args}>
      {(props) => <Input {...props} type="email" placeholder="you@example.com" />}
    </FormField>
  ),
};

export const Required: Story = {
  args: {
    label: 'Password',
    htmlFor: 'password',
    required: true,
  },
  render: (args) => (
    <FormField {...args}>{(props) => <Input {...props} type="password" />}</FormField>
  ),
};

export const WithHint: Story = {
  args: {
    label: 'Username',
    htmlFor: 'username',
    hint: 'Choose a unique username between 3-20 characters',
  },
  render: (args) => (
    <FormField {...args}>{(props) => <Input {...props} placeholder="johndoe" />}</FormField>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email-error',
    error: 'Please enter a valid email address',
  },
  render: (args) => <FormField {...args}>{(props) => <Input {...props} type="email" />}</FormField>,
};

export const RequiredWithError: Story = {
  args: {
    label: 'Password',
    htmlFor: 'password-error',
    required: true,
    error: 'Password is required',
  },
  render: (args) => (
    <FormField {...args}>{(props) => <Input {...props} type="password" />}</FormField>
  ),
};

export const WithHintAndError: Story = {
  args: {
    label: 'Confirm Password',
    htmlFor: 'confirm-password',
    hint: 'Must match your password',
    error: 'Passwords do not match',
    required: true,
  },
  render: (args) => (
    <FormField {...args}>{(props) => <Input {...props} type="password" />}</FormField>
  ),
};

export const WithSelect: Story = {
  args: {
    label: 'Country',
    htmlFor: 'country',
    required: true,
    hint: 'Select your country of residence',
  },
  render: (args) => (
    <FormField {...args}>
      {(props) => (
        <Select
          {...props}
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'au', label: 'Australia' },
          ]}
          placeholder="Choose a country"
        />
      )}
    </FormField>
  ),
};

export const WithSelectError: Story = {
  args: {
    label: 'Favorite Fruit',
    htmlFor: 'fruit',
    error: 'Please select a fruit',
  },
  render: (args) => (
    <FormField {...args}>
      {(props) => (
        <Select
          {...props}
          options={[
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana' },
            { value: 'orange', label: 'Orange' },
          ]}
          placeholder="Select a fruit"
        />
      )}
    </FormField>
  ),
};

export const WithCheckbox: Story = {
  args: {
    label: 'Terms and Conditions',
    htmlFor: 'terms',
    required: true,
  },
  render: (args) => (
    <FormField {...args}>
      {(props) => <Checkbox {...props} label="I agree to the terms and conditions" />}
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Note: When using Checkbox with FormField, the Checkbox component has its own built-in label. The FormField label serves as the field label.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small Field',
    htmlFor: 'small',
    size: 'small',
    hint: 'This is a small field',
  },
  render: (args) => (
    <FormField {...args}>{(props) => <Input {...props} placeholder="Small input" />}</FormField>
  ),
};

export const LargeSize: Story = {
  args: {
    label: 'Large Field',
    htmlFor: 'large',
    size: 'large',
    hint: 'This is a large field',
  },
  render: (args) => (
    <FormField {...args}>{(props) => <Input {...props} placeholder="Large input" />}</FormField>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    htmlFor: 'disabled',
    disabled: true,
    hint: 'This field is disabled',
  },
  render: (args) => (
    <FormField {...args}>
      {(props) => <Input {...props} placeholder="Disabled input" disabled />}
    </FormField>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FormField label="Full Width Input" htmlFor="fullwidth">
        {(props) => <Input {...props} placeholder="This input is full width" fullWidth />}
      </FormField>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const InteractiveForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      country: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!formData.country) {
        newErrors.country = 'Please select a country';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <form onSubmit={handleSubmit} style={{ width: '320px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <FormField
            label="Email"
            htmlFor="email"
            required
            hint="We'll never share your email"
            error={errors.email}
          >
            {(props) => (
              <Input
                {...props}
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                fullWidth
              />
            )}
          </FormField>

          <FormField
            label="Password"
            htmlFor="password"
            required
            hint="Must be at least 8 characters"
            error={errors.password}
          >
            {(props) => (
              <Input
                {...props}
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
              />
            )}
          </FormField>

          <FormField label="Country" htmlFor="country" required error={errors.country}>
            {(props) => (
              <Select
                {...props}
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  { value: 'uk', label: 'United Kingdom' },
                ]}
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="Select a country"
                fullWidth
              />
            )}
          </FormField>

          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--color-primary)',
              border: 'none',
              borderRadius: 'var(--border-radius-md)',
              cursor: 'pointer',
              fontWeight: 500,
              color: 'var(--color-text)',
            }}
          >
            Submit
          </button>
        </div>
      </form>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Interactive form with validation. Try submitting with empty or invalid values.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '320px' }}>
      <FormField label="Default" htmlFor="default">
        {(props) => <Input {...props} placeholder="Default state" />}
      </FormField>

      <FormField label="Required" htmlFor="required" required>
        {(props) => <Input {...props} placeholder="Required field" />}
      </FormField>

      <FormField label="With Hint" htmlFor="hint" hint="This is a helpful hint">
        {(props) => <Input {...props} placeholder="Field with hint" />}
      </FormField>

      <FormField label="With Error" htmlFor="error" error="This field has an error">
        {(props) => <Input {...props} placeholder="Field with error" />}
      </FormField>

      <FormField
        label="All Features"
        htmlFor="all"
        required
        hint="This field has everything"
        error="But it still has an error"
      >
        {(props) => <Input {...props} placeholder="All features combined" />}
      </FormField>

      <FormField label="Disabled" htmlFor="disabled" disabled>
        {(props) => <Input {...props} placeholder="Disabled field" disabled />}
      </FormField>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};
