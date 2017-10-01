import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import FlashMessageList from './FlashMessageList';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.childeren}
        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}

App.PropTypes = {
  childeren: PropTypes.object.isRequired,
};
export default App;
