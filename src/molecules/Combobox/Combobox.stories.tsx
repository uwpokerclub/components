import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Combobox, type ComboboxOption } from './Combobox';
import '../../styles/tokens.css';

const fruitOptions: ComboboxOption[] = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Cherry' },
  { value: '4', label: 'Date' },
  { value: '5', label: 'Elderberry' },
  { value: '6', label: 'Fig' },
  { value: '7', label: 'Grape' },
  { value: '8', label: 'Honeydew' },
  { value: '9', label: 'Kiwi' },
  { value: '10', label: 'Lemon' },
  { value: '11', label: 'Mango' },
  { value: '12', label: 'Orange' },
  { value: '13', label: 'Papaya' },
  { value: '14', label: 'Strawberry' },
  { value: '15', label: 'Watermelon' },
];

const meta = {
  title: 'Molecules/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Searchable dropdown component (autocomplete) with support for both client-side filtering and async data loading. Features debounced search, keyboard navigation, loading states, and full ARIA combobox pattern support.',
      },
    },
  },
  argTypes: {
    options: {
      description: 'Array of available options',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when user selects an option',
    },
    onSearch: {
      action: 'searched',
      description: 'Search callback - enables async mode when provided',
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    debounceMs: {
      control: 'number',
      description: 'Search debounce delay in milliseconds',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to display when no results are found',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make combobox full width of its container',
    },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Combobox
        options={fruitOptions}
        value={value}
        onChange={setValue}
        onSearch={undefined}
        placeholder="Select a fruit..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Default combobox with client-side filtering. Type to filter the list of fruits.',
      },
    },
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('3');
    return (
      <Combobox
        options={fruitOptions}
        value={value}
        onChange={setValue}
        onSearch={undefined}
        placeholder="Select a fruit..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Combobox with a pre-selected value. Click the clear button or focus to search.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Combobox
        options={fruitOptions}
        value={value}
        onChange={setValue}
        isLoading
        onSearch={undefined}
        placeholder="Loading..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Combobox in loading state, showing a spinner indicator.',
      },
    },
  },
};

export const Error: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Combobox
        options={fruitOptions}
        value={value}
        onChange={setValue}
        error
        onSearch={undefined}
        placeholder="Select a fruit..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Combobox in error state with red border styling.',
      },
    },
  },
};

export const WithErrorMessage: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Combobox
        options={fruitOptions}
        value={value}
        onChange={setValue}
        error
        errorMessage="Please select a fruit"
        onSearch={undefined}
        placeholder="Select a fruit..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Combobox with error state and error message displayed below.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Combobox
        options={fruitOptions}
        value={value}
        onChange={setValue}
        disabled
        onSearch={undefined}
        placeholder="Disabled combobox"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled combobox that cannot be interacted with.',
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Combobox
        options={fruitOptions}
        value={value}
        onChange={setValue}
        fullWidth
        onSearch={undefined}
        placeholder="Full width combobox..."
      />
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Combobox that expands to fill its container width.',
      },
    },
  },
};

export const CustomEmptyMessage: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Combobox
        options={[]}
        value={value}
        onChange={setValue}
        emptyMessage="No fruits available"
        onSearch={undefined}
        placeholder="Search fruits..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Combobox with a custom message when no options are available.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <div style={{ minWidth: '300px' }}>
        <Combobox
          options={fruitOptions}
          value={value}
          onChange={setValue}
          onSearch={undefined}
          placeholder="Select a fruit..."
          fullWidth
        />
        <div
          style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}
        >
          Selected value: <strong>{value ?? 'None'}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled combobox with React state. The selected value is displayed below.',
      },
    },
  },
};

export const AsyncSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [options, setOptions] = useState<ComboboxOption[]>(fruitOptions);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (query: string) => {
      setIsLoading(true);

      // Simulate API call with timeout
      setTimeout(() => {
        const filtered = fruitOptions.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );
        setOptions(filtered);
        setIsLoading(false);
      }, 500);
    };

    return (
      <div style={{ minWidth: '300px' }}>
        <Combobox
          options={options}
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
          isLoading={isLoading}
          placeholder="Search fruits..."
          debounceMs={300}
          fullWidth
        />
        <div
          style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}
        >
          Selected: <strong>{options.find((o) => o.value === value)?.label ?? 'None'}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Async combobox that simulates a server-side search with 500ms delay. Search is debounced by 300ms.',
      },
    },
  },
};

export const CustomDebounce: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    return (
      <div style={{ minWidth: '300px' }}>
        <Combobox
          options={fruitOptions}
          value={value}
          onChange={setValue}
          onSearch={setSearchQuery}
          placeholder="Search fruits..."
          debounceMs={1000}
          fullWidth
        />
        <div
          style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}
        >
          Debounced query (1000ms): <strong>{searchQuery || 'None'}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Combobox with custom 1000ms debounce delay. The search query is displayed below after the debounce period.',
      },
    },
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [fruit, setFruit] = useState<string | null>(null);
    const [vegetable, setVegetable] = useState<string | null>(null);
    const [error, setError] = useState(false);

    const vegetableOptions: ComboboxOption[] = [
      { value: '1', label: 'Carrot' },
      { value: '2', label: 'Broccoli' },
      { value: '3', label: 'Spinach' },
      { value: '4', label: 'Tomato' },
      { value: '5', label: 'Cucumber' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!fruit || !vegetable) {
        setError(true);
        return;
      }
      setError(false);
      alert(
        `Selected: ${fruitOptions.find((o) => o.value === fruit)?.label} and ${vegetableOptions.find((o) => o.value === vegetable)?.label}`
      );
    };

    return (
      <form onSubmit={handleSubmit} style={{ minWidth: '320px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="fruit-combo"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
          >
            Favorite Fruit *
          </label>
          <Combobox
            id="fruit-combo"
            options={fruitOptions}
            value={fruit}
            onChange={setFruit}
            onSearch={undefined}
            placeholder="Select a fruit..."
            error={error && !fruit}
            errorMessage={error && !fruit ? 'Please select a fruit' : undefined}
            fullWidth
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="veg-combo"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}
          >
            Favorite Vegetable *
          </label>
          <Combobox
            id="veg-combo"
            options={vegetableOptions}
            value={vegetable}
            onChange={setVegetable}
            onSearch={undefined}
            placeholder="Select a vegetable..."
            error={error && !vegetable}
            errorMessage={error && !vegetable ? 'Please select a vegetable' : undefined}
            fullWidth
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Submit
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form integration example with validation. Both fields are required.',
      },
    },
  },
};

export const AllStates: Story = {
  render: () => {
    const [value1, setValue1] = useState<string | null>(null);
    const [value2, setValue2] = useState<string | null>('3');
    const [value3, setValue3] = useState<string | null>(null);
    const [value4, setValue4] = useState<string | null>(null);
    const [value5, setValue5] = useState<string | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }}>
        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            Default
          </div>
          <Combobox
            options={fruitOptions}
            value={value1}
            onChange={setValue1}
            onSearch={undefined}
            placeholder="Select a fruit..."
          />
        </div>

        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            With Value
          </div>
          <Combobox
            options={fruitOptions}
            value={value2}
            onChange={setValue2}
            onSearch={undefined}
            placeholder="Select a fruit..."
          />
        </div>

        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            Loading
          </div>
          <Combobox
            options={fruitOptions}
            value={value3}
            onChange={setValue3}
            isLoading
            onSearch={undefined}
            placeholder="Loading..."
          />
        </div>

        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Error</div>
          <Combobox
            options={fruitOptions}
            value={value4}
            onChange={setValue4}
            error
            errorMessage="This field is required"
            onSearch={undefined}
            placeholder="Select a fruit..."
          />
        </div>

        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            Disabled
          </div>
          <Combobox
            options={fruitOptions}
            value={value5}
            onChange={setValue5}
            disabled
            onSearch={undefined}
            placeholder="Disabled combobox"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All combobox states displayed together for comparison.',
      },
    },
  },
};
