import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const EditSubject = ({ showForm, setShowForm, teacher_id }) => {
  const [formData, setFormData] = useState({
    title: '',
    subjectTeacher: '',
  });

  const { title, subjectTeacher } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Container fluid style={{ paddingBottom: '0.75rem' }}>
        <Form>
          <Row className='add-subject-row btn-gradient-bg'>
            <h5
              style={{
                color: '#fff',
                fontFamily: 'Zen Maru Gothic',
                textAlign: 'center',
              }}
            >
              Edit Subject Details
            </h5>
            <Col className='add-subject-col'>
              <Form.Group className='mb-3' controlId='formBasicDepartment'>
                <Form.Label
                  style={{ color: '#fff', fontFamily: 'Zen Maru Gothic' }}
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
                    fontSize: '0.9rem',
                  }}
                  name='title'
                  className='border-focus'
                  value={title}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicDepartment'>
                <Form.Label
                  style={{ color: '#fff', fontFamily: 'Zen Maru Gothic' }}
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
                    fontSize: '0.9rem',
                  }}
                  name='subjectTeacher'
                  className='border-focus'
                  value={subjectTeacher}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
            </Col>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '0.5rem',
              }}
            >
              <Button
                className='add-subject-btn'
                onClick={(e) => onSubmit(e, teacher_id)}
              >
                <i className='fa fa-save'></i> Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default EditSubject;
