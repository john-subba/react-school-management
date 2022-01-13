import React, { useEffect } from 'react';
import Header from '../Header';
import Spinner from '../Spinner';
import DashboardActions from '../../actions/DashboardActions';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';

//redux part
import { connect } from 'react-redux';
import { loadUser } from '../../../actions/auth';

const Dashboard = ({ auth: { user, isLoading }, teachersList }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return isLoading === true ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <Container style={{ paddingTop: '8rem' }}>
        <Row style={{ alignItems: 'center', gap: '1rem' }} className='pb-2'>
          <Col className='dashboard-user-details'>
            <img src={user.avatar} alt='avatar' className='dashboard-avatar' />
            <div>
              <h6
                style={{
                  color: '#343a40',
                  textShadow: '4px 4px #00000021',
                  fontSize: '1rem',
                  paddingTop: '1rem',
                }}
              >
                Your
                <span style={{ color: '#992b3e' }}> School</span>{' '}
                <span style={{ color: '#13578b' }}>Profile</span>
              </h6>
              <p className='dashboard-user'>Name: {user.name}</p>
              <p className='dashboard-user'>School Name: {user.schoolName}</p>
              <p className='dashboard-user'>
                School Address: {user.schoolAddress}
              </p>
              <p className='dashboard-user'>
                School Phone No: {user.schoolPhoneNo}
              </p>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: '1rem',
          }}
        >
          <Col>
            <DashboardActions />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <h6
              style={{
                color: '#343a40',
                textShadow: '4px 4px #00000021',
                fontSize: '1rem',
                paddingTop: '2rem',
                paddingBottom: '1rem',
              }}
            >
              <span style={{ color: '#992b3e' }}>Teachers</span> name
              <span style={{ color: '#13578b' }}> List</span>
            </h6>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            {teachersList.teachers.map((teacher, index) => {
              const { _id, name, department } = teacher;
              return (
                <tr key={_id}>
                  <td>{index}</td>
                  <td>{name}</td>
                  <td>{department}</td>
                </tr>
              );
            })}
          </Table>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  teachersList: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
