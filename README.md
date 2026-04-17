# UI Testing App

A React example application designed for UI testing practice and route-driven interaction. The app uses React Router for navigation, AG Grid for table rendering, and JSONPlaceholder as a sample data source. Main reason for this project is to test SKILLs feature of AIs.

## Features

- User list table with sorting, filtering, pagination, and row click navigation
- Detailed user profile page with contact, address, and company information
- Posts page with author links that connect to user profiles
- Shared layout with navigation between pages
- Data fetched from the JSONPlaceholder public API

## Technology

- React 19
- React Router DOM 7
- AG Grid React
- Create React App
- JSONPlaceholder API

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

Open http://localhost:3000 to view the app.

## Available Scripts

- `npm start` — launch the app in development mode
- `npm run build` — create a production build in `build/`
- `npm test` — start the test runner
- `npm run eject` — eject CRA configuration

## Project Structure

- `src/index.js` — application entry point
- `src/App.js` — route definitions and root app layout
- `src/layout/Layout.js` — navigation wrapper and page outlet
- `src/pages/UserPage.js` — users table with AG Grid
- `src/pages/UserDetailPage.js` — user details view
- `src/pages/PostsPage.js` — posts list with author navigation

## Data Sources

The app uses the JSONPlaceholder API:

- `https://jsonplaceholder.typicode.com/users`
- `https://jsonplaceholder.typicode.com/users/:id`
- `https://jsonplaceholder.typicode.com/posts`

## Notes

- User rows are clickable and navigate to `user/:id`.
- Posts page provides links back to the associated user details.
- CSS is organized per component alongside the relevant page or layout.
