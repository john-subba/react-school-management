import React, { useEffect } from 'react';
import Header from '../Header';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// redux part
import { connect } from 'react-redux';
import { getCurrentTeacher } from '../../../actions/users';

const TeacherProfile = ({ teacherProfile }) => {
  if (teacherProfile === null) {
    return <Redirect to='/dashboard' />;
  }

  const { name, department, position, address } = teacherProfile;

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h2>Teacher Profile</h2>
            <p>Name: {name}</p>
            <p>Department: {department}</p>
            <p>Position: {position}</p>
            <p>Address: {address}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  teacherProfile: state.teacher.teacherProfile,
});

export default connect(mapStateToProps, { getCurrentTeacher })(TeacherProfile);
