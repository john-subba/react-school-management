import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../Header';
import Alert from '../../alert/Alert';

//redux part
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import { registerUser } from '../../../actions/auth';
import { Redirect } from 'react-router-dom';

const RegisterScreen = ({ setAlert, registerUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    schoolName: '',
    schoolAddress: '',
    schoolPhoneNo: '',
    email: '',
    password: '',
    password2: '',
  });

  const {
    name,
    schoolName,
    schoolAddress,
    schoolPhoneNo,
    email,
    password,
    password2,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser({
        name,
        schoolName,
        schoolAddress,
        schoolPhoneNo,
        email,
        password,
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <Header />
      <div className='register-headers'>
        <h1
          style={{
            color: '#343a40',
            textShadow: '4px 4px #00000021',
            fontSize: '2.5rem',
          }}
        >
          Register
          <br /> <span style={{ color: '#992b3e' }}>Your</span>{' '}
          <span style={{ color: '#13578b' }}>School</span>
        </h1>
        <div className='alert-container'>
          <Alert />
        </div>
      </div>
      <Container
        className='mb-5'
        style={{
          maxWidth: '900px',
        }}
        fluid
      >
        <Row>
          <Col className='register-form' md={8} sm={10} lg={10}>
            <Form onSubmit={(e) => onSubmit(e)}>
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  Your Full Name
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your full'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='name'
                  className='border-focus'
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicSchoolName'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  School Name
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter school name'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='schoolName'
                  value={schoolName}
                  className='border-focus'
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicSchoolAddress'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  School Address
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter school address'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='schoolAddress'
                  value={schoolAddress}
                  className='border-focus'
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicSchoolEmail'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  School Email
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter school email'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='email'
                  className='border-focus'
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
                <Form.Text
                  className='text-muted'
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '1px',
                    paddingLeft: '0.5rem',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                >
                  ** You will be using this email as your username in login
                  portal.
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicSchoolNumber'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  School Phone Number
                </Form.Label>
                <Form.Control
                  type='number'
                  className='border-focus'
                  placeholder='Enter your school contact number'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='schoolPhoneNo'
                  value={schoolPhoneNo}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword1'>
                <Form.Label
                  style={{ fontFamily: 'Zen Maru Gothic', color: '#343a40' }}
                >
                  Password
                </Form.Label>
                <Form.Control
                  className='border-focus'
                  type='password'
                  placeholder='Enter your password'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword2'>
                <Form.Label
                  style={{
                    backgroundColor: '#fff',
                    fontFamily: 'Zen Maru Gothic',
                    color: '#343a40',
                  }}
                >
                  Confirm Password
                </Form.Label>
                <Form.Control
                  className='border-focus'
                  type='password'
                  placeholder='Confirm your password'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='password2'
                  value={password2}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Button className='mt-4 register-submit-btn' type='submit'>
                <i className='fi fi-rr-user'></i> Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, registerUser })(
  RegisterScreen
);
