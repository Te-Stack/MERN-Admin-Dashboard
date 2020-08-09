import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import UserListPage from './components/dashboard/UserListPage';
import SingleUser from './components/dashboard/SingleUser/SingleUser';
import LoginForm from './components/auth/Login';
import checkAdminAuth from './helpers/AdminAuth';

export const PrivateAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAdminAuth() ? (
        <Component {...props} />
      ) : (
        // <Redirect to={{ pathname: '/login' }} />
        window.location.replace('/user/login')
      )
    }
  />
);

const BaseRoute = () => (
  <Switch>
    <PrivateAdminRoute exact path="/dashboard" component={Dashboard} />
    <PrivateAdminRoute exact path="/dashboard/users" component={UserListPage} />
    <PrivateAdminRoute
      exact
      path="/dashboard/user/:id"
      component={SingleUser}
    />
    <Route exact path="/user/login" component={LoginForm} />
  </Switch>
);

export default BaseRoute;
