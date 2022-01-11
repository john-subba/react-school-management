import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import logo from '../../assets/logo.jpg';
import { Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';

const Header = ({ auth: { isAuthenticated, isLoading }, logoutUser }) => {
  const authLinks = (
    <Nav
      style={{
        fontSize: '1rem',
        color: '#000',
        fontFamily: 'Raleway',
        textTransform: 'capitalize',
        letterSpacing: '0.74px',
        fontWeight: '500',
      }}
    >
      <Link to='/dashboard' className='router-link nav-link'>
        <i className='far fa-user'></i> Dashboard
      </Link>
      <Link to='/login'>
        <Button
          className='btn-gradient-bg login-btn'
          style={{
            borderRadius: '25px',
            letterSpacing: '3px',
            fontSize: '0.9rem',
            color: '#fff',
          }}
          onClick={logoutUser}
        >
          Logout
        </Button>
      </Link>
    </Nav>
  );

  const guestLinks = (
    <Nav
      style={{
        fontSize: '1rem',
        color: '#000',
        fontFamily: 'Raleway',
        textTransform: 'capitalize',
        letterSpacing: '0.74px',
        fontWeight: '500',
      }}
    >
      <Link to='/' className='router-link nav-link'>
        Home
      </Link>
      <Link to='/about' className='router-link nav-link'>
        About
      </Link>
      <Link to='/contact' className='router-link nav-link'>
        Contact
      </Link>
      <Link to='/login'>
        <Button
          className='btn-gradient-bg login-btn'
          style={{
            borderRadius: '25px',
            letterSpacing: '3px',
            fontSize: '0.9rem',
            color: '#fff',
          }}
        >
          Login
        </Button>
      </Link>
    </Nav>
  );

  return (
    <Navbar
      bg='light'
      expand='lg'
      className='pt-1 pb-1'
      style={{
        borderLeft: 'none',
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      <Container>
        <Navbar.Brand
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <img
            src={logo}
            alt=''
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
            }}
          />
          <div>
            <h4
              style={{
                color: '#992b3e',
                letterSpacing: '1px',
                fontFamily: 'Zen Maru Gothic',
              }}
              className='mb-0 pt-2'
            >
              Digital
            </h4>
            <h5
              style={{
                color: '#13578b',
                letterSpacing: '1px',
                fontFamily: 'Zen Maru Gothic',
              }}
            >
              Education
            </h5>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          style={{ flexDirection: 'row-reverse' }}
        >
          {!isLoading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
