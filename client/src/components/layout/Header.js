import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  // const [offset, setOffset] = useState(0);

  // useEffect(() => {
  //   window.onscroll = () => {
  //     setOffset(window.scrollY);
  //   };
  // }, []);

  return (
    <div>
      <Navbar expand='lg' className='nav-header'>
        <Container>
          <Navbar.Brand href='#home'>
            <img src={logo} alt='prime education' className='logo' />
          </Navbar.Brand>
          <div
            style={{
              display: 'flex',
              gap: '2rem',
            }}
          >
            <Navbar.Collapse
              id='basic-navbar-nav'
              style={{
                justifyContent: 'center',
                flexGrow: '0',
              }}
            >
              <Nav className='me-auto'>
                <Link to='/' className='nav-links'>
                  Home
                </Link>
                <Link to='/about' className='nav-links'>
                  About
                </Link>
                <Link to='/contact' className='nav-links'>
                  Contact Us
                </Link>
              </Nav>
            </Navbar.Collapse>
            <Link to='/login' className='router-link'>
              <Button
                className='btn-login-header'
                style={{
                  borderRadius: '25px',
                  letterSpacing: '4px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                }}
              >
                Login
              </Button>
            </Link>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
