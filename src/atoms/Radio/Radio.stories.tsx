import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option 1',
  },
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Select option',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and selected',
    disabled: true,
    defaultChecked: true,
  },
};

export const Compact: Story = {
  args: {
    label: 'Compact variant',
    variant: 'compact',
  },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Radio
          label="Controlled radio"
          checked={selected === 'option1'}
          onChange={() => {
            setSelected('option1');
          }}
        />
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Status: {selected ? 'Selected' : 'Not selected'}
        </div>
      </div>
    );
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '0.25rem',
          }}
        >
          Select an option:
        </div>
        {options.map((option) => (
          <Radio
            key={option.value}
            name="radio-group"
            value={option.value}
            label={option.label}
            checked={selected === option.value}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          />
        ))}
        <div
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            marginTop: '0.5rem',
          }}
        >
          Selected: {selected}
        </div>
      </div>
    );
  },
};

export const CompactRadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('small');

    const sizes = [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            marginBottom: '0.25rem',
          }}
        >
          Size:
        </div>
        {sizes.map((size) => (
          <Radio
            key={size.value}
            name="size-group"
            value={size.value}
            label={size.label}
            variant="compact"
            checked={selected === size.value}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          />
        ))}
      </div>
    );
  },
};
