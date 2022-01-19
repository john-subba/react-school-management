import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Carousel } from 'react-bootstrap';
import Sync from '../../../assets/login/Sync.svg';
import Management from '../../../assets/login/Management.svg';
import { Link, Redirect } from 'react-router-dom';
import Blob from '../../../assets/login/blob.png';
import Logo from '../../../assets/logo.jpg';
import Alerts from '../../alert/Alerts';

// redux part
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/auth';

const LoginScreen = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userName: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const { email, password, userName } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, isAdmin, [e.target.name]: e.target.value });
  };

  const onSelect = (e) => {
    if (e.target.value === 'admin') {
      setIsAdmin(true);
    }
    if (e.target.value === 'teacher') {
      setIsAdmin(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password, isAdmin);
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/front-screen' />;
  }

  // change layout according to the role of user
  const AdminLogin = (
    <Form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
      onSubmit={(e) => onSubmit(e)}
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
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
        />
        <label htmlFor='floatingInputCustom' className='login-label'>
          School Username
        </label>
      </Form.Floating>
      <Form.Floating>
        <Form.Control
          id='floatingPasswordCustom'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
        />
        <label className='login-label' htmlFor='floatingPasswordCustom'>
          Password
        </label>
      </Form.Floating>
      <Form.Select
        aria-label='Default select example'
        className='role-select mt-3'
        onChange={(e) => onSelect(e)}
      >
        <option>Your Role</option>
        <option value='admin'>Admin</option>
        <option value='teacher'>Teacher</option>
      </Form.Select>
      <Button variant='outline-primary' className='login-log-btn' type='submit'>
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
  );

  const TeacherLogin = (
    <Form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
      onSubmit={(e) => onSubmit(e)}
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
          name='userName'
          value={userName}
          onChange={(e) => onChange(e)}
        />
        <label htmlFor='floatingInputCustom' className='login-label'>
          Teacher Username
        </label>
      </Form.Floating>
      <Form.Floating>
        <Form.Control
          id='floatingPasswordCustom'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
        />
        <label className='login-label' htmlFor='floatingPasswordCustom'>
          Password
        </label>
      </Form.Floating>
      <Form.Select
        aria-label='Default select example'
        className='role-select mt-3'
        onChange={(e) => onSelect(e)}
      >
        <option>Your Role</option>
        <option value='admin'>Admin</option>
        <option value='teacher'>Teacher</option>
      </Form.Select>
      <Button variant='outline-primary' className='login-log-btn' type='submit'>
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
  );

  return (
    <Container className='login-screen-container' fluid>
      <h1 className='login-screen-header'>digital education</h1>
      <img src={Blob} alt='' className='login-blob' />
      <Row className='login-screen'>
        <Col lg={6} md={6} xs={12} className='login-screen-form'>
          <div className='alert-container'>
            <Alerts />
          </div>
          {isAdmin === true ? AdminLogin : TeacherLogin}
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

const mapStateToProps = (state) => ({
  // this state is coming from auth.js in reducer file. THis is the main auth state.
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(LoginScreen);
