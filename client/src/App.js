import React, { useEffect } from 'react';
import HomeScreen from './components/layout/screens/HomeScreen';
import LoginScreen from './components/layout/screens/LoginScreen';
import RegisterScreen from './components/layout/screens/RegisterScreen';
import Dashboard from './components/layout/screens/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FrontScreen from './components/layout/screens/FrontScreen';
import SchoolProfile from './components/layout/SchoolProfile';
import Subjects from './components/layout/classes/Subjects';
import Class from './components/layout/classes/Class';

// private route * Protects the route
import PrivateRoute from './components/routing/PrivateRoute';

// redux store
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { loadCurrentExams } from './actions/exams';

// adding x-auth-token header to token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadCurrentExams());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={HomeScreen} />
        <Switch>
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <PrivateRoute exact path='/front-screen' component={FrontScreen} />
          <PrivateRoute
            exact
            path='/school-profile'
            component={SchoolProfile}
          />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/subjects' component={Subjects} />
          <PrivateRoute exact path='/classes' component={Class} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
