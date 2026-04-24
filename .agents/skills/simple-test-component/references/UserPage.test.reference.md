# UserPage Test Reference

This reference file captures the key structure of the `UserPage` test suite used as the pattern for `simple-test-component`.

## Key Patterns

- `@testing-library/react` is used for rendering and DOM assertions.
- `jest.mock('react-router-dom')` is used so component routing hooks do not require a real router.
- `global.fetch` is mocked to return sample API data.
- Tests include:
  - fetching and rendering user data
  - verifying column headers
  - verifying page title and subtitle
  - verifying sorting behavior on the ID column

## Example Behavior

1. Set up `mockUsers` with sample API data.
2. Use `beforeEach()` to stub `global.fetch`.
3. Render the component and wait for expected text.
4. Validate headers and page metadata.
5. Click the sortable ID header and assert ascending/descending sort states.

## Why it is a good reference

- It demonstrates how to test data-driven pages that render a list/table.
- It shows how to mock both `fetch` and router behavior.
- It includes a mixture of content, structure, and interaction assertions.
