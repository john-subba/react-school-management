import React, { useState } from 'react';
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import testIcon from '../../assets/dashboard/test.png';
// redux part
import { connect } from 'react-redux';
import { addExamDetails } from '../../actions/exams';

const DashboardActions = ({ addExamDetails }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    fromDate: '',
    toDate: '',
  });

  const { title, fromDate, toDate } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExamDetails(formData);
    setShowForm(false);
  };

  return (
    <div className='dashboard-actions-container'>
      <div className='dashboard-actions'>
        <Button
          className='dashboard-btn pb-3'
          onClick={() => setShowForm(true)}
        >
          <img src={testIcon} alt='' className='dashboard-actions-icons' />+ Add
          Exam Details
        </Button>
      </div>
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
                    Add Exam Details
                  </h5>
                  <Col className='add-subject-col'>
                    <Form.Group
                      className='mb-3'
                      controlId='formBasicDepartment'
                    >
                      <Form.Label
                        style={{ color: '#fff', fontFamily: 'Zen Maru Gothic' }}
                      >
                        Exam Title
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
                        From Date
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
                        name='fromDate'
                        value={fromDate}
                        className='border-focus'
                        onChange={(e) => onChange(e)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label
                        style={{ color: '#fff', fontFamily: 'Zen Maru Gothic' }}
                      >
                        To Date
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
                        name='toDate'
                        value={toDate}
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
    </div>
  );
};

export default connect(null, { addExamDetails })(DashboardActions);
