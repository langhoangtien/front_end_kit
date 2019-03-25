/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'containers/HomePage/Loadable';
// import UserPage from 'containers/UserPage';
// import Table from 'containers/Table';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ListOfDepartmentPage from '../ListOfDepartmentPage';
import PublicRoute from '../../components/PublicRoute';
import MainLayout from '../../components/MainLayout';
import GlobalStyle from '../../global-styles';
import AddUserPage from '../AddUserPage/Loadable';
import LoginPage from '../LoginPage';
import EmptyLayout from '../../components/EmptyLayout';
import UsersPage from '../UsersPage';
export default function App() {
  return (
    <div>
      <Switch>
        <PublicRoute path="/login" layout={EmptyLayout} component={LoginPage} />

        <PublicRoute path="/system/user/add" layout={MainLayout} component={AddUserPage} />
        <PublicRoute exact path="/system/user" layout={MainLayout} component={UsersPage} />
        <PublicRoute path="/system/department" layout={MainLayout} component={ListOfDepartmentPage} />

        <PublicRoute path="/" layout={MainLayout} component={UsersPage} />
        {/* <Route path="/" component={HomePage} /> */}

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
