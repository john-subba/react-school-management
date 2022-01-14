import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import userIcon from '../../assets/dashboard/user.png';
import trashIcon from '../../assets/dashboard/trash.png';
import editIcon from '../../assets/dashboard/edit.png';

const DashboardActions = ({ setShowDelete, showDelete }) => {
  return (
    <div className='dashboard-actions-container'>
      <div className='dashboard-actions'>
        <Link to='/add-teacher-details' className='router-link'>
          <Button className='dashboard-btn'>
            <img src={userIcon} alt='' className='dashboard-actions-icons' />+
            Add Staff
          </Button>
        </Link>

        <Button
          className='dashboard-btn'
          onClick={() => setShowDelete(!showDelete)}
        >
          <img src={trashIcon} alt='' className='dashboard-actions-icons' />-
          Remove Staff
        </Button>

        <Link to='/edit-teacher-details' className='router-link'>
          <Button className='dashboard-btn'>
            <img src={editIcon} alt='' className='dashboard-actions-icons' />
            .. Edit Staff
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
