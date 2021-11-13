import React, { lazy,Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from './constants/routes'
import './styles/css/loading.css'

const Login = lazy(() => import("./pages/login"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p className="loading">Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
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
