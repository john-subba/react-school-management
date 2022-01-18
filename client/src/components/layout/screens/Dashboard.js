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

const Dashboard = ({
  auth: { user, isLoading },
  teachersList,

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
              Staff's name List
            </h4>
            <DashboardActions
              setShowDelete={setShowDelete}
              showDelete={showDelete}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
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
                    <th>Department</th>
                    <th>Position</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {teachersList.teachers.map((teacher) => {
                    const { _id, name, department, position, address } =
                      teacher;
                    return (
                      <tr key={_id} className='dashboard-tr'>
                        <td>
                          <button
                            className='dashboard-table-teacher'
                            onClick={() => getCurrentTeacher(_id, history)}
                          >
                            {name}
                          </button>
                        </td>
                        <td>{department}</td>
                        <td>{position}</td>
                        <td
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {address}{' '}
                          {showEdit && (
                            <Link
                              to={{
                                pathname: '/edit-teacher-details',
                                _id,
                              }}
                            >
                              <Button
                                variant='primary'
                                style={{
                                  color: 'blue',
                                  cursor: 'pointer',
                                  border: 'none',
                                  boxShadow: 'none',
                                  backgroundColor: 'transparent',
                                  padding: '0',
                                }}
                              >
                                <i className='far fa-edit'></i>
                              </Button>
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <small style={{ color: '#AFB2B4' }}>
                *** Click on staff's name to view more details
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
});

export default connect(mapStateToProps, {
  getCurrentUser,
})(withRouter(Dashboard));
