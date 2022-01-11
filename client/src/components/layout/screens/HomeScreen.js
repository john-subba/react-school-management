import React from 'react';
import Header from '../Header';
import HomeBody from '../HomeBody';
import Footer from '../Footer';
import { Redirect } from 'react-router-dom';

//redux part
import { connect } from 'react-redux';

const HomeScreen = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div>
      <Header />
      <HomeBody />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(HomeScreen);
