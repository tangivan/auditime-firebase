import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Analytics from './components/Analytics';
import TimerList from './components/TimerList';
import Layout from './components/Layout';
import SignUp from './components/Signup';
import Login from './components/Login';
import AuthProvider from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/">
              <Layout />
              <TimerList />
            </PrivateRoute>
            <PrivateRoute exact path="/analytics">
              <Layout />
              <Analytics />
            </PrivateRoute>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;


/*
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Analytics from './components/Analytics';
import TimerDashboard from './components/TimerDashboard';
import Layout from './components/Layout';
import TimerContextProvider from './contexts/TimerContext';

function App() {
  return (
    <TimerContextProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <TimerDashboard />
            </Route>
            <Route path="/analytics">
              <Analytics />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </TimerContextProvider>
  );
}

export default App;
*/
