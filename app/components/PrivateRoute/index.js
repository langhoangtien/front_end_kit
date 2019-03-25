/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class PrivateRoute extends React.Component {
  render() {
    const { component: InnerComponent, layout: Layout, ...rest } = this.props;
    const { location } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (this.isLoginCompany()) {
            this.isHasRole();
            if (this.isHasRole()) {
              return (
                <Layout>
                  <InnerComponent {...props} />
                </Layout>
              );
            }
            this.props.history.goBack();
          }
          if (this.isLoginSystem()) {
            return (
              <Redirect
                to={{ pathname: '/company', state: { from: location } }}
              />
            );
          }
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        }}
      />
    );
  }

  isLoginSystem() {
    const token = localStorage.getItem('value');
    const expiresIn = localStorage.getItem('expiresIn');
    const timeNow = Date.now() / 1000;
    if (token && timeNow <= expiresIn) {
      return true;
    }

    if (token) {
      localStorage.clear();
    }

    return false;
  }

  isLoginCompany() {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const timeNow = Date.now() / 1000;
    if (jwt) {
      if (jwt.token && timeNow <= jwt.expiresIn) {
        return true;
      }
    }
    return false;
  }

  isHasRole() {
    const { roles } = this.props;
    const roleCompany = localStorage.getItem('roleCompany');
    if (!roles) return true;
    if (roleCompany) {
      for (let i = 0; i < roles.length; i += 1) {
        if (roles[i] === roleCompany) {
          return true;
        }
      }
    }
    return false;
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any,
};

export default withRouter(PrivateRoute);
