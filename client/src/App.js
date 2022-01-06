import React from 'react';
import HomeScreen from './components/layout/screens/HomeScreen';
import LoginScreen from './components/layout/screens/LoginScreen';
import RegisterScreen from './components/layout/screens/RegisterScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux store
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={HomeScreen} />
        <Switch>
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
