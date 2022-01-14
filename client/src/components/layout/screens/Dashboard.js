import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Spinner from '../Spinner';
import DashboardActions from '../../actions/DashboardActions';
import { Col, Container, Row, Table, Modal, Button } from 'react-bootstrap';
import Alerts from '../../alert/Alerts';
import alert from '../../../assets/dashboard/alert.png';

//redux part
import { connect } from 'react-redux';
import { loadUser } from '../../../actions/auth';
import { deleteTeacher } from '../../../actions/users';

const Dashboard = ({
  auth: { user, isLoading },
  teachersList,
  deleteTeacher,
  loadUser,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCloseAndDlt = (_id) => {
    deleteTeacher(_id);
    setShowConfirm(false);
  };

  return isLoading === true && user === null ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <h4 className='dashboard-header-wlc'>
        Welcome <span style={{ color: '#992b3e' }}>to</span>{' '}
        <span style={{ color: '#13578b' }}>{user.schoolName}</span>
      </h4>
      <Alerts />
      <Container>
        <Row style={{ alignItems: 'center', gap: '1rem' }} className='pb-2'>
          <Col className='dashboard-user-details'>
            <img src={user.avatar} alt='avatar' className='dashboard-avatar' />
            <div>
              <h6
                style={{
                  color: '#343a40',
                  fontSize: '1rem',
                  paddingTop: '1rem',
                }}
              >
                Your
                <span style={{ color: '#992b3e' }}> School</span>{' '}
                <span style={{ color: '#13578b' }}>Profile</span>
              </h6>
              <p className='dashboard-user'>
                <span className='dashboard-user-label'>Name:</span> {user.name}
              </p>
              <p className='dashboard-user'>
                <span className='dashboard-user-label'>School Name:</span>{' '}
                {user.schoolName}
              </p>
              <p className='dashboard-user'>
                <span className='dashboard-user-label'>School Address:</span>{' '}
                {user.schoolAddress}
              </p>
              <p className='dashboard-user'>
                <span className='dashboard-user-label'>School Phone No: </span>{' '}
                {user.schoolPhoneNo}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container style={{ paddingTop: '1rem' }}>
        <Row>
          <Col
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingBottom: '0.5rem',
              gap: '1rem',
            }}
          >
            <h4
              style={{
                color: '#343a40',
                paddingBottom: '0',
                marginBottom: '0',
              }}
            >
              Staff's name List
            </h4>
            <DashboardActions
              setShowDelete={setShowDelete}
              showDelete={showDelete}
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

export default connect(mapStateToProps, { loadUser, deleteTeacher })(Dashboard);
