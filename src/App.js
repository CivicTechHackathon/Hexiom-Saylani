import React, { Component } from 'react';
import Routers from './Routes/Router';
import { Provider } from 'react-redux'
import store from './store'
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
