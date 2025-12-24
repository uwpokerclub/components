import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../atoms/Button';
import { ToastProvider, useToast } from './index';

const meta = {
  title: 'Organisms/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive demo with buttons to trigger toasts
 */
const InteractiveDemo = () => {
  const { showToast, hideAllToasts } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <h2>Toast Notification Demo</h2>
      <p>Click the buttons below to see toast notifications in action.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <Button
          onClick={() => {
            showToast({
              message: 'Operation completed successfully!',
              variant: 'success',
            });
          }}
        >
          Show Success Toast
        </Button>

        <Button
          onClick={() => {
            showToast({
              message: 'An error occurred while processing your request.',
              variant: 'error',
            });
          }}
        >
          Show Error Toast
        </Button>

        <Button
          onClick={() => {
            showToast({
              message: 'Please review your settings before continuing.',
              variant: 'warning',
            });
          }}
        >
          Show Warning Toast
        </Button>

        <Button
          onClick={() => {
            showToast({
              message: 'Your profile has been updated.',
              variant: 'info',
            });
          }}
        >
          Show Info Toast
        </Button>

        <Button
          onClick={() => {
            showToast({
              message: 'This toast will not auto-dismiss.',
              variant: 'info',
              duration: 0,
            });
          }}
        >
          Persistent Toast
        </Button>

        <Button
          onClick={() => {
            showToast({
              message: 'This toast dismisses quickly (2 seconds).',
              variant: 'success',
              duration: 2000,
            });
          }}
        >
          Quick Dismiss
        </Button>

        <Button
          onClick={() => {
            showToast({
              message:
                'This is a very long message that demonstrates how the toast component handles text wrapping and displays multiple lines of content gracefully without breaking the layout or causing overflow issues.',
              variant: 'info',
            });
          }}
        >
          Long Message
        </Button>

        <Button
          onClick={() => {
            hideAllToasts();
          }}
          variant="secondary"
        >
          Clear All Toasts
        </Button>
      </div>

      <h3>Multiple Toasts</h3>
      <Button
        onClick={() => {
          showToast({ message: 'First toast', variant: 'success' });
          setTimeout(() => {
            showToast({ message: 'Second toast', variant: 'info' });
          }, 500);
          setTimeout(() => {
            showToast({ message: 'Third toast', variant: 'warning' });
          }, 1000);
        }}
      >
        Show Multiple Toasts
      </Button>

      <h3>Different Positions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        <Button
          size="sm"
          onClick={() => {
            showToast({
              message: 'Top Left',
              variant: 'info',
              position: 'top-left',
            });
          }}
        >
          Top Left
        </Button>
        <Button
          size="sm"
          onClick={() => {
            showToast({
              message: 'Top Center',
              variant: 'info',
              position: 'top-center',
            });
          }}
        >
          Top Center
        </Button>
        <Button
          size="sm"
          onClick={() => {
            showToast({
              message: 'Top Right (default)',
              variant: 'info',
              position: 'top-right',
            });
          }}
        >
          Top Right
        </Button>
        <Button
          size="sm"
          onClick={() => {
            showToast({
              message: 'Bottom Left',
              variant: 'success',
              position: 'bottom-left',
            });
          }}
        >
          Bottom Left
        </Button>
        <Button
          size="sm"
          onClick={() => {
            showToast({
              message: 'Bottom Center',
              variant: 'success',
              position: 'bottom-center',
            });
          }}
        >
          Bottom Center
        </Button>
        <Button
          size="sm"
          onClick={() => {
            showToast({
              message: 'Bottom Right',
              variant: 'success',
              position: 'bottom-right',
            });
          }}
        >
          Bottom Right
        </Button>
      </div>

      <h3>Without Progress Bar</h3>
      <Button
        onClick={() => {
          showToast({
            message: 'Toast without progress bar',
            variant: 'info',
            showProgressBar: false,
          });
        }}
      >
        No Progress Bar
      </Button>

      <h3>Without Close Button</h3>
      <Button
        onClick={() => {
          showToast({
            message: 'Toast without close button (auto-dismiss only)',
            variant: 'warning',
            showCloseButton: false,
            duration: 3000,
          });
        }}
      >
        No Close Button
      </Button>
    </div>
  );
};

/**
 * Default interactive toast demo
 */
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <InteractiveDemo />
    </ToastProvider>
  ),
};

/**
 * Success variant toast
 */
export const SuccessToast: Story = {
  render: () => {
    const Demo = () => {
      const { showToast } = useToast();
      return (
        <Button
          onClick={() => {
            showToast({
              message: 'Your changes have been saved successfully!',
              variant: 'success',
            });
          }}
        >
          Show Success Toast
        </Button>
      );
    };

    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

/**
 * Error variant toast
 */
export const ErrorToast: Story = {
  render: () => {
    const Demo = () => {
      const { showToast } = useToast();
      return (
        <Button
          onClick={() => {
            showToast({
              message: 'Failed to process your request. Please try again.',
              variant: 'error',
            });
          }}
        >
          Show Error Toast
        </Button>
      );
    };

    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

/**
 * Warning variant toast
 */
export const WarningToast: Story = {
  render: () => {
    const Demo = () => {
      const { showToast } = useToast();
      return (
        <Button
          onClick={() => {
            showToast({
              message: 'Your session will expire in 5 minutes.',
              variant: 'warning',
            });
          }}
        >
          Show Warning Toast
        </Button>
      );
    };

    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

/**
 * Info variant toast
 */
export const InfoToast: Story = {
  render: () => {
    const Demo = () => {
      const { showToast } = useToast();
      return (
        <Button
          onClick={() => {
            showToast({
              message: 'New features are now available in your dashboard.',
              variant: 'info',
            });
          }}
        >
          Show Info Toast
        </Button>
      );
    };

    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

/**
 * Multiple toasts stacking demonstration
 */
export const MultipleToasts: Story = {
  render: () => {
    const Demo = () => {
      const { showToast } = useToast();
      return (
        <Button
          onClick={() => {
            showToast({
              message: 'First notification',
              variant: 'success',
            });
            setTimeout(() => {
              showToast({
                message: 'Second notification',
                variant: 'info',
              });
            }, 500);
            setTimeout(() => {
              showToast({
                message: 'Third notification',
                variant: 'warning',
              });
            }, 1000);
            setTimeout(() => {
              showToast({
                message: 'Fourth notification',
                variant: 'error',
              });
            }, 1500);
          }}
        >
          Show Multiple Toasts
        </Button>
      );
    };

    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};

/**
 * Toast without auto-dismiss (persistent)
 */
export const PersistentToast: Story = {
  render: () => {
    const Demo = () => {
      const { showToast } = useToast();
      return (
        <Button
          onClick={() => {
            showToast({
              message: 'This toast will remain until you close it manually.',
              variant: 'info',
              duration: 0,
            });
          }}
        >
          Show Persistent Toast
        </Button>
      );
    };

    return (
      <ToastProvider>
        <Demo />
      </ToastProvider>
    );
  },
};
