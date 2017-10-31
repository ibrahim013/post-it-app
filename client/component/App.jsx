import React from 'react';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
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
class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.childeren}
        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}

App.PropTypes = {
  childeren: PropTypes.object.isRequired,
};
export default App;
