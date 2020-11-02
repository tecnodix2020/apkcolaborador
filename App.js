/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';

import Navigator from './routes/homeStack';

class App extends Component {
    render() {
      return (
          <Navigator />
      );
    }
};

export default App;
