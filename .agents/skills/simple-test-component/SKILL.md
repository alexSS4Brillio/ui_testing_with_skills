---
name: simple-test-component
title: Simple Test Component Skill
version: 1.0.0
description: Generates a comprehensive React component test suite for data-driven list pages using the UserPage test pattern as a reference.
author: GitHub Copilot
keywords:
  - react
  - testing
  - jest
  - component test
  - fetch
  - ag-grid
inputs:
  - target component
  - component path
  - required page behaviors
outputs:
  - test file
  - test strategy
  - verification command
---

# Simple Test Component Skill

## Overview

This skill helps generate a reusable, component-focused test suite for React pages that render fetch-driven lists or tables. It uses the existing `UserPage` test case as the reference pattern and adapts to the selected target component.

## Way of Working

1. Use an orchestrator sub-agent to coordinate the workflow.
2. Use sub-agents for research and codebase reading.
3. Use `vscode_askQuestions` to confirm the target component name.
4. Only one sub-agent should perform file creation or edits.
5. From context, self-review, reorganize, and explore before writing the skill.
6. Build a visual plan with numbered tasks, display it, then execute it.

## Workflow

### 1. Confirm the target component

- Ask the user which React component should be tested.
- Save that answer as `[TestComponent]`.

### 2. Inspect existing patterns

- Read `src/pages/[TestComponent].js`.
- Read the reference test `src/tests/UserPage.test.js`.
- Review the component's fetch, render, and navigation behavior.

### 3. Generate the test suite

- Create `src/tests/[TestComponent].test.js`.
- Import from `@testing-library/react`.
- Mock `react-router-dom`.
- Mock `fetch` using `global.fetch`.
- Render the component and assert the behavior.

### 4. Add required tests

- Mock fetch and verify fetched content appears on screen.
- Verify the list header or equivalent field labels exist.
- Verify title and subtitle are present.
- Verify sorting behavior for the ID field, or adapt to the component's UI if it does not use a traditional table.
- Add best-practice tests for loading and error handling when applicable.

### 5. Run and verify

- Execute `npm test -- --runInBand --watchAll=false src/tests/[TestComponent].test.js`.
- Confirm all tests pass.

## Quality Criteria

- The test file is named `/src/tests/[TestComponent].test.js`.
- The test imports the target component from `../pages/[TestComponent]`.
- The suite mocks `fetch` and `react-router-dom`.
- The suite includes at least these cases:
  - successful fetch and rendered content
  - header/label assertions
  - title/subtitle presence
  - ID sorting behavior or equivalent interactions
- Tests are run and pass.

## References

- Reference test case: `.agents/skills/simple-test-component/references/UserPage.test.reference.md`
