import React, { lazy, Suspense } from "react";
import useAuthListener from './hooks/use-auth-listener'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from './constants/routes'
import UserContext from "./context/user";
import './styles/css/loading.css'

import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

// Auth
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
// Dashboard
const Dashboard = lazy(() => import("./pages/dashboard"));
// Profile
const Profile = lazy(() => import("./pages/profile"));
const MyAccount = lazy(() => import("./pages/my-account"));
// Memberships
const Memberships = lazy(() => import("./pages/memberships"));
// Chats
const Inbox = lazy(() => import("./pages/inbox"));
//Others
const NotFound = lazy(() => import("./pages/not-found"));
const PruebaUpload = lazy(() => import("./pages/pruebas"));


function App() {

  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<div className="loader"><span>Up</span><span>luxure</span></div>}>
          <Switch>

            {/* Auth */}
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
              <SignUp />
            </IsUserLoggedIn>

            {/* <Route path={ROUTES.PROFILE} component={Profile} /> */}
            {/* Profile */}
            <ProtectedRoute user={user} path={ROUTES.PROFILE} exact>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ROUTES.MY_ACCOUNT} exact>
              <MyAccount />
            </ProtectedRoute>

            {/* Dashboard */}
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>

            {/* Messenger */}
            <ProtectedRoute user={user} path={ROUTES.INBOX} exact>
              <Inbox />
            </ProtectedRoute>

            {/* Memberships */}
            <ProtectedRoute user={user} path={ROUTES.MEMBERSHIPS} exact>
              <Memberships />
            </ProtectedRoute>

            <Route path={ROUTES.PRUEBA} component={PruebaUpload} />
            <Route component={NotFound} />

          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// 1) Client side rendered app: react (cra)
// 2) -> database witch is Firebase
// 3) -> react-loading-skeleton
// 4) tailwind

// folder structure
// src
// -> components,
// -> constants,
// -> context,
// -> helpers,
// -> hooks,
// -> pages,
// -> lib (firebase is going to live in here),
// -> services (firebase functions in here),
// -> tailwind (tailwind's folder (app/tailwind))
