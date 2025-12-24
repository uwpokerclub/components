import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    showCloseButton: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    closeOnClickOutside: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
const ModalTrigger = ({
  size = 'md',
  title = 'Modal Title',
  showCloseButton = true,
  closeOnEscape = true,
  closeOnClickOutside = true,
  children,
  footer,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        size={size}
        showCloseButton={showCloseButton}
        closeOnEscape={closeOnEscape}
        closeOnClickOutside={closeOnClickOutside}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalTrigger>
      <p>This is the default modal with title, close button, and basic content.</p>
      <p>Click the X button, press Escape, or click outside to close.</p>
    </ModalTrigger>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <ModalTrigger size="sm" title="Small Modal">
      <p>This modal has a maximum width of 384px (24rem).</p>
    </ModalTrigger>
  ),
};

export const MediumSize: Story = {
  render: () => (
    <ModalTrigger size="md" title="Medium Modal">
      <p>This modal has a maximum width of 512px (32rem).</p>
      <p>This is the default size.</p>
    </ModalTrigger>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <ModalTrigger size="lg" title="Large Modal">
      <p>This modal has a maximum width of 768px (48rem).</p>
      <p>Great for content-heavy dialogs.</p>
    </ModalTrigger>
  ),
};

export const ExtraLargeSize: Story = {
  render: () => (
    <ModalTrigger size="xl" title="Extra Large Modal">
      <p>This modal has a maximum width of 1024px (64rem).</p>
      <p>Perfect for wide layouts and complex interfaces.</p>
    </ModalTrigger>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalTrigger
      title="Confirm Action"
      footer={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </>
      }
    >
      <p>This modal includes a footer with action buttons.</p>
      <p>The footer is automatically right-aligned and properly spaced.</p>
    </ModalTrigger>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <ModalTrigger showCloseButton={false} footer={<Button>Close</Button>}>
      <p>This modal does not have a close button in the header.</p>
      <p>Users must use the footer button to close it.</p>
    </ModalTrigger>
  ),
};

export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="modal-content-title"
        >
          <h2 id="modal-content-title" style={{ marginTop: 0 }}>
            Custom Title in Content
          </h2>
          <p>This modal has no default title prop.</p>
          <p>The title is part of the content instead.</p>
          <p>Note the use of aria-labelledby for accessibility.</p>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => (
    <ModalTrigger size="lg" title="Terms and Conditions">
      <div>
        <h3>1. Introduction</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <h3>2. User Responsibilities</h3>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>

        <h3>3. Privacy Policy</h3>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo.
        </p>

        <h3>4. Data Collection</h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>

        <h3>5. Cookies</h3>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
          velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
          quaerat voluptatem.
        </p>

        <h3>6. Third-Party Services</h3>
        <p>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
          nisi ut aliquid ex ea commodi consequatur.
        </p>

        <h3>7. Termination</h3>
        <p>
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
          consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
        </p>
      </div>
    </ModalTrigger>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Interactive Modal"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p>This is a fully interactive modal with controlled state.</p>
          <p>Try the following:</p>
          <ul>
            <li>Click the X button to close</li>
            <li>Press Escape to close</li>
            <li>Click outside the modal to close</li>
            <li>Click Cancel or Confirm buttons</li>
          </ul>
        </Modal>
      </>
    );
  },
};

export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
      alert('Item deleted!');
      setIsOpen(false);
    };

    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Deletion"
          size="sm"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </>
          }
        >
          <p>Are you sure you want to delete this item?</p>
          <p style={{ color: 'var(--color-danger)', fontWeight: 500 }}>
            This action cannot be undone.
          </p>
        </Modal>
      </>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted: ${name}, ${email}`);
      setIsOpen(false);
      setName('');
      setEmail('');
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Add User</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Add New User"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" form="user-form">
                Save
              </Button>
            </>
          }
        >
          <form id="user-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

export const DisabledEscape: Story = {
  render: () => (
    <ModalTrigger closeOnEscape={false} footer={<Button>Close</Button>}>
      <p>This modal cannot be closed with the Escape key.</p>
      <p>Press Escape - nothing will happen.</p>
      <p>Use the close button or footer button instead.</p>
    </ModalTrigger>
  ),
};

export const DisabledBackdropClick: Story = {
  render: () => (
    <ModalTrigger closeOnClickOutside={false} footer={<Button>Close</Button>}>
      <p>This modal cannot be closed by clicking the backdrop.</p>
      <p>Click outside - nothing will happen.</p>
      <p>Use the close button or footer button instead.</p>
    </ModalTrigger>
  ),
};

export const NestedInteractive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Form with Interactive Elements"
          size="md"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Submit</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Username
              </label>
              <Input id="username" placeholder="Enter username" />
            </div>

            <div>
              <label htmlFor="option" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Choose an option
              </label>
              <select
                id="option"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: 'var(--border-radius-sm)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <option value="">Select...</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" />I agree to the terms and conditions
              </label>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};
