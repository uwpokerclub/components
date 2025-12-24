/**
 * Singleton portal root manager for Toast components
 *
 * Creates and manages a shared portal container for all toasts,
 * preventing DOM pollution from multiple portal instances.
 *
 * @returns The toast portal root element
 */
let portalRoot: HTMLElement | null = null;

export const getToastPortal = (): HTMLElement => {
  if (!portalRoot) {
    portalRoot = document.getElementById('toast-root');
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.id = 'toast-root';
      portalRoot.style.position = 'fixed';
      portalRoot.style.inset = '0';
      portalRoot.style.zIndex = 'var(--z-index-toast)';
      portalRoot.style.pointerEvents = 'none'; // Allow clicks through empty space
      document.body.appendChild(portalRoot);
    }
  }
  return portalRoot;
};
