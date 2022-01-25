import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Table,
} from 'react-bootstrap';
import Alerts from '../../alert/Alerts';
import Header from '../Header';
import EditIcon from '../../../assets/dashboard/edit.png';
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner';

//redux part
import { connect } from 'react-redux';
import { loadCurSubClass } from '../../../actions/classes';
import { addClass } from '../../../actions/classes';

const Class = ({
  location,
  loadCurSubClass,
  addClass,
  classList: { classes, isLoading },
}) => {
  const [classData, setClassData] = useState({
    classTitle: '',
    studentsNumber: '',
  });
  const { classTitle, studentsNumber } = classData;
  const [subjectData, setSubjectData] = useState({
    title: '',
    subjectTeacher: '',
  });
  const { title, subjectTeacher } = subjectData;
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const onChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
    setSubjectData({ ...subjectData, [e.target.name]: e.target.value });
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
          <h2>Subject Details</h2>
          <h6
            style={{
              fontSize: '0.9rem',
            }}
            className='mb-1'
          >
            {location.subjectTitle}
          </h6>
          <p
            className='mb-0'
            style={{ fontSize: '0.9rem', fontFamlily: 'Zen Maru Gothic' }}
          >
            Subject Teacher: {location.subjectTeacher}
          </p>
          <p
            className='mb-0'
            style={{ fontSize: '0.9rem', fontFamlily: 'Zen Maru Gothic' }}
          >
            Created Date: {location.createdDate}
          </p>

          <Button className='dashboard-btn mb-2'>
            <img src={EditIcon} alt='' />{' '}
            <span
              style={{ paddingLeft: '0.5rem' }}
              onClick={() => setShowEdit(true)}
            >
              Edit Subject Details
            </span>
          </Button>
        </Row>
        <Row>
          {showEdit && (
            <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
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
                      Edit Subject Details
                    </h5>
                    <Col className='add-subject-col'>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicDepartment'
                      >
                        <Form.Label
                          style={{
                            color: '#fff',
                            fontFamily: 'Zen Maru Gothic',
                          }}
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
                          style={{
                            color: '#fff',
                            fontFamily: 'Zen Maru Gothic',
                          }}
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
                      <Button className='add-subject-btn'>
                        <i className='fa fa-save'></i> Save
                      </Button>
                      <Button
                        variant='danger'
                        style={{ borderRadius: '25px' }}
                        onClick={() => setShowEdit(false)}
                      >
                        <i className='fa fa-times'></i> Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </Modal>
          )}
        </Row>
        <Row>
          <Col className='subject-actions-col'>
            <Button
              className='btn-gradient-bg load-sub-btn'
              onClick={() => loadCurSubClass(location._id)}
            >
              Load Classes
            </Button>
            <Button
              className='btn-gradient-bg load-sub-btn'
              onClick={() => setShowAdd(true)}
            >
              Add Classes
            </Button>
          </Col>
        </Row>
        <Row>
          {showAdd && (
            <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
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
                      Add Class Details
                    </h5>
                    <Col className='add-subject-col'>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicDepartment'
                      >
                        <Form.Label
                          style={{
                            color: '#fff',
                            fontFamily: 'Zen Maru Gothic',
                          }}
                        >
                          Class Title
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
                          name='classTitle'
                          value={classTitle}
                          className='border-focus'
                          onChange={(e) => onChange(e)}
                        />
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label
                          style={{
                            color: '#fff',
                            fontFamily: 'Zen Maru Gothic',
                          }}
                        >
                          No. of students
                        </Form.Label>
                        <Form.Control
                          type='number'
                          placeholder='Enter your full'
                          style={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e2e2',
                            fontFamily: 'Zen Maru Gothic',
                            fontSize: '0.9rem',
                          }}
                          name='studentsNumber'
                          value={studentsNumber}
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
                      <Button className='add-subject-btn'>
                        <i className='fa fa-save'></i> Save
                      </Button>
                      <Button
                        variant='danger'
                        style={{ borderRadius: '25px' }}
                        onClick={() => setShowAdd(false)}
                      >
                        <i className='fa fa-times'></i> Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </Modal>
          )}
        </Row>
        <Row className='classes-row'>
          <Col>
            {isLoading === true ? (
              <Spinner />
            ) : (
              <>
                {classes.length > 0 ? (
                  <>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Class</th>
                          <th>No. of Students</th>
                        </tr>
                      </thead>
                      {classes.map((clas) => {
                        const { _id, classTitle, studentsNumber } = clas;
                        return (
                          <tbody key={_id}>
                            <tr>
                              <td>{classTitle}</td>
                              <td>{studentsNumber}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </Table>
                  </>
                ) : (
                  <p>
                    There are no classes for this subject. Please add some class
                    details. Or click load class to load your classes.
                  </p>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  classList: state.classes,
});

export default connect(mapStateToProps, { loadCurSubClass, addClass })(Class);
