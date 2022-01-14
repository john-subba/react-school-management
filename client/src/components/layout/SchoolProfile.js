import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';

// redux
import { connect } from 'react-redux';

const SchoolProfile = ({ user }) => {
  return (
    <>
      <Header />
      <Container
        style={{
          backgroundColor: '#e8e8e8',
        }}
      >
        <Row style={{ alignItems: 'center', gap: '1rem' }}>
          <Col className='dashboard-user-container'>
            <img
              src={user.avatar}
              alt=''
              style={{
                borderRadius: '50%',
                width: '15%',
              }}
            />
            <div className='school-profile-details'>
              <h3>{user.schoolName}</h3>
              <p>{user.schoolAddress}</p>
              <p>{user.schoolPhoneNo}</p>
              <p>{user.email}</p>
              <p>
                Reputed School With Advanced & Modern Teaching methods and
                management system.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(SchoolProfile);
