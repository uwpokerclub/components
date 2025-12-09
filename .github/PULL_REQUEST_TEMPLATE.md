# Description

<!-- Provide a brief description of the changes in this PR -->

## Type of Change

<!-- Check the type that applies to this PR -->

- [ ] `feat:` New feature (adds functionality)
- [ ] `fix:` Bug fix (fixes an issue)
- [ ] `docs:` Documentation changes
- [ ] `style:` Code style changes (formatting, etc.)
- [ ] `refactor:` Code refactoring (no functional changes)
- [ ] `test:` Adding or updating tests
- [ ] `chore:` Maintenance tasks (dependencies, config, etc.)
- [ ] `perf:` Performance improvements
- [ ] `ci:` CI/CD changes
- [ ] `build:` Build system changes

# Testing

<!-- Describe how you tested these changes -->

- [ ] Tested locally in Storybook
- [ ] Unit tests added/updated and passing
- [ ] Manual testing performed
- [ ] Tested in consuming application (if applicable)

**Test details:**

<!-- Provide specific details about your testing approach -->

# Checklist

## Code Quality

- [ ] Code follows the project's style guidelines
- [ ] Ran `npm run lint` with no errors
- [ ] Ran `npm run format` to format code
- [ ] Ran `npm run build` successfully
- [ ] All tests pass (`npm test`)
- [ ] Test coverage meets the 80% threshold

## Component Requirements (if applicable)

- [ ] Component placed in correct Atomic Design category (atoms/molecules/organisms/templates)
- [ ] Component follows the standard file structure (`.tsx`, `.test.tsx`, `.stories.tsx`, `.module.css`, `index.ts`)
- [ ] Unit tests cover rendering, interactions, props, and accessibility
- [ ] Storybook stories created with `tags: ['autodocs']`
- [ ] Accessibility requirements met (WCAG 2.1 Level AA)
- [ ] Component uses CSS variables from `src/styles/tokens.css` (no hardcoded values)
- [ ] Component exported from component `index.ts` and main `src/index.ts`
- [ ] TypeScript types properly defined and exported

## Documentation

- [ ] Code is self-documenting with clear variable/function names
- [ ] Complex logic includes comments explaining the "why"
- [ ] JSDoc comments added for public APIs
- [ ] README.md updated (if needed)
- [ ] CONTRIBUTING.md updated (if needed)
- [ ] Storybook documentation is clear and comprehensive

## Commits

- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) format
- [ ] PR title follows Conventional Commits format (e.g., `feat: Add new Button variant`)

# Additional Notes

<!-- Any additional information that reviewers should know -->
