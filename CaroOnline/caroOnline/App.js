/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import Game from "./components/Game";

const App: () => Node = () => {
  return (
    <>
      <StatusBar barStyle='dark-content'/>
      <Game />
    </>
  );
};

export default App;
