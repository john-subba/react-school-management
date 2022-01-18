import React, { useState } from 'react';
import Header from '../Header';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import TeacherActions from '../../actions/TeacherActions';
import alert from '../../../assets/dashboard/alert.png';
import Alerts from '../../alert/Alerts';
import Spinner from '../Spinner';

// redux part
import { connect } from 'react-redux';
import { getCurrentTeacher } from '../../../actions/users';
import { deleteTeacher } from '../../../actions/users';
import SubjectDetails from '../classes/SubjectDetails';

const TeacherProfile = ({
  teacherProfile,
  teacher: { isLoading },
  deleteTeacher,
  history,
}) => {
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
          teacher_id={teacher_id}
          showEdit={showEdit}
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
                        <td>
                          <Link
                            to={{
                              pathname: '/subject-details',
                              title,
                              _id,
                              subjectTeacher,
                            }}
                            className='router-link dashboard-table-teacher'
                          >
                            {title}
                          </Link>
                        </td>
                        <td>{subjectTeacher}</td>
                        <td
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {createdDate}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </>
          )}
        </Row>

        <Row>
          <Col>
            <Button
              variant='danger'
              style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              <img
                src={alert}
                alt=''
                style={{ height: '20px', width: '20px' }}
              />
              Delete Teacher
            </Button>
            {showConfirm && (
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
                      "{name}"
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
                        By agreeing to delete you will delete all of this
                        staff's data.
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
                    onClick={() => deleteTeacher(teacher_id, history)}
                  >
                    Delete <i className='fas fa-trash-alt'></i>
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  teacherProfile: state.teacher.teacherProfile,
  teacher: state.teacher,
});

export default connect(mapStateToProps, { getCurrentTeacher, deleteTeacher })(
  withRouter(TeacherProfile)
);
