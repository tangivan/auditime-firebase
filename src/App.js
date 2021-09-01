import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Analytics from './components/Analytics/Analytics';
import TimerList from './components/Timer/TimerList';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/Auth/Signup';
import Login from './components/Auth/Login';
import AuthProvider from './contexts/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import ForgotPassword from './components/Auth/ForgotPassword';
import UpdateProfile from './components/Auth/UpdateProfile';
import LinkAccount from './components/Auth/LinkAccount';

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
            <PrivateRoute path={`${process.env.PUBLIC_URL}/analytics`}>
              <Navbar />
              <Analytics />
            </PrivateRoute>
            <PrivateRoute path={`${process.env.PUBLIC_URL}/update-profile`}>
              <UpdateProfile />
            </PrivateRoute>
            <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignUp} />
            <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
            <Route path={`${process.env.PUBLIC_URL}/forgot-password`} component={ForgotPassword} />
            <Route path={`${process.env.PUBLIC_URL}/link-account`} component={LinkAccount} />
            <Redirect to='/' />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;