import React from 'react';
import {
  Container,
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
  Carousel,
} from 'react-bootstrap';
import Sync from '../../../assets/login/Sync.svg';
import Management from '../../../assets/login/Management.svg';

const LoginScreen = () => {
  return (
    <div className='login-screen-container'>
      <Container
        fluid
        style={{
          width: '100%',
          height: '100%',
          padding: '8.78rem 16rem',
        }}
      >
        <Row
          style={{
            textAlign: 'center',
            backgroundColor: '#fff',
            margin: '0 4rem',
            borderRadius: '20px',
          }}
        >
          <Col
            style={{
              padding: '3rem',
            }}
          >
            <h4
              style={{
                textAlign: 'left',
                color: '#0022ff',
                letterSpacing: '1px',
                fontFamily: 'Raleway',
              }}
              className='mb-3'
            >
              Login
            </h4>
            <>
              <>
                <FloatingLabel
                  controlId='floatingInput'
                  label='Username'
                  className='mb-4 email-label'
                  style={{
                    paddingLeft: '0',
                  }}
                >
                  <Form.Control
                    type='email'
                    placeholder='name@example.com'
                    style={{
                      background: 'transparent',
                      borderBottom: '1px solid #D8D7D7',
                      outline: 'none',
                      boxShadow: 'none',
                      paddingLeft: '0',
                    }}
                  />
                  <i className='fas fa-user-shield login-icon'></i>
                </FloatingLabel>
                <FloatingLabel
                  controlId='floatingPassword'
                  label='Password'
                  className='mb-4 password-label'
                >
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    style={{
                      background: 'transparent',
                      borderBottom: '1px solid #D8D7D7',
                      outline: 'none',
                      boxShadow: 'none',
                      width: '100%',
                      paddingLeft: '0',
                    }}
                  />
                  <i
                    className='fas fa-lock login-icon'
                    style={{ paddingRight: '0.35rem' }}
                  ></i>
                </FloatingLabel>
              </>
            </>
            <Button className='btn-login mb-3'>Log in</Button>
            <p
              className='mb-0'
              style={{
                fontSize: '0.9rem',
              }}
            >
              New to our system? Click Here!
            </p>
          </Col>
          <Col className='gradient-carousel-bg'>
            <Carousel
              variant='light'
              style={{ height: '100%', width: '100%' }}
              className='carousel'
            >
              <Carousel.Item
                style={{
                  paddingRight: '4rem',
                  height: '356px',
                  width: '264px',
                }}
              >
                <Carousel.Caption
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '6rem',
                    height: '100%',
                  }}
                >
                  <h4 style={{ color: '#fff' }}>Digital</h4>
                  <h5 style={{ color: '#fff' }} className='mb-3'>
                    Education
                  </h5>
                  <p style={{ color: '#fff' }}>
                    We focus on digitalizing your education ecosystem.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item style={{ paddingRight: '4rem' }}>
                <Carousel.Caption
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '2rem',
                  }}
                >
                  <img
                    src={Sync}
                    alt=''
                    style={{
                      width: '200px',
                      height: '200px',
                    }}
                    className='mb-3'
                  />
                  <p>Easy Access, Fully Digital, Secure & Flexible</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item style={{ paddingRight: '4rem' }}>
                <Carousel.Caption
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '2rem',
                  }}
                >
                  <img
                    src={Management}
                    alt=''
                    className='mb-3'
                    style={{
                      width: '200px',
                      height: '200px',
                    }}
                  />
                  <p>
                    We manage every school activities digitally at one place
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginScreen;
