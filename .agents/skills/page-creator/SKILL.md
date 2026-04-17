---
name: page-creator
title: Page Creator Skill
version: 1.0.0
description: Guides creation of new React pages with data fetching, routing, and layout integration.
author: GitHub Copilot
keywords:
  - react
  - routing
  - page creation
  - ui testing
  - data fetching
inputs:
  - user requirements
  - api endpoint
  - page type
outputs:
  - page component
  - dto/model
  - navigation route
  - layout update
---

# Page Creator Skill

## Overview

This skill guides the creation of new pages in a React application with routing, following a structured workflow that includes data fetching, component creation, navigation setup, and inter-page linking.

## Workflow Steps

### 1. Data Requirements Gathering

**Action**: Use `vscode_askQuestions` tool to ask the user:

- What data needs to be fetched for this page?
- What is the API endpoint URL?
- Are there any specific data transformations needed?

**Purpose**: Understand the data source and requirements before implementation.

### 2. Page Design Specification

**Action**: Use `vscode_askQuestions` tool to ask the user:

- What should the page look like? (list page, detail page, form page, etc.)
- What components should be included? (tables, cards, forms, etc.)
- Any specific styling requirements or layout preferences?

**Purpose**: Define the visual structure and user experience expectations.

### 3. Data Model Creation

**Action**:

- Fetch sample data from the specified API endpoint with retry logic (2 attempts)
- If data fetching fails after retries, redirect to an error page displaying the failure reason
- Create a DTO/model file under `/src/dto/` based on the data structure
- Export the model for use in the page component
- Create an ErrorPage component under `/src/pages/` if it doesn't exist

**Purpose**: Establish type safety and data structure consistency with robust error handling.

### 4. Inter-Page Linking Analysis

**Action**: Use `vscode_askQuestions` tool to ask the user:

- Should this page link to other existing pages?
- What fields from the data should be used for navigation? (e.g., `userId`, `postId`)
- What navigation patterns should be implemented? (clickable rows, buttons, links)

**Purpose**: Plan the navigation flow and user journey between pages.

**Reference**: See `skill/page-creator/references/reference.md` for an example of how `src/pages/UserPage.js` and `src/pages/UserDetailPage.js` are constructed and linked.

### 5. Component Implementation

**Action**:

- Create the main page component under `/src/pages/` using PascalCase naming (e.g., `ProductPage.js`)
- Create any sub-components under `/src/components/` with descriptive names
- Implement data fetching with loading and error states, including retry logic
- Add navigation functionality based on the linking requirements
- Apply appropriate styling and responsive design
- Follow React best practices: functional components, hooks, proper prop types

**Purpose**: Build the functional page with all required features following established conventions.

### 6. Navigation Integration

**Action**:

- Add the new page route to `App.js` following URL patterns:
  - List pages: `/resource-name` (e.g., `/products`, `/users`)
  - Detail pages: `/resource-name/:id` (e.g., `/products/:id`, `/users/:id`)
- Update the Layout component to include a navigation button for the new page
- Ensure proper active state handling in navigation
- Use React Router's `useParams()` for URL parameter extraction

**Purpose**: Make the page accessible through the application's navigation system with consistent URL patterns.

## Quality Checks

### Completion Criteria

- [ ] Page renders without errors
- [ ] Data fetches correctly from API with retry logic
- [ ] Error page created and accessible for failed requests
- [ ] Navigation links work as expected
- [ ] Responsive design implemented
- [ ] Loading and error states handled
- [ ] Navigation button added to header
- [ ] Build passes without compilation errors
- [ ] Follows naming conventions and best practices

### Error Handling

- API fetch failures should display user-friendly error messages
- Loading states should be shown during data fetching
- Invalid routes should be handled gracefully

## Example Usage

**Prompt**: "Create a new page for displaying products from https://api.example.com/products"

**Expected Flow**:

1. Ask about data requirements and API details
2. Ask about page design preferences
3. Create ProductDTO model
4. Ask about linking to other pages (e.g., product details, user profiles)
5. Create ProductPage component with ProductCard sub-components
6. Add "Products" button to navigation header

## Dependencies

- React Router DOM for routing
- Layout component with navigation
- Existing page structure under `/src/pages/`
- Component structure under `/src/components/`
- DTO structure under `/src/dto/`

## Related Skills

- `component-creator`: For individual component creation
- `api-integration`: For API setup and data fetching patterns
- `navigation-setup`: For routing and navigation configuration
