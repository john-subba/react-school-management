import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Spinner from '../Spinner';
import DashboardActions from '../../actions/DashboardActions';
import { Col, Container, Row, Table, Modal, Button } from 'react-bootstrap';
import Alerts from '../../alert/Alerts';
import alert from '../../../assets/dashboard/alert.png';
import { withRouter, Link } from 'react-router-dom';

//redux part
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../actions/auth';
import { deleteTeacher } from '../../../actions/users';

const Dashboard = ({
  auth: { user, isLoading },
  teachersList,
  deleteTeacher,
  getCurrentUser,
  history,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseAndDlt = (_id) => {
    deleteTeacher(_id);
    setShowConfirm(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return isLoading === true && user === null ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <h4 className='dashboard-header-wlc mb-0'>
        Welcome <span style={{ color: '#992b3e' }}>to</span>{' '}
        <span style={{ color: '#13578b' }}>{user.schoolName}</span>
      </h4>
      <Alerts />
      <Container style={{ paddingTop: '1.5rem' }}>
        <Row>
          <Col className='dashboard-col'>
            <h4
              style={{
                color: '#343a40',
                paddingBottom: '0',
                marginBottom: '0',
                fontFamily: 'Zen Maru Gothic',
              }}
            >
              Staff's name List
            </h4>
            <DashboardActions
              setShowDelete={setShowDelete}
              showDelete={showDelete}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
            />
          </Col>
        </Row>
        <Row>
          {teachersList.teachers.length === 0 ? (
            <>
              <p style={{ paddingLeft: '1rem', fontFamily: 'Zen Maru Gothic' }}>
                There are no any staff details added. Please add some.
              </p>
            </>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              size='sm'
              style={{ fontSize: '0.9rem' }}
            >
              <thead className='dashboard-thead'>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {teachersList.teachers.map((teacher) => {
                  const { _id, name, department, position, address } = teacher;
                  return (
                    <tr key={_id} className='dashboard-tr'>
                      <td>{name}</td>
                      <td>{department}</td>
                      <td>{position}</td>
                      <td
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {address}{' '}
                        {showDelete && (
                          <>
                            <Button
                              variant='primary'
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
                              <i className='far fa-times-circle'></i>
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
                                      By deleting the staff you will also delete
                                      all of the details inside his profile
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
                                  onClick={handleCloseAndDlt}
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
                          </>
                        )}
                        {showEdit && (
                          <Link
                            to={{
                              pathname: '/edit-teacher-details',
                              _id,
                            }}
                          >
                            <Button
                              variant='primary'
                              style={{
                                color: 'blue',
                                cursor: 'pointer',
                                border: 'none',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                                padding: '0',
                              }}
                            >
                              <i className='far fa-edit'></i>
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  teachersList: state.auth.user,
});

export default connect(mapStateToProps, { getCurrentUser, deleteTeacher })(
  withRouter(Dashboard)
);
