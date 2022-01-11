import React from 'react';
import HomeScreen from './components/layout/screens/HomeScreen';
import LoginScreen from './components/layout/screens/LoginScreen';
import RegisterScreen from './components/layout/screens/RegisterScreen';
import Dashboard from './components/layout/screens/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// private route * Protects the route
import PrivateRoute from './components/routing/PrivateRoute';

// redux store
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { useEffect } from 'react';

// adding x-auth-token header to token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={HomeScreen} />
        <Switch>
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
