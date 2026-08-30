# Auth0 React Authentication Demo

A learning project demonstrating how to integrate **Auth0** authentication into a **React** application, styled with **React-Bootstrap** and **Bootstrap Icons**. This project is intended as an educational example covering login flows, protected API calls, and component-based architecture in React.


## Overview

This project demonstrates the two main login strategies offered by Auth0 (popup and redirect), how to fetch an access token and call a protected API endpoint, and how to structure a small React application into clean, reusable, presentational components using React-Bootstrap.

It is not intended for production use — it is a teaching sandbox for exploring the `@auth0/auth0-react` SDK.

## Features

- 🔐 Login via popup window (`loginWithPopup`)
- 🔐 Login via full-page redirect (`loginWithRedirect`)
- 🚪 Logout functionality
- 🌐 Call a public (unauthenticated) API route
- 🔒 Call a protected API route using a Bearer access token
- 👤 Display authenticated user profile information (name, email, avatar)
- 🎨 UI built entirely with React-Bootstrap components
- 🧩 Icons from `react-bootstrap-icons`
- 🧱 Clean separation of concerns via small, focused components

## Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI library |
| [@auth0/auth0-react](https://github.com/auth0/auth0-react) | Auth0 SDK for React |
| [Axios](https://axios-http.com/) | HTTP client for API requests |
| [React-Bootstrap](https://react-bootstrap.github.io/) | UI component library |
| [Bootstrap](https://getbootstrap.com/) | CSS framework |
| [react-bootstrap-icons](https://www.npmjs.com/package/react-bootstrap-icons) | Icon set |


## Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn
- A free [Auth0](https://auth0.com/) account
- A registered Auth0 **Single Page Application**

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install the required packages if not already listed in `package.json`:

   ```bash
   npm install @auth0/auth0-react axios react-bootstrap bootstrap react-bootstrap-icons
   ```

4. Import Bootstrap's CSS once, in your entry file (`src/index.js`):

   ```js
   import 'bootstrap/dist/css/bootstrap.min.css';
   ```

## Auth0 Configuration

1. Log in to the [Auth0 Dashboard](https://manage.auth0.com/).
2. Create a new **Application** of type **Single Page Application**.
3. In the application settings, configure:
   - **Allowed Callback URLs**: `http://localhost:3000`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`
4. (Optional, for the protected API route) Create an **API** in Auth0 to define an **audience** identifier, and grant your application permission to request tokens for it.

## Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=your-api-audience   # required only for the protected route
REACT_APP_BASE_URL_API=https://your-api.example.com/public
REACT_APP_PROTECTED_API_URL=https://your-api.example.com/protected
```

Then wrap your application with `Auth0Provider` in `src/index.js`:

```jsx
import { Auth0Provider } from '@auth0/auth0-react';

<Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    }}
>
    <App />
</Auth0Provider>
```

> **Note:** `BASE_URL_API` and `PROTECTED_API_URL` referenced inside `App.jsx` should be defined as constants (e.g. imported from a `config.js` file or read from `process.env`) rather than left as free-floating globals.

## Running the Project

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Component Documentation

### `App.jsx`
The root component. Holds all application state (`apiResult`, `apiError`, `loadingApi`) and defines the two API-calling functions (`getTestAPI`, `getUserInfo`). Delegates rendering to the components below.

### `AuthButtons`
Renders three buttons: login with popup, login with redirect, and logout. Buttons are automatically disabled based on the current `isAuthenticated` state to prevent invalid actions.

| Prop | Type | Description |
|---|---|---|
| `isAuthenticated` | `boolean` | Current auth status |
| `onLoginPopup` | `function` | Triggers `loginWithPopup()` |
| `onLoginRedirect` | `function` | Triggers `loginWithRedirect()` |
| `onLogout` | `function` | Triggers `logout()` |

### `ApiButtons`
Renders buttons to call the public and protected API routes, showing a spinner while a request is in flight.

| Prop | Type | Description |
|---|---|---|
| `isAuthenticated` | `boolean` | Disables protected call when `false` |
| `loading` | `boolean` | Shows spinner and disables buttons |
| `onCallPublic` | `function` | Calls the public API |
| `onCallProtected` | `function` | Calls the protected API |

### `ApiResult`
Displays either the JSON response from the last API call or an error alert. Renders nothing if there is no result and no error.

| Prop | Type | Description |
|---|---|---|
| `result` | `object \| null` | API response data |
| `error` | `string \| null` | Error message, if any |

### `UserCard`
Displays the authenticated user's avatar, name, email, and full raw profile object. Renders nothing if `user` is not provided.

| Prop | Type | Description |
|---|---|---|
| `user` | `object \| null` | Auth0 user profile object |

### `LoadingScreen`
A full-screen centered spinner shown while the Auth0 SDK is initializing (`isLoading === true`).

## How Authentication Works

1. On first load, `useAuth0()` reports `isLoading: true` while the SDK checks for an existing session.
2. The user clicks **Login with popup** or **Login with redirect**, which opens the Auth0 Universal Login screen.
3. After successful login, Auth0 redirects back (or closes the popup) and `isAuthenticated` becomes `true`, with `user` populated.
4. To call a protected API, the app requests an access token via `getAccessTokenSilently()` and attaches it to the request as `Authorization: Bearer <token>`.
5. The receiving API is expected to validate this JWT against the Auth0 tenant before returning data.

## Learning Notes

This project is a good starting point for exploring:

- The difference between **popup** and **redirect** login flows, and when each is appropriate (e.g., popups avoid a full page reload but can be blocked by browsers; redirects are more mobile-friendly).
- How Auth0 issues and validates access tokens for calling your own backend API.
- Structuring a React app so that **state and side effects** (in `App.jsx`) are separated from **presentation** (in `components/`), which makes each piece easier to test and reason about independently.
- Using a component library (React-Bootstrap) to build a consistent UI quickly without hand-writing CSS classes.

Suggested exercises to extend this project:
- Add a custom hook (e.g. `useApiRequest`) to remove duplicated `try/catch/loading` logic between `getTestAPI` and `getUserInfo`.
- Add role-based UI elements using custom claims from the Auth0 user object.
- Add automated tests for each component using React Testing Library.

## Contacts:
- Author - [Oleh Ostapenko](https://github.com/ostapichev)
- Mail me - ytoxos@gmail.com
