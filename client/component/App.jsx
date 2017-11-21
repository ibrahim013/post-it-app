import React from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-default.css';
import Header from '../component/Header';

/**
 *
 * @description entry componnet
 * @export
 * @class App
 * @extends {Component}
 */
const App = () => (
  <div>
    <Header/>
    <Alert stack={{ limit: 3 }} />
  </div>
);

export default App;
