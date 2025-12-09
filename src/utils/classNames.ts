/**
 * Concatenate class names, filtering out falsy values
 *
 * @param classes - Array of class names or conditional class names
 * @returns Concatenated class name string
 *
 * @example
 * cn('base', isActive && 'active', 'other') // 'base active other'
 * cn('base', false && 'hidden') // 'base'
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
