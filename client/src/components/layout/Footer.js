import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlueBgLoop from '../../assets/video/blue-bg-loop.mp4';

const Footer = () => {
  return (
    <>
      <div className='body-fifth-part'>
        <video autoPlay loop muted className='body-fifth-video'>
          <source src={BlueBgLoop} type='video/mp4' />
        </video>
        <Container>
          <Row
            style={{
              padding: '4rem 2rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Col>
              <h2 className='body-fifth-header'>
                Initiate Your School's Digitization
              </h2>
            </Col>
            <Col
              style={{ display: 'flex', justifyContent: 'right', gap: '1rem' }}
            >
              <Link to='/register'>
                <Button className='btn-body-fifth_1st'>Request a demo</Button>{' '}
              </Link>
              <Link to='/login'>
                <Button className='btn-body-fifth_2nd'>Login now</Button>
              </Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row style={{ color: '#fff' }}>
            <Col
              style={{
                paddingTop: '2rem',
              }}
            >
              <h4 style={{ color: '#fff' }}>Digital</h4>
              <h5 style={{ color: '#fff' }} className='mb-3'>
                Education
              </h5>
              <p style={{ color: '#fff', fontWeight: 'bold' }}>
                Digitalize | Systemize | Synchronize
              </p>
            </Col>
            <Col
              style={{
                paddingLeft: '6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h6
                style={{
                  color: '#fff',
                  fontSize: '1.15rem',
                  textTransform: 'capitalize',
                  letterSpacing: '1px',
                }}
              >
                Links
              </h6>
              <Link
                to='/'
                className='router-link'
                style={{
                  paddingLeft: '0',
                  color: '#fff',
                }}
              >
                Home
              </Link>
              <Link
                to='/about'
                className='router-link'
                style={{
                  paddingLeft: '0',
                  color: '#fff',
                }}
              >
                About
              </Link>
              <Link
                to='/contact'
                className='router-link'
                style={{
                  paddingLeft: '0',
                  color: '#fff',
                }}
              >
                Contact
              </Link>
            </Col>
            <Col>
              <h6
                style={{
                  color: '#fff',
                  fontSize: '1.15rem',
                  textTransform: 'capitalize',
                  letterSpacing: '1px',
                }}
              >
                Get in touch
              </h6>
              <p
                style={{
                  paddingTop: '1rem',
                }}
              >
                <i className='fas fa-map-marker-alt'> </i> Bhaisepati, Lalitpur,
                Nepal
              </p>
              <p>
                <i className='fas fa-phone-alt'> </i> 977-12345678, 01-12345
              </p>
              <p>
                <i className='fas fa-at'></i> info@example.com.np
              </p>
              <p>
                <i className='far fa-map'></i> Find us on Google map
              </p>
              <p>Connect with us</p>
              <p
                style={{ display: 'flex', gap: '0.5rem', fontSize: '1.25rem' }}
              >
                <i className='fab fa-facebook'></i>
                <i className='fab fa-twitter'></i>
                <i className='fab fa-instagram'></i>
              </p>
            </Col>
          </Row>
        </Container>
        <Container
          style={{
            marginTop: '2rem',
            margin: '0',
            maxWidth: '1800px',
            width: '100%',
            padding: '0',
          }}
        >
          <Row style={{ width: '100%', margin: '0' }}>
            <Col
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#fff',
                width: '100%',
              }}
            >
              &copy; Highly Inspired By edigitalnepal.com. All right reserved to
              them.
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
