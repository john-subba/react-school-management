import React, { useState } from 'react';
import Header from '../Header';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import TeacherActions from '../../actions/TeacherActions';
import alert from '../../../assets/dashboard/alert.png';
import Alerts from '../../alert/Alerts';
import Spinner from '../Spinner';

// redux part
import { connect } from 'react-redux';
import { getCurrentTeacher } from '../../../actions/users';

const TeacherProfile = ({ teacherProfile, teacher: { isLoading } }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (teacherProfile === null) {
    return <Redirect to='/dashboard' />;
  }
  const { name, department, position, address, _id } = teacherProfile;
  const teacher_id = _id;

  return (isLoading === true) & (teacherProfile === null) ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <Alerts />
      <Container>
        <Row className='teacher-profile-row'>
          <Col style={{ fontFamily: 'Zen Maru Gothic' }}>
            <h4>Teacher Profile</h4>
            <p style={{ marginBottom: '0' }}>
              <span style={{ fontWeight: 'bold' }}>Name:</span> {name}
            </p>
            <p style={{ marginBottom: '0' }}>
              <span style={{ fontWeight: 'bold' }}>Department:</span>{' '}
              {department}
            </p>
            <p style={{ marginBottom: '0' }}>
              <span style={{ fontWeight: 'bold' }}>Position:</span> {position}
            </p>
            <p style={{ marginBottom: '0' }}>
              <span style={{ fontWeight: 'bold' }}>Address:</span> {address}
            </p>
          </Col>
        </Row>

        <TeacherActions
          _id={_id}
          showDelete={showDelete}
          showEdit={showEdit}
          setShowDelete={setShowDelete}
          setShowEdit={setShowEdit}
        />

        <Row>
          {teacherProfile.subjects.length === 0 ? (
            <p>
              There are no subjects for this teacher. Click here to add some.
            </p>
          ) : (
            <>
              <Table
                striped
                bordered
                hover
                responsive
                size='sm'
                style={{ fontSize: '0.9rem', fontFamily: 'Zen Maru Gothic' }}
              >
                <thead className='dashboard-thead'>
                  <tr>
                    <th>Subject Title</th>
                    <th>Subject Teacher</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                {teacherProfile.subjects.map((subject) => {
                  const { _id, title, createdDate, subjectTeacher } = subject;
                  return (
                    <tbody key={_id}>
                      <tr className='dashboard-tr'>
                        <td>{title}</td>
                        <td>{subjectTeacher}</td>
                        <td
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {createdDate}{' '}
                          {showDelete && (
                            <>
                              <Button
                                style={{
                                  color: 'red',
                                  cursor: 'pointer',
                                  border: 'none',
                                  boxShadow: 'none',
                                  backgroundColor: 'transparent',
                                  padding: '0',
                                }}
                                onClick={() => setShowConfirm(true)}
                              >
                                <i className='far fa-times-circle' />
                              </Button>
                              <Modal
                                show={showConfirm}
                                onHide={() => setShowConfirm(!showConfirm)}
                                centered
                              >
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
                                      "{title}"
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
                                        By deleting the subject you will also
                                        delete all of the classes and students
                                        inside the subject
                                      </p>
                                    </div>
                                  </div>
                                </Modal.Body>
                                <Modal.Footer style={{ border: 'none' }}>
                                  <Button
                                    variant='secondary'
                                    onClick={() => setShowConfirm(!showConfirm)}
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
                                    style={{
                                      borderRadius: '20px',
                                      padding: '8px 1rem',
                                      margin: '0',
                                    }}
                                  >
                                    <i className='fas fa-trash-alt'></i> Delete
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  teacherProfile: state.teacher.teacherProfile,
  teacher: state.teacher,
});

export default connect(mapStateToProps, { getCurrentTeacher })(TeacherProfile);
