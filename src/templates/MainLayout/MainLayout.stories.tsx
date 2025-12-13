import type { Meta, StoryObj } from '@storybook/react-vite';
import { MainLayout } from './MainLayout';

const meta = {
  title: 'Templates/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content for demonstrations
const SampleContent = () => (
  <div
    style={{
      padding: 'var(--spacing-lg)',
      backgroundColor: 'var(--color-background-secondary)',
      borderRadius: 'var(--border-radius-md)',
    }}
  >
    <h1 style={{ marginTop: 0 }}>Page Title</h1>
    <p style={{ color: 'var(--color-text-secondary)' }}>
      This is sample content demonstrating the MainLayout template. The layout provides responsive
      horizontal spacing that adapts to different screen sizes.
    </p>
    <p style={{ color: 'var(--color-text-secondary)' }}>
      On mobile devices, content spans the full width. On tablets and desktops, horizontal padding
      is applied for better readability.
    </p>
  </div>
);

const ArticleContent = () => (
  <article>
    <header style={{ marginBottom: 'var(--spacing-xl)' }}>
      <h1 style={{ marginTop: 0, marginBottom: 'var(--spacing-sm)' }}>
        Understanding Poker Strategy
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
        Published on January 15, 2024
      </p>
    </header>

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-lg)',
      }}
    >
      <section>
        <h2>Introduction</h2>
        <p
          style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}
        >
          Poker is a game of skill, strategy, and psychology. Understanding the fundamentals is
          crucial for improving your game and making better decisions at the table.
        </p>
      </section>

      <section>
        <h2>Position Matters</h2>
        <p
          style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}
        >
          Your position at the table significantly affects which hands you should play and how
          aggressively you should play them. Late position players have more information and can
          make more informed decisions.
        </p>
      </section>

      <section>
        <h2>Reading Opponents</h2>
        <p
          style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}
        >
          Pay attention to betting patterns, timing tells, and physical tells. These observations
          can give you valuable information about your opponents' hand strength.
        </p>
      </section>
    </div>
  </article>
);

const DashboardContent = () => (
  <div>
    <header style={{ marginBottom: 'var(--spacing-xl)' }}>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
    </header>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-xl)',
      }}
    >
      <div
        style={{
          padding: 'var(--spacing-lg)',
          backgroundColor: 'var(--color-background-secondary)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Total Games</h3>
        <p
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            margin: 0,
          }}
        >
          42
        </p>
      </div>

      <div
        style={{
          padding: 'var(--spacing-lg)',
          backgroundColor: 'var(--color-background-secondary)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Win Rate</h3>
        <p
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            margin: 0,
          }}
        >
          67%
        </p>
      </div>

      <div
        style={{
          padding: 'var(--spacing-lg)',
          backgroundColor: 'var(--color-background-secondary)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Points</h3>
        <p
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            margin: 0,
          }}
        >
          1,234
        </p>
      </div>
    </div>

    <section
      style={{
        padding: 'var(--spacing-lg)',
        backgroundColor: 'var(--color-background-secondary)',
        borderRadius: 'var(--border-radius-md)',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Recent Activity</h2>
      <ul style={{ color: 'var(--color-text-secondary)' }}>
        <li>Played in Weekly Tournament - 1st Place</li>
        <li>Joined Study Group Session</li>
        <li>Updated Profile Information</li>
      </ul>
    </section>
  </div>
);

export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const WithArticle: Story = {
  args: {
    children: <ArticleContent />,
  },
};

export const WithDashboard: Story = {
  args: {
    children: <DashboardContent />,
  },
};

export const MobileView: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const MinimalContent: Story = {
  args: {
    children: (
      <div>
        <h1 style={{ marginTop: 0 }}>Simple Page</h1>
        <p>This demonstrates the layout with minimal content.</p>
      </div>
    ),
  },
};

export const WithCustomClassName: Story = {
  args: {
    children: <SampleContent />,
    className: 'custom-page-layout',
  },
};

export const FullHeightContent: Story = {
  args: {
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            padding: 'var(--spacing-2xl)',
            backgroundColor: 'var(--color-background-secondary)',
            borderRadius: 'var(--border-radius-lg)',
            textAlign: 'center',
            maxWidth: '600px',
          }}
        >
          <h1 style={{ marginTop: 0 }}>Centered Content</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            This example shows how the layout works with vertically centered content that takes
            advantage of the full viewport height.
          </p>
        </div>
      </div>
    ),
  },
};
