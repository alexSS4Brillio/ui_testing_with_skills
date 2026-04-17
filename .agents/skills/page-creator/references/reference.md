# User Page Linking Reference

This reference explains how `src/pages/UserPage.js` and `src/pages/UserDetailPage.js` were built, and how they are linked together through React Router.

## UserPage.js

### Purpose

`UserPage.js` is a list page that fetches a user collection from `https://jsonplaceholder.typicode.com/users` and renders it in an AG Grid table.

### Key parts

- `useState` for `rowData`, `loading`, and `error`
- `useEffect` to fetch user list once on mount
- `fetch()` to call the API and update state
- `colDefs` for AG Grid columns, including nested fields:
  - `address.city` via `valueGetter`
  - `company.name` via `valueGetter`
- `AgGridReact` props:
  - `rowData` for data
  - `columnDefs` for table columns
  - `pagination` and `paginationPageSize`
  - `defaultColDef` for sorting, filtering, and resizing

### Navigation linking

The important linking behavior is in the row click handler:

```js
onRowClicked={(event) => navigate(`/user/${event.data.id}`)}
```

This uses `useNavigate()` from `react-router-dom` to send the browser to the user detail route when a row is clicked.

## UserDetailPage.js

### Purpose

`UserDetailPage.js` is a detail page that shows a single user's profile based on the `id` URL parameter.

### Key parts

- `useParams()` to extract `id` from the route
- `useState` for `user`, `loading`, and `error`
- `useEffect` to fetch `https://jsonplaceholder.typicode.com/users/${id}` when `id` changes
- Conditional rendering:
  - show a loading indicator while fetching
  - show an error message if the fetch fails
  - show "User not found" if the response is empty
- Display of user data grouped into:
  - Basic information
  - Address information
  - Company information
- A back link to `/` using `Link`

## Routing setup

The pages are connected through routing in `src/App.js`:

```js
<Route
  path='/'
  element={<Layout />}
>
  <Route
    index
    element={<UserPage />}
  />
  <Route
    path='user/:id'
    element={<UserDetailPage />}
  />
  <Route
    path='posts'
    element={<PostsPage />}
  />
</Route>
```

This creates:

- `/` for the user list
- `/user/:id` for the user detail page
- `/posts` for the posts page

## Linking behavior summary

1. `UserPage.js` renders the user list.
2. When a row is clicked, it navigates to `/user/{id}`.
3. `UserDetailPage.js` reads the `id` from the URL using `useParams()`.
4. It fetches only that user and renders their details.
5. The layout provides a consistent header and navigation links.

## Best practices

- Use URL patterns like `/resource/:id` for detail pages.
- Keep list pages and detail pages separate.
- Use `useNavigate()` for programmatic navigation and `Link` for anchor-style links.
- Keep data fetching inside `useEffect()` and always handle loading/error states.
- Use reusable routing conventions so new pages can be added easily.
