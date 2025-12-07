import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import { Page } from './Page';

const meta = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await userEvent.click(loginButton);

    const logoutButton = await canvas.findByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
    await userEvent.click(logoutButton);

    // After logout, login button should be back
    const loginButtonAgain = await canvas.findByRole('button', { name: /Log in/i });
    await expect(loginButtonAgain).toBeInTheDocument();
  },
};

export const SignUp: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const signUpButton = canvas.getByRole('button', { name: /Sign up/i });
    await userEvent.click(signUpButton);

    const logoutButton = await canvas.findByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};
