import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Lib
import Loadable from 'react-loadable';
import Helmet from 'react-helmet';

// router
import { withRouter } from 'react-router-dom';

import * as metadata from '../metadata';

// redux
import { connect } from 'react-redux';
import {
  dxAlert as dxAlertAction,
  dxKeycloakRoute as dxKeycloakRouteAction,
  dxKeycloakAdminLogin as dxKeycloakAdminLoginAction,
  dxKeycloakLogin as dxKeycloakLoginAction
} from '../actions';

// components
import AlertBar from '../components/alertBar/AlertBar';
import Loading from '../components/loading/Loading';

// const LoadableHome = Loadable({
//   loader: () => import(/* webpackChunkName: 'home' */ './components/Home'),
//   loading() {
//     return <div>Loading...</div>;
//   }
// });

// const LoadableAbout = Loadable({
//   loader: () =>
//     import(/* webpackChunkName: 'about' */ './components/about/About'),
//   loading() {
//     return <div>Loading...</div>;
//   }
// });

const App = () => (
  <div className="app">
    <Helmet
      title={metadata.title}
      meta={metadata.meta}
      link={metadata.link}
      script={metadata.script}
      noscript={metadata.noscript}
    />
    <div className="main">
      <Switch>
        {/* <Route exact path="/" component={LoadableHome} />
        <Route path="/about" component={LoadableAbout} /> */}
      </Switch>
    </div>
  </div>
);

export default App;
