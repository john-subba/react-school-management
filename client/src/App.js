import React, { useEffect } from 'react';
import HomeScreen from './components/layout/screens/HomeScreen';
import LoginScreen from './components/layout/screens/LoginScreen';
import RegisterScreen from './components/layout/screens/RegisterScreen';
import Dashboard from './components/layout/screens/Dashboard';
import AddTeachers from './components/forms/AddTeachers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FrontScreen from './components/layout/screens/FrontScreen';
import SchoolProfile from './components/layout/SchoolProfile';

// private route * Protects the route
import PrivateRoute from './components/routing/PrivateRoute';

// redux store
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import EditTeacher from './components/forms/EditTeacher';
import TeacherProfile from './components/layout/screens/TeacherProfile';

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
          <PrivateRoute exact path='/front-screen' component={FrontScreen} />
          <PrivateRoute
            exact
            path='/school-profile'
            component={SchoolProfile}
          />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
            exact
            path='/add-teacher-details'
            component={AddTeachers}
          />
          <PrivateRoute
            exact
            path='/edit-teacher-details'
            component={EditTeacher}
          />
          <PrivateRoute
            exact
            path='/teacher-profile'
            component={TeacherProfile}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
