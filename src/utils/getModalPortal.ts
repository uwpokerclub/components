/**
 * Singleton portal root manager for Modal components
 *
 * Creates and manages a shared portal container for all modals,
 * preventing DOM pollution from multiple portal instances.
 *
 * @returns The modal portal root element
 */
let portalRoot: HTMLElement | null = null;

export const getModalPortal = (): HTMLElement => {
  if (!portalRoot) {
    portalRoot = document.getElementById('modal-root');
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.id = 'modal-root';
      document.body.appendChild(portalRoot);
    }
  }
  return portalRoot;
};
