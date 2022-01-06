import React from 'react';
import HomeScreen from './components/layout/screens/HomeScreen';
import LoginScreen from './components/layout/screens/LoginScreen';
import RegisterScreen from './components/layout/screens/RegisterScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route exact path='/' component={HomeScreen} />
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
    </Router>
  );
}

export default App;
