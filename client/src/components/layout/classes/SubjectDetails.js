import React from 'react';
import Header from '../Header';
import { Container, Row, Col, Button } from 'react-bootstrap';

// redux part

const SubjectDetails = ({ setShowDetails, location }) => {
  const { _id, title, subjectTeacher } = location;
  console.log(location);

  return (
    <>
      <Header />
      <Container>
        <Row className='subject-details-row'>
          <Col className='subject-details-col'>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <h5>{title}</h5>
              <small>{subjectTeacher}</small>
            </div>
            <Button
              style={{
                borderRadius: '25px',
                padding: '10px 18px',
                textTransform: 'capitalize',
                background: 'transparent',
                color: '#343a40',
              }}
            >
              <i className='far fa-edit' /> Edit Subject
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SubjectDetails;
