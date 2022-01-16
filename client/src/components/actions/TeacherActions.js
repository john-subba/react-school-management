import React, { useState } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import bookIcon from '../../assets/teach-prof/book.png';
import trashIcon from '../../assets/teach-prof/trash.png';
import AddSubject from '../forms/AddSubject';

const TeacherActions = ({
  _id,
  showDelete,
  showEdit,
  setShowDelete,
  setShowEdit,
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Container style={{ paddingTop: '1rem' }}>
      <Row>
        <Col style={{ paddingLeft: '0' }} className='teacher-actions-col'>
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
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <Button
              className='dashboard-btn'
              onClick={() => setShowForm(!showForm)}
            >
              <img src={bookIcon} alt='' /> + Add Subject
            </Button>
            <Button
              className='dashboard-btn'
              onClick={() => setShowDelete(!showDelete)}
            >
              <img src={trashIcon} alt='' /> - Delete Subject
            </Button>
            <Button
              className='dashboard-btn'
              onClick={() => setShowEdit(!showEdit)}
            >
              <img src={trashIcon} alt='' /> - Edit Subject
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        {showForm && (
          <AddSubject showForm={showForm} setShowForm={setShowForm} _id={_id} />
        )}
      </Row>
    </Container>
  );
};

export default TeacherActions;
