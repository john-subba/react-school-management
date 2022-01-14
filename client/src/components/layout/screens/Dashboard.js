import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Spinner from '../Spinner';
import DashboardActions from '../../actions/DashboardActions';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Alert from '../../alert/Alert';

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

  const deleteStaff = (_id) => {
    deleteTeacher(_id);
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return isLoading === true ? (
    <Spinner />
  ) : (
    <>
      <div className='alert-container'>
        <Alert />
      </div>
      <Header />
      <h4 className='dashboard-header-wlc'>
        Welcome <span style={{ color: '#992b3e' }}>to</span>{' '}
        <span style={{ color: '#13578b' }}>{user.schoolName}</span>
      </h4>
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
                          <button
                            style={{
                              border: 'none',
                              color: 'red',
                              cursor: 'pointer',
                            }}
                            onClick={() => deleteStaff(_id)}
                          >
                            <i className='far fa-times-circle'></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  teachersList: state.auth.user,
});

export default connect(mapStateToProps, { loadUser, deleteTeacher })(Dashboard);
