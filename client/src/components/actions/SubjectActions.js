import React, { useState } from 'react';
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';

const SubjectActions = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    createdDate: '',
    subjectTeacher: '',
  });

  const { title, createdDate, subjectTeacher } = formData;

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
      {showForm && (
        <>
          <Modal show={showForm} onHide={() => setShowForm(false)} centered>
            <Container fluid>
              <Form>
                <Row className='add-subject-row btn-gradient-bg'>
                  <h5
                    style={{
                      color: '#fff',
                      fontFamily: 'Zen Maru Gothic',
                      textAlign: 'center',
                    }}
                  >
                    Add Subject Details
                  </h5>
                  <Col className='add-subject-col'>
                    <Form.Group
                      className='mb-3'
                      controlId='formBasicDepartment'
                    >
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
                        value={title}
                        className='border-focus'
                        onChange={(e) => onChange(e)}
                      />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label
                        style={{ color: '#fff', fontFamily: 'Zen Maru Gothic' }}
                      >
                        Created Date
                      </Form.Label>
                      <Form.Control
                        type='date'
                        placeholder='Enter your full'
                        style={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e2e2',
                          fontFamily: 'Zen Maru Gothic',
                          fontSize: '0.9rem',
                        }}
                        name='createdDate'
                        value={createdDate}
                        className='border-focus'
                        onChange={(e) => onChange(e)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3'>
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
                        value={subjectTeacher}
                        className='border-focus'
                        onChange={(e) => onChange(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col
                    style={{
                      display: 'flex',
                      paddingTop: '1rem',
                      gap: '0.5rem',
                    }}
                  >
                    <Button
                      className='add-subject-btn'
                      onClick={(e) => onSubmit(e)}
                    >
                      <i className='fa fa-save'></i> Save
                    </Button>
                    <Button
                      variant='danger'
                      style={{ borderRadius: '25px' }}
                      onClick={() => setShowForm(false)}
                    >
                      <i className='fa fa-times'></i> Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Modal>
        </>
      )}
    </>
  );
};

export default SubjectActions;
