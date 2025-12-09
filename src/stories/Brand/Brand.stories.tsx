import type { Meta, StoryObj } from '@storybook/react-vite';
import { Brand } from './Brand';
import '../../styles/tokens.css';

const meta = {
  title: 'Brand/Design Tokens',
  component: Brand,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Showcases the official UW Poker & Strategy Club design tokens including brand colors, typography, spacing, and UI examples. These tokens are available for use in all UWPSC projects via CSS variables.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Theme variant to display',
    },
  },
} satisfies Meta<typeof Brand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightTheme: Story = {
  args: {
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Light theme showcasing UWPSC gold (#f4b80f) and UW purple (#4b2e83) brand colors with Montserrat typography.',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story:
          'Dark theme variant with adjusted brand colors for optimal contrast and readability on dark backgrounds.',
      },
    },
  },
};
