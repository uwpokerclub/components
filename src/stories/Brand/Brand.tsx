import React from 'react';
import styles from './Brand.module.css';

export interface BrandProps {
  /**
   * Theme variant to display
   */
  theme?: 'light' | 'dark';
}

export const Brand: React.FC<BrandProps> = ({ theme = 'light' }) => {
  return (
    <div className={styles.container} data-theme={theme}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Brand Colors</h2>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>Primary - UWPSC Gold</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>Primary</span>
                <code className={styles.colorVariable}>--color-primary</code>
                <span className={styles.colorValue}>#f4b80f</span>
              </div>
            </div>
            <div className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-primary-hover)' }}
              />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>Primary Hover</span>
                <code className={styles.colorVariable}>--color-primary-hover</code>
                <span className={styles.colorValue}>#d89e0c</span>
              </div>
            </div>
            <div className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-primary-active)' }}
              />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>Primary Active</span>
                <code className={styles.colorVariable}>--color-primary-active</code>
                <span className={styles.colorValue}>#ba850a</span>
              </div>
            </div>
            <div className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-primary-light)' }}
              />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>Primary Light</span>
                <code className={styles.colorVariable}>--color-primary-light</code>
                <span className={styles.colorValue}>#fef8e6</span>
              </div>
            </div>
            <div className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-primary-dark)' }}
              />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>Primary Dark</span>
                <code className={styles.colorVariable}>--color-primary-dark</code>
                <span className={styles.colorValue}>#8a6608</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>Secondary - UW Purple</h3>
          <div className={styles.colorGrid}>
            <div className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-secondary)' }}
              />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>Secondary</span>
                <code className={styles.colorVariable}>--color-secondary</code>
                <span className={styles.colorValue}>#4b2e83</span>
              </div>
            </div>
            <div className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-secondary-hover)' }}
              />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>Secondary Hover</span>
                <code className={styles.colorVariable}>--color-secondary-hover</code>
                <span className={styles.colorValue}>#3a2366</span>
              </div>
            </div>
            <div className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-secondary-light)' }}
              />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>Secondary Light</span>
                <code className={styles.colorVariable}>--color-secondary-light</code>
                <span className={styles.colorValue}>#e8e3f0</span>
              </div>
            </div>
            <div className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: 'var(--color-secondary-dark)' }}
              />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>Secondary Dark</span>
                <code className={styles.colorVariable}>--color-secondary-dark</code>
                <span className={styles.colorValue}>#2a1a4d</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography</h2>
        <div className={styles.typeGrid}>
          <div
            className={styles.typeExample}
            style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-bold)' }}
          >
            Montserrat Bold 48px
            <span className={styles.typeLabel}>--font-size-5xl + --font-weight-bold</span>
          </div>
          <div
            className={styles.typeExample}
            style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-semibold)' }}
          >
            Montserrat Semibold 36px
            <span className={styles.typeLabel}>--font-size-4xl + --font-weight-semibold</span>
          </div>
          <div
            className={styles.typeExample}
            style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-medium)' }}
          >
            Montserrat Medium 30px
            <span className={styles.typeLabel}>--font-size-3xl + --font-weight-medium</span>
          </div>
          <div
            className={styles.typeExample}
            style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-normal)' }}
          >
            Montserrat Regular 24px
            <span className={styles.typeLabel}>--font-size-2xl + --font-weight-normal</span>
          </div>
          <div
            className={styles.typeExample}
            style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-normal)' }}
          >
            Montserrat Regular 16px - Body text example. The quick brown fox jumps over the lazy
            dog.
            <span className={styles.typeLabel}>--font-size-md + --font-weight-normal</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>UI Examples</h2>
        <div className={styles.uiExamples}>
          <button className={styles.primaryButton}>Primary Button</button>
          <button className={styles.secondaryButton}>Secondary Button</button>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Card Component</h3>
            <p className={styles.cardText}>
              This card showcases the UWPSC brand colors and typography in action.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Spacing Scale</h2>
        <div className={styles.spacingGrid}>
          {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].map((size) => (
            <div key={size} className={styles.spacingExample}>
              <div className={styles.spacingBar} style={{ width: `var(--spacing-${size})` }} />
              <div className={styles.spacingInfo}>
                <code className={styles.spacingVariable}>--spacing-{size}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
