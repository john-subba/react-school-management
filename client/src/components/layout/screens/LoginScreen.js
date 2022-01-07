import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import Blob from '../../../assets/login/blob.png';
import Logo from '../../../assets/logo.jpg';

const LoginScreen = () => {
  return (
    <Container className='login-screen-container' fluid>
      <h1 className='login-screen-header'>digital education</h1>
      <img src={Blob} alt='' className='login-blob' />
      <Row className='login-screen'>
        <Col lg={6} md={6} xs={12} className='login-screen-form'>
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/******* This part is for mobile screen only ********/}
            <div className='login-mobile-logo'>
              <img
                src={Logo}
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
            </div>

            <h3 className='login-header'>DE SMS LOGIN</h3>
            <Form.Floating className='mb-0'>
              <Form.Control
                id='floatingInputCustom'
                type='email'
                placeholder='name@example.com'
                className='mb-0'
              />
              <label htmlFor='floatingInputCustom' className='login-label'>
                Username
              </label>
            </Form.Floating>
            <Form.Floating>
              <Form.Control
                id='floatingPasswordCustom'
                type='password'
                placeholder='Password'
              />
              <label className='login-label' htmlFor='floatingPasswordCustom'>
                Password
              </label>
            </Form.Floating>
            <Button variant='outline-primary' className='mt-2 login-log-btn'>
              <i className='fi fi-rr-user'></i> Log In
            </Button>
            <p style={{ color: '#0001ff' }}>
              Not registered yet?{' '}
              <Link
                to='/register'
                className='router-link'
                style={{ color: '#0001ff' }}
              >
                Click Me!
              </Link>{' '}
            </p>
          </Form>
        </Col>
        <Col lg={6} md={6} xs={12} style={{ paddingRight: '0' }}>
          <Carousel
            style={{ height: '100%' }}
            className='container-carousel'
            variant='light'
            interval={5000}
          >
            <Carousel.Item>
              <Carousel.Caption style={{ color: '#fff', position: 'static' }}>
                <h4 style={{ color: '#fff' }}>Digital</h4>
                <h5 style={{ color: '#fff' }} className='mb-3'>
                  Education
                </h5>
                <p>Digitalize | Systemize | Synchronize</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption style={{ color: '#fff', position: 'static' }}>
                <img
                  src={Sync}
                  alt=''
                  style={{ width: '200px', height: '200px' }}
                  className='mb-3'
                />
                <p>
                  Easily update your data in <br />
                  real time with us.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption style={{ color: '#fff', position: 'static' }}>
                <img
                  src={Management}
                  alt=''
                  style={{ width: '200px', height: '200px' }}
                  className='mb-3'
                />
                <p>Easily managea your data and information digitally.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
