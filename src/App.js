import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Analytics from './components/Analytics';
import TimerList from './components/TimerList';
import Navbar from './components/Navbar';
import SignUp from './components/Signup';
import Login from './components/Login';
import AuthProvider from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import LinkAccount from './components/LinkAccount';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/">
              <Navbar />
              <TimerList />
            </PrivateRoute>
            <PrivateRoute path="/analytics">
              <Navbar />
              <Analytics />
            </PrivateRoute>
            <PrivateRoute path="/update-profile">
              <UpdateProfile />
            </PrivateRoute>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/link-account" component={LinkAccount} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;