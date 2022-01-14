import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../layout/Header';
import { withRouter } from 'react-router-dom';

// redux part
import { connect } from 'react-redux';
import { addSubjectDetails } from '../../actions/users';

const AddSubject = ({ history, addSubjectDetails }) => {
  const [formData, setFormData] = useState({
    title: '',
    subjectTeacher: '',
  });

  const { title, subjectTeacher } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addSubjectDetails(formData, history);
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
          Add
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
                  Subject Title
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your full'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='title'
                  className='border-focus'
                  value={title}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicDepartment'>
                <Form.Label
                  style={{ color: '#343a40', fontFamily: 'Zen Maru Gothic' }}
                >
                  Subject Teacher
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your full'
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e2e2',
                    fontFamily: 'Zen Maru Gothic',
                  }}
                  name='subjectTeacher'
                  className='border-focus'
                  value={subjectTeacher}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Button className='mt-2 register-submit-btn' type='submit'>
                <i className='fi fi-rr-user'></i> Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect(null, { addSubjectDetails })(withRouter(AddSubject));
