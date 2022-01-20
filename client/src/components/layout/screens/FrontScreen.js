import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProfileGif from '../../../assets/dashboard/Profile.gif';
import DashboardGif from '../../../assets/dashboard/Dashboard.gif';
import { Link } from 'react-router-dom';
import Header from '../Header';

//redux
import { connect } from 'react-redux';

const FrontScreen = ({ isAdmin }) => {
  return (
    <>
      <Header />
      <h2
        style={{
          color: '#343a40',
          paddingTop: '2.5rem',
          fontFamily: 'Fredoka One',
          textAlign: 'center',
        }}
        className='front-screen-h2'
      >
        <span style={{ color: '#992b3e' }}> School</span>{' '}
        <span style={{ color: '#13578b' }}>Links</span>
      </h2>
      <Container>
        <Row className='front-screen-row'>
          <Col style={{ textAlign: 'center' }} className='front-screen-col'>
            <img
              src={ProfileGif}
              alt=''
              style={{
                width: '70%',
              }}
            />
            <Link to='/school-profile'>
              <Button variant='primary' className='btn-body-fifth_1st'>
                Go to school profile
              </Button>
            </Link>
          </Col>
          <Col style={{ textAlign: 'center' }} className='front-screen-col'>
            <img
              src={DashboardGif}
              alt=''
              style={{
                width: '70%',
              }}
            />
            {isAdmin ? (
              <Link to='/dashboard'>
                <Button variant='primary' className='btn-body-fifth_1st'>
                  Go to school dashboard
                </Button>
              </Link>
            ) : (
              <Link to='/teacher-profile'>
                <Button variant='primary' className='btn-body-fifth_1st'>
                  Go to your profile
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(FrontScreen);
