# Agents Overview

This application is structured as a small set of feature agents that coordinate UI rendering, data fetching, and navigation.

## Agents

### UserPage

- Fetches user data from JSONPlaceholder.
- Renders the data in an AG Grid table.
- Supports sorting, filtering, pagination, and row click navigation.
- Navigates to `user/:id` when a row is clicked.

### UserDetailPage

- Fetches a single user by ID from JSONPlaceholder.
- Displays contact information, address, and company details.
- Provides a back link to the user list.

### PostsPage

- Fetches post data from JSONPlaceholder.
- Renders a card-based posts grid.
- Links each post to the corresponding author page with `user/:id`.

### Layout

- Provides the shared application wrapper and navigation menu.
- Hosts page content via React Router's `Outlet`.

## Routing

- `/` — User list
- `/user/:id` — User detail view
- `/posts` — Posts listing

## Data Sources

The app depends on JSONPlaceholder endpoints:

- `https://jsonplaceholder.typicode.com/users`
- `https://jsonplaceholder.typicode.com/users/:id`
- `https://jsonplaceholder.typicode.com/posts`

## How to Extend

- Add new pages under `src/pages/`.
- Add routes in `src/App.js`.
- Add navigation links in `src/layout/Layout.js`.
- Add styles next to the component with a matching CSS file.
