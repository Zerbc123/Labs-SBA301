---
title: "Handling Navigation with Routes"
source_file: "Chapter 06. Handling Navigation with Routes(1).pptx"
document_type: "Instructional presentation / technical training material"
author: null
summary: >-
  Introduces routing in React applications using React Router. Covers client-side
  versus server-side routing, router components, BrowserRouter setup, route
  matching with Routes and Route, nested routes with Outlet, navigation with Link
  and NavLink, redirects with Navigate, routing hooks (useLocation, useNavigate,
  useParams, useSearchParams, useRoutes), and route parameters.
target_audience:
  - React learners
  - Frontend developers
  - Developers learning client-side routing
  - Technical trainees
  domain:
  - React
  - React Router
  - Frontend Web Development
keywords:
  - routing
  - React Router
  - BrowserRouter
  - Routes
  - Route
  - Outlet
  - Link
  - NavLink
  - Navigate
  - useLocation
  - useNavigate
  - useParams
  - useSearchParams
  - useRoutes
  - route parameters
---

# Handling Navigation with Routes

## Objectives

The document introduces the following objectives:

- Set up the router module to enable navigation among multiple component views.
- Set up the routes to enable navigation.
- Understand client-side versus server-side processing.

## React Router

React Router is presented as a collection of navigational components that:

- Enable navigation among views.
- Include router components, route-matching components, and navigation components.
- Use browser-based, bookmarkable URLs as instructions for navigating to a client-generated view in a web application.
- Can pass along optional parameters.

## Introduction of a Router

Routing is described as the process of responding to a URL based on a set of route-handler declarations. In other words, routing maps a URL to rendered content.

Key routing activities include:

- Declaring routes.
- Handling route parameters.
- Using link components.

## Client vs. Server Side

The document distinguishes between client-side and server-side processing:

- **Client side:** the browser; processing happens on the local machine.
- **Server side:** information is processed on the server and then sent through to a browser.

# Router Components

React Router router components described in the document are:

| Router component | Description |
|---|---|
| `<BrowserRouter>` | Stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack. |
| `<HashRouter>` | Intended for web browsers when the URL should not or cannot be sent to the server. It stores the current location in the hash portion of the URL, so it is not sent to the server. The document notes shared-hosting scenarios where full server control is unavailable. |
| `<MemoryRouter>` | Stores locations internally in an array. Unlike `<BrowserHistory>` and `<HashHistory>`, it is not tied to an external source such as the browser history stack. The document identifies testing as an example where complete control over the history stack is useful. |
| `<StaticRouter>` | Used to render a React Router web application in Node. The current location is provided through the `location` prop. |
| `<NativeRouter>` | Presented as the recommended interface for running React Router in a React Native application. |

# Web App Routing Using `<BrowserRouter>`

## Installation

Install the routing package with:

```bash
npm install react-router-dom
```

## Enclosing the Application

The router component is `<BrowserRouter>`. The application is enclosed within `<BrowserRouter>` and `</BrowserRouter>`.

```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
   <App />
</BrowserRouter>
```

# Route Matching

## `<Routes>` and `<Route>`

The route-matching components are `<Routes>` and `<Route>`.

The document describes the following concepts:

- The `<Route>` `path` prop specifies the current location's pathname.
- The `<Route>` `component` prop specifies the corresponding view for the location.
- Using the `exact` attribute ensures that the path must be exactly matched.
- `<Route>` enables grouping together several routes.

> **Source terminology note:** The source explicitly refers to a `component` prop and an `exact` attribute. These statements are preserved as presented in the training material rather than silently rewritten.

### `<Route>` Syntax

```jsx
<Route path='/' element={component}></Route>
```

### Route Example

```jsx
import { Routes, Route } from "react-router-dom";

<Routes>
    <Route path='/' element={<Orchids/>}></Route>
    <Route path='/detail/:id' element={<OrchidDetail/>}></Route>
</Routes>
```

# `<Routes>` Component

Rendered anywhere in the application, `<Routes>` matches a set of child routes against the current location.

Whenever the location changes, `<Routes>` looks through its child routes to find the best match and renders that branch of the UI.

`<Route>` elements may be nested to indicate nested UI, which also corresponds to nested URL paths.

## Nested Route Example

```jsx
<Routes>
  <Route path="/" element={<Dashboard />}>
    <Route
      path="messages"
      element={<DashboardMessages />}
    />
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} />
</Routes>
```

# `<Outlet>` Component

An `<Outlet>` should be used in parent route elements to render their child route elements. This allows nested UI to appear when child routes are rendered.

If the parent route matched exactly, the outlet renders a child index route or renders nothing when there is no index route.

## `<Outlet>` and Nested UI Example

```jsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* This element will render either <DashboardMessages> when the URL is "/messages",
          <DashboardTasks> at "/tasks", or null if it is "/"
      */}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route
          path="messages"
          element={<DashboardMessages />}
        />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>
    </Routes>
  );
}
```

# `<Link>` Component

A `<Link>` lets the user navigate to another page by clicking or tapping it.

In `react-router-dom`, a `<Link>` renders an accessible `<a>` element with a real `href` pointing to the resource it links to. This means actions such as right-clicking a `<Link>` behave as expected.

The document also notes that `<Link reloadDocument>` can be used to skip client-side routing and allow the browser to handle the transition normally, similar to an `<a href>`.

## `<Link>` Example

```jsx
import * as React from "react";
import { Link } from "react-router-dom";

function UsersIndexPage({ users }) {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

# `<NavLink>` Component

A `<NavLink>` is a special kind of `<Link>` that knows whether the link is:

- Active.
- Pending.
- Transitioning.

This is useful for navigation menus, breadcrumbs, and tab interfaces where the currently selected item should be indicated.

The document also states that `<NavLink>`:

- Provides useful context for assistive technology such as screen readers.
- Provides a `transitioning` value for finer-grained control over View Transitions.

## `<NavLink>` Example

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/messages"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Messages
</NavLink>;
```

# `<Navigate>` Component

A `<Navigate>` element changes the current location when it is rendered.

It is described as a component wrapper around `useNavigate` and accepts the same arguments as props.

## `<Navigate>` Example

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let user = await login(event.target);
      setUser(user);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      {error && <p>{error.message}</p>}
      {user && <Navigate to="/dashboard" replace={true} />}
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" name="username" />
        <input type="password" name="password" />
      </form>
    </div>
  );
}

export default LoginForm;
```

# React Router Hooks

The document introduces these hooks:

| Hook | Purpose described in the document |
|---|---|
| `useLocation` | Returns the current location object. |
| `useNavigate` | Returns a function that lets the application navigate programmatically. |
| `useParams` | Returns an object containing key/value pairs for dynamic parameters matched by the `<Route path>`. Child routes inherit all parameters from their parent routes. |
| `useSearchParams` | Used to read and modify the query string in the URL for the current location. |
| `useRoutes` | The functional equivalent of `<Routes>`, using JavaScript objects rather than `<Route>` elements to define routes. The objects have the same properties as normal `<Route>` elements and do not require JSX. |

# `useLocation` Demo

```jsx
import * as React from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  let location = useLocation();

  React.useEffect(() => {
    // Google Analytics
    ga('send', 'pageview');
  }, [location]);

  return (
    // ...
  );
}
```

# `useNavigate` Demo

```jsx
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```

# `useParams` Demo

```jsx
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  // ...
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
        <Route path="me" element={...} />
      </Route>
    </Routes>
  );
}
```

# `useSearchParams` Demo

```jsx
import * as React from "react";
import { useSearchParams } from "react-router-dom";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(event) {
    event.preventDefault();
    // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    let params = serializeFormQuery(event.target);
    setSearchParams(params);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>{/* ... */}</form>
    </div>
  );
}
```

# `useRoutes` Demo

```jsx
import * as React from "react";
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "messages",
          element: <DashboardMessages />,
        },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);

  return element;
}
```

# Route Parameters

Paths are specified as URLs. Paths can also carry parameter values.

### Route Parameter Example

For example:

```text
/orchids/3
```

In this example, `3` is a route parameter.

Route parameters are specified in the path definition as a token.

For example:

```text
path: 'orchid/:id'
```

Here, `id` is the token representing the route parameter.

## Passing a Route Parameter with `<Link>`

The document demonstrates passing an object's `id` into a link path:

```jsx
import { Link } from 'react-router-dom'

<Link to={`detail/${orchid.id}`}> <p><button>Detail</button></p></Link>
```

## Route Parameter Link Syntax

Route parameters can be specified using a link parameter when specifying the link.

```jsx
<Link to={`/orchid/${orchid.id}`} >
```

The `useParams` hook then returns an object of key/value pairs for the dynamic parameters from the current URL that matched the `<Route path>`.

## Reading a Route Parameter with `useParams`

```jsx
import { useParams } from 'react-router-dom'

const orchidId = useParams();
const orchid = data.find(obj => {
    return obj.id === orchidId.id;
  });
```

# Summary

The document introduces these concepts:

- Set up the router module to enable navigation among multiple component views.
- Set up the routes to enable navigation.
- Understand client-side versus server-side processing.
