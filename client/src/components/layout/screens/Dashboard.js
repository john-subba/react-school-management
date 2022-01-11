import React, { useEffect } from 'react';
import Header from '../Header';
import Spinner from '../Spinner';

//redux part
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';
import { Col, Container, Row } from 'react-bootstrap';
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
      <Container style={{ paddingTop: '6rem' }}>
        <Row>
          <Col>Welcome {user && user.name}</Col>
        </Row>
        <Row>
          <Col>
            {profile !== null ? (
              'has'
            ) : (
              <>
                <p>
                  You have not set any profile. Please create one.{' '}
                  <Link to='/create-profile' className='router-link'>
                    Click Me!
                  </Link>
                </p>
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
