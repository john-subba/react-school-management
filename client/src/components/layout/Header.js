import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png';

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
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#home' className='nav-links'>
                Home
              </Nav.Link>
              <Nav.Link href='#link' className='nav-links'>
                About
              </Nav.Link>
              <Nav.Link href='#link' className='nav-links'>
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button
            className='btn-login'
            style={{
              borderRadius: '25px',
              letterSpacing: '4px',
              paddingTop: '10px',
              paddingBottom: '10px',
            }}
          >
            Login
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
