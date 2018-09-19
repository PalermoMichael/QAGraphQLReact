import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'
import fetchCurrentUserQuery from '../queries/User/fetchCurrentUser';
import { hashHistory } from 'react-router';

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate (nextProps) {
          if (!nextProps.data.loading && !nextProps.data.user) {
              hashHistory.push('/login');
          }
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(fetchCurrentUserQuery)(RequireAuth);
};

