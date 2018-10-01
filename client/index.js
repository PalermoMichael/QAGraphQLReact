import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
//dependencies for storing local state
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-client-preset';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/RequireAuth';
import DeviationList from './components/DeviationList';
import DeviationCreate from './components/DeviationCreate';
import DeviationDetail from './components/DeviationDetail';
import CapaCreate from './components/CapaCreate';
import ChangeControlCreate from './components/ChangeControlCreate';
import DeviationUpdate from './components/DeviationUpdate';
import DeviationSearch from './components/DeviationSearch';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});
//set up Cache
const cache = new InMemoryCache();

//const client = new ApolloClient({});
const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  networkInterface,
  link: ApolloLink.from([]),
  cache: cache,
  credentials: 'include'
});

const Root = () => {
  return (
    <ApolloProvider client= {client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
         {/*-- <IndexRoute component={LoginForm} />--*/} 
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/dashboard" component={requireAuth(Dashboard)} />
            <Route path="/deviations" component={requireAuth(DeviationList)} />
            <Route path="/deviations/new" component={requireAuth(DeviationCreate)} />
            <Route path="/deviations/:id" component={requireAuth(DeviationDetail)} />
            <Route exact path="/deviations/:id/update" component={requireAuth(DeviationUpdate)} />
            <Route path="/capas" component={CapaCreate} />
            <Route path="/changecontrols" component={ChangeControlCreate} />
            <Route path="/searchdeviations" component={DeviationSearch} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
