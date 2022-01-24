import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import Alerts from '../../alert/Alerts';
import Header from '../Header';
import { Redirect, withRouter } from 'react-router-dom';
import teacherIcon from '../../../assets/dashboard/teacher.png';
import EditIcon from '../../../assets/dashboard/edit.png';
import alert from '../../../assets/dashboard/alert.png';

// redux part
import { connect } from 'react-redux';
import { loadCurrExamSubject } from '../../../actions/subjects';
import { editExamDetails } from '../../../actions/exams';
import { deleteExamDetails } from '../../../actions/exams';

const Subjects = ({
  location,
  subjectsList: { subjects, isLoading },
  loadCurrExamSubject,
  editExamDetails,
  deleteExamDetails,
  history,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    fromDate: '',
    toDate: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [showDlt, setShowDlt] = useState(false);
  const { title, fromDate, toDate } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadUser = (_id) => {
    loadCurrExamSubject(_id);
  };

  const onSubmit = (e, _id) => {
    e.preventDefault();
    editExamDetails(formData, _id, history);
    setShowForm(false);
  };

  const dltExam = (_id, history) => {
    deleteExamDetails(_id, history);
  };

  if (location._id === undefined) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <Header />
      <div style={{ paddingTop: '5rem' }}>
        <Alerts />
      </div>
      <Container style={{ paddingTop: '1.5rem' }}>
        <Row>
          <h2>Examination Details</h2>
          <h6
            style={{
              fontSize: '0.9rem',
            }}
            className='mb-1'
          >
            {location.title}
          </h6>
          <p
            className='mb-0'
            style={{ fontSize: '0.9rem', fontFamlily: 'Zen Maru Gothic' }}
          >
            From Date: {location.fromDate}
          </p>
          <p
            className='mb-0'
            style={{ fontSize: '0.9rem', fontFamlily: 'Zen Maru Gothic' }}
          >
            End Date: {location.toDate}
          </p>

          <Button
            className='dashboard-btn mb-2'
            onClick={() => setShowForm(true)}
          >
            <img src={EditIcon} alt='' />{' '}
            <span style={{ paddingLeft: '0.5rem' }}>Edit Exam Details</span>
          </Button>
        </Row>
        {showForm && (
          <Row className='add-subject-row btn-gradient-bg mb-3'>
            <h5
              style={{
                color: '#fff',
                fontFamily: 'Zen Maru Gothic',
                textAlign: 'center',
              }}
            >
              Edit Exam Details
            </h5>
            <Col className='add-subject-col'>
              <Form.Group className='mb-3' controlId='formBasicDepartment'>
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
                onClick={(e) => onSubmit(e, location._id)}
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
        )}
        <Row className='mt-2'>
          <Col>
            <h2
              style={{
                color: '#343a40',
                paddingBottom: '0',
                marginBottom: '0',
              }}
            >
              Subjects
            </h2>
          </Col>
        </Row>
        <Row>
          <Col className='subject-actions-col'>
            <Button
              className='btn-gradient-bg load-sub-btn'
              onClick={() => loadUser(location._id)}
            >
              Load Subjects
            </Button>
            <Button className='btn-gradient-bg load-sub-btn'>
              Add Subjects
            </Button>
          </Col>
        </Row>
        <Row className='subject-btn-row pb-5'>
          <Col className='subject-btn-col'>
            {isLoading === true ? (
              <p>
                Please click load subjects to fetch subjects of your
                examination.
              </p>
            ) : (
              <>
                {subjects.length > 0 ? (
                  <>
                    {subjects.map((subject) => {
                      const { _id, title, subjectTeacher, createdDate } =
                        subject;
                      return (
                        <div className='subject-btn-container' key={_id}>
                          <div className='subject-btn'>
                            <h5 className='subject-btn-h5'>{title}</h5>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}
                            >
                              <img src={teacherIcon} alt='' />
                              <small>
                                <p className='mb-0'>{subjectTeacher}</p>
                              </small>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p>
                    There are no subjects for this examination. Please add some
                    subject details. Or click load subject to load your
                    subjects.
                  </p>
                )}
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant='danger' onClick={() => setShowDlt(true)}>
              <i className='fas fa-trash'></i> <span>Delete Exam</span>
            </Button>
          </Col>
        </Row>
        {showDlt && (
          <Modal show={showDlt} onHide={() => setShowDlt(false)} centered>
            <Modal.Header
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '0',
                paddingTop: '0.5rem',
                border: 'none',
              }}
            >
              <Modal.Title id='contained-modal-title-vcenter'>
                <h4
                  style={{
                    marginBottom: '0',
                    fontFamily: 'Zen Maru Gothic',
                    textTransform: 'capitalize',
                    letterSpacing: '1px',
                  }}
                >
                  Are you sure?
                </h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p
                style={{
                  marginBottom: '0',
                  textAlign: 'center',
                  fontFamily: 'Zen Maru Gothic',
                  fontStyle: 'italic',
                }}
              >
                Do you really want to delete{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                  }}
                >
                  "{location.title}"
                </span>{' '}
              </p>
              <p
                style={{
                  textAlign: 'center',
                  fontFamily: 'Zen Maru Gothic',
                  fontStyle: 'italic',
                }}
              >
                You can't undo this action.
              </p>
              <div className='dlt-modal-warning'>
                <img src={alert} alt='' />
                <div>
                  <h5
                    style={{
                      letterSpacing: '1px',
                      paddingBottom: '0.25rem',
                    }}
                  >
                    Warning
                  </h5>
                  <p
                    style={{
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                      marginBottom: '0',
                    }}
                  >
                    By deleting the exam you will delete all of its content
                    inside it.
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer style={{ border: 'none' }}>
              <Button
                variant='secondary'
                onClick={() => setShowDlt(false)}
                style={{
                  borderRadius: '20px',
                  padding: '8px 1rem',
                  boxShadow: 'none',
                  margin: '0',
                }}
              >
                Cancel
              </Button>
              <Button
                variant='danger'
                onClick={() => dltExam(location._id, history)}
                style={{
                  borderRadius: '20px',
                  padding: '8px 1rem',
                  margin: '0',
                }}
              >
                Delete <i className='fas fa-trash-alt'></i>
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  subjectsList: state.subject,
});

export default connect(mapStateToProps, {
  loadCurrExamSubject,
  editExamDetails,
  deleteExamDetails,
})(withRouter(Subjects));
