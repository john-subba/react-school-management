import React from 'react';
import {
  Container,
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
} from 'react-bootstrap';

const LoginScreen = () => {
  return (
    <>
      <Container className='login-screen-container' fluid>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <>
              <FloatingLabel
                controlId='floatingInput'
                label='Email address'
                className='mb-3'
              >
                <Form.Control type='email' placeholder='name@example.com' />
              </FloatingLabel>
              <FloatingLabel controlId='floatingPassword' label='Password'>
                <Form.Control type='password' placeholder='Password' />
              </FloatingLabel>
            </>
            <Button className='btn-login'>Primary</Button>
          </Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginScreen;
