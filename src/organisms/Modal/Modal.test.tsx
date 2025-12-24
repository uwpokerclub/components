import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Modal } from './Modal';
import styles from './Modal.module.css';

describe('Modal', () => {
  let onClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onClose = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Reset body styles (portal cleanup handled by React Testing Library)
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  describe('Rendering', () => {
    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={onClose}>
          Content
        </Modal>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('renders portal to modal-root', async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      const portalRoot = document.getElementById('modal-root');
      expect(portalRoot).toBeInTheDocument();

      await waitFor(() => {
        if (portalRoot) {
          expect(within(portalRoot).getByRole('dialog')).toBeInTheDocument();
        }
      });
    });

    it('renders title when provided', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} title="Test Modal">
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
      });
    });

    it('renders children content', async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div data-testid="test-content">Test Content</div>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByTestId('test-content')).toBeInTheDocument();
      });
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders footer when provided', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} footer={<button>Action</button>}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
      });
    });

    it('renders close button by default', async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
      });
    });

    it('hides close button when showCloseButton is false', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} showCloseButton={false}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
      });

      await user.click(screen.getByLabelText('Close modal'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close on Escape when closeOnEscape is false', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Modal isOpen={true} onClose={onClose} closeOnEscape={false}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');
      expect(onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when backdrop is clicked', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      const overlay = dialog.parentElement;

      if (overlay) {
        await user.click(overlay);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it('does not close when backdrop is clicked and closeOnClickOutside is false', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Modal isOpen={true} onClose={onClose} closeOnClickOutside={false}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      const overlay = dialog.parentElement;

      if (overlay) {
        await user.click(overlay);
        expect(onClose).not.toHaveBeenCalled();
      }
    });

    it('does not close when modal content is clicked', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <Modal isOpen={true} onClose={onClose}>
          <div data-testid="content">Content</div>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('content'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Props', () => {
    it('applies sm size class', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} size="sm">
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass(styles.sm);
    });

    it('applies md size class by default', async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass(styles.md);
    });

    it('applies lg size class', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} size="lg">
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass(styles.lg);
    });

    it('applies xl size class', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} size="xl">
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass(styles.xl);
    });

    it('applies custom className', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} className="custom-modal">
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('custom-modal');
    });
  });

  describe('Accessibility', () => {
    it('has role="dialog"', async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('has aria-modal="true"', async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-labelledby pointing to title when title is provided', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} title="Test Title">
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      const title = screen.getByText('Test Title');
      const titleId = title.getAttribute('id');

      expect(dialog).toHaveAttribute('aria-labelledby', titleId);
    });

    it('uses custom aria-labelledby when provided', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} aria-labelledby="custom-label">
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'custom-label');
    });

    it('uses custom aria-describedby when provided', async () => {
      render(
        <Modal isOpen={true} onClose={onClose} aria-describedby="custom-description">
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-describedby', 'custom-description');
    });

    it('close button has aria-label', async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    it('locks body scroll when open', async () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', async () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={onClose}>
          Content
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal isOpen={false} onClose={onClose}>
          Content
        </Modal>
      );

      // Wait for cleanup effect
      await waitFor(
        () => {
          expect(document.body.style.overflow).toBe('');
        },
        { timeout: 500 }
      );
    });

    it('traps focus inside modal when open', async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <>
          <button>Outside button</button>
          <Modal isOpen={true} onClose={onClose} title="Test">
            <input data-testid="first-input" />
            <input data-testid="second-input" />
          </Modal>
        </>
      );

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const outsideButton = screen.getByRole('button', { name: 'Outside button' });

      // Tab to first focusable element
      await user.tab();

      // Tab through elements within modal
      await user.tab();
      await user.tab();

      // Ensure we haven't focused the outside button
      expect(outsideButton).not.toHaveFocus();

      // Ensure focus is within the modal
      const dialog = screen.getByRole('dialog');
      expect(dialog.contains(document.activeElement)).toBe(true);
    });

    it('returns focus to trigger element after closing', async () => {
      const user = userEvent.setup({ delay: null });

      const TestComponent = () => {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <>
            <button
              data-testid="trigger"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Open Modal
            </button>
            <Modal
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
              title="Test"
            >
              <div>Modal content</div>
            </Modal>
          </>
        );
      };

      render(<TestComponent />);

      const trigger = screen.getByTestId('trigger');

      // Focus and click the trigger
      trigger.focus();
      expect(trigger).toHaveFocus();

      await user.click(trigger);

      // Wait for modal to open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Focus should be inside modal
      const dialog = screen.getByRole('dialog');
      await waitFor(() => {
        expect(dialog.contains(document.activeElement)).toBe(true);
      });

      // Close the modal
      await user.keyboard('{Escape}');

      // Wait for modal to close and focus to return
      await waitFor(
        () => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        },
        { timeout: 500 }
      );

      await waitFor(
        () => {
          expect(trigger).toHaveFocus();
        },
        { timeout: 500 }
      );
    });
  });
});
