import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const DashboardActions = () => {
  return (
    <div className='dashboard-actions-container'>
      <h6
        style={{
          color: '#343a40',
          textShadow: '4px 4px #00000021',
          fontSize: '1rem',
          paddingLeft: '0.5rem',
          paddingBottom: '0.75rem',
        }}
      >
        Dashboard Actions
      </h6>
      <div className='dashboard-actions'>
        <Link to='/add-teacher-details'>
          <Button
            className='btn-gradient-bg'
            style={{ borderRadius: '5px', color: '#fff' }}
          >
            Add Teacher
          </Button>
        </Link>
        {/* <Link to='/add-subject'>
          <Button
            className='btn-gradient-bg'
            style={{ borderRadius: '5px', color: '#fff' }}
          >
            Add Subject
          </Button>
        </Link> */}
      </div>
    </div>
  );
};

export default DashboardActions;
