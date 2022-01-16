import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Header from '../layout/Header';
import { withRouter, Link } from 'react-router-dom';

// redux part
import { connect } from 'react-redux';
import { editTeacher } from '../../actions/users';

const EditTeacher = ({ editTeacher, location, history }) => {
  const { _id } = location;
  console.log(_id);

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    address: '',
  });
  const { name, department, position, address } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTeacher(formData, _id, history);
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
            paddingTop: '1rem',
          }}
        >
          Edit
          <span style={{ color: '#992b3e' }}> Teacher</span>{' '}
          <span style={{ color: '#13578b' }}>Details</span>
        </h1>
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
              <Form.Group className='mb-3' controlId='formBasicDepartment'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  Teacher Name
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

              <Form.Group className='mb-3' controlId='formBasicDepartment'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  Teacher Department
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your full'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='department'
                  className='border-focus'
                  value={department}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPosition'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  Teacher Position
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your full'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='position'
                  className='border-focus'
                  value={position}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicAddress'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  Teacher Address
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your full'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='address'
                  className='border-focus'
                  value={address}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button className='mt-2 register-submit-btn' type='submit'>
                  <i className='fi fi-rr-user'></i> Submit
                </Button>
                <Link to='/dashboard'>
                  <Button
                    className='mt-2 register-submit-btn'
                    style={{ color: 'red' }}
                    type='submit'
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect(null, { editTeacher })(withRouter(EditTeacher));
