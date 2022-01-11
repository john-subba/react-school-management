import React, { useEffect } from 'react';
import Header from '../Header';
import Spinner from '../Spinner';
import DashboardActions from '../../actions/DashboardActions';
import { Col, Container, Row, Button } from 'react-bootstrap';

//redux part
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';

import { Link } from 'react-router-dom';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { isLoading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return isLoading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <Container style={{ paddingTop: '8rem' }}>
        <Row style={{ alignItems: 'center', gap: '1rem' }} className='pb-2'>
          <Col className='dashboard-user-details'>
            <img src={user.avatar} alt='avatar' className='dashboard-avatar' />
            <div>
              <h1
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
              </h1>
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
            {profile !== null ? (
              <>
                <DashboardActions />
                <div className='dashboard-teacher-list-container'>
                  <h6
                    style={{
                      color: '#343a40',
                      textShadow: '4px 4px #00000021',
                      fontSize: '1rem',
                      paddingLeft: '0.5rem',
                      paddingBottom: '0.75rem',
                      paddingTop: '1.5rem',
                    }}
                  >
                    Teachers Name List
                  </h6>
                  <div className='grid-teacher-list'></div>
                </div>
              </>
            ) : (
              <>
                <p>
                  You have not set any profile. Please click below to create
                  one.
                </p>
                <Link to='/create-profile'>
                  <Button
                    className=' btn-gradient-bg'
                    style={{
                      borderRadius: '20px',
                      color: 'white',
                      padding: '12px 2rem',
                      letterSpacing: '2px',
                    }}
                  >
                    Click Me!
                  </Button>
                </Link>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
