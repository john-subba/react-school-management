import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Spinner from '../Spinner';
import DashboardActions from '../../actions/DashboardActions';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import Alerts from '../../alert/Alerts';
import { withRouter, Link } from 'react-router-dom';

//redux part
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../actions/auth';
import { loadCurrentExams } from '../../../actions/exams';

const Dashboard = ({
  auth: { user, isLoading },
  examList: { exams, examsIsLoading },
  getCurrentTeacher,
  history,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return isLoading === true && user === null ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <h4 className='dashboard-header-wlc mb-0'>
        Welcome <span style={{ color: '#992b3e' }}>to</span>{' '}
        <span style={{ color: '#13578b' }}>{user.schoolName}</span>
      </h4>
      <Alerts />
      <Container style={{ paddingTop: '1.5rem' }}>
        <Row>
          <Col className='dashboard-col'>
            <h4
              style={{
                color: '#343a40',
                paddingBottom: '0',
                marginBottom: '0',
                fontFamily: 'Zen Maru Gothic',
              }}
            >
              Exam List
            </h4>
          </Col>
        </Row>
        <Row>
          <DashboardActions
            setShowDelete={setShowDelete}
            showDelete={showDelete}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
          />
        </Row>
        <Row>
          {examsIsLoading ? (
            <Spinner />
          ) : exams === null ? (
            <>
              <p style={{ paddingLeft: '1rem', fontFamily: 'Zen Maru Gothic' }}>
                There are no any exams details added. Please add some.
              </p>
            </>
          ) : (
            <>
              <Table
                bordered
                striped
                hover
                responsive
                size='sm'
                style={{ fontSize: '0.9rem', marginBottom: '0' }}
              >
                <thead className='dashboard-thead'>
                  <tr>
                    <th>Name</th>
                    <th>From - Date</th>
                    <th>To - Date</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam) => {
                    const { _id, title, fromDate, toDate } = exam;
                    return (
                      <tr key={_id} className='dashboard-tr'>
                        <td>{title}</td>
                        <td>{fromDate}</td>
                        <td>{toDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <small style={{ color: '#AFB2B4' }}>
                *** Click on Exam's title to view subjects and classes.
              </small>
            </>
          )}
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  examList: state.exam,
});

export default connect(mapStateToProps, {
  getCurrentUser,
  loadCurrentExams,
})(withRouter(Dashboard));
