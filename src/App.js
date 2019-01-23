import React from 'react';
import {
  Switch
  // Route,
} from 'react-router-dom';
// import Loadable from 'react-loadable';
import Helmet from 'react-helmet';

import * as metadata from './metadata';

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
