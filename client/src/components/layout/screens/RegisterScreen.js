import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';

// redux
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';

const RegisterScreen = ({ setAlert }) => {
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
      console.log('success');
    }
  };

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
      </div>
      <Container
        className='mb-5'
        style={{
          maxWidth: '900px',
        }}
      >
        <Row>
          <Col>
            <Form onSubmit={(e) => onSubmit(e)}>
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label
                  style={{ color: '#868e96', fontFamily: 'Zen Maru Gothic' }}
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
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicSchoolName'>
                <Form.Label
                  style={{ color: '#868e96', fontFamily: 'Zen Maru Gothic' }}
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
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicSchoolAddress'>
                <Form.Label
                  style={{ color: '#868e96', fontFamily: 'Zen Maru Gothic' }}
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
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicSchoolEmail'>
                <Form.Label
                  style={{ color: '#868e96', fontFamily: 'Zen Maru Gothic' }}
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
                  style={{ color: '#868e96', fontFamily: 'Zen Maru Gothic' }}
                >
                  School Phone Number
                </Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter your school contact number'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='schoolPhoneNo'
                  value={schoolPhoneNo}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword1'>
                <Form.Label
                  style={{ color: '#868e96', fontFamily: 'Zen Maru Gothic' }}
                >
                  Password
                </Form.Label>
                <Form.Control
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

              <Form.Group className='mb-3' controlId='formBasicPassword2'>
                <Form.Label
                  style={{ color: '#868e96', fontFamily: 'Zen Maru Gothic' }}
                >
                  Confirm Password
                </Form.Label>
                <Form.Control
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

              <Button
                variant='outline-primary'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '12px 28px',
                }}
                className='btn-login-header mt-4'
                type='submit'
              >
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

export default connect(null, { setAlert })(RegisterScreen);
