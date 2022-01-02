import React from 'react';
import Calendar from '../../assets/honeycomb/calendar.svg';
import Class from '../../assets/honeycomb/class.svg';
import Company from '../../assets/honeycomb/company.svg';
import Files from '../../assets/honeycomb/files.svg';
import Form from '../../assets/honeycomb/form.svg';
import GradeSheet from '../../assets/honeycomb/grade-sheet.svg';
import Info from '../../assets/honeycomb/information.svg';
import Meeting from '../../assets/honeycomb/meeting.svg';
import Mobile from '../../assets/honeycomb/mobile.svg';
import Money from '../../assets/honeycomb/money.svg';
import StudentReading from '../../assets/honeycomb/student-reading.svg';
import Website from '../../assets/honeycomb/website.svg';

const HonyComb = () => {
  return (
    <ul className='honeycomb'>
      <li className='honeycomb-cell'>
        <div className='gradient-background'></div>
        <div
          style={{
            marginBottom: '2rem',
          }}
        >
          <img src={Calendar} alt='' />
          <p className='honeycomb-text'>Academic Calendar</p>
        </div>
      </li>
      <li className='honeycomb-cell'>
        <div className='gradient-background'></div>
        <div className='gradient-background'></div>
        <div>
          <img src={Class} alt='' />
          <p className='honeycomb-text'>Grade/Class Management</p>
        </div>
      </li>
      <li className='honeycomb-cell'>
        <div className='gradient-background'></div>
        <div>
          <img src={Company} alt='' />
          <p className='honeycomb-text'>Rolewise Permission Login</p>
        </div>
      </li>
      <li className='honeycomb-cell'>
        <div className='gradient-background'></div>
        <div>
          <img src={Files} alt='' />
          <p className='honeycomb-text'>Grade/CAS Mangement</p>
        </div>
      </li>
      <li className='honeycomb-cell'>
        <div className='gradient-background'></div>
        <div>
          <img src={Form} alt='' />
          <p className='honeycomb-text'>Subject Management</p>
        </div>
      </li>
      <li className='honeycomb-cell'>
        <div className='gradient-background'></div>
        <div>
          <img src={GradeSheet} alt='' />
          <p className='honeycomb-text'>Grade/CAS management</p>
        </div>
      </li>
      <li className='honeycomb-cell'>
        <div className='gradient-background'></div>
        <div>
          <img src={Info} alt='' />
          <p className='honeycomb-text'>Notice Managment</p>
        </div>
      </li>
      {/* <li className='honeycomb-cell'>
        <div className='gradient-background'></div>
        <div>
          <img src={Meeting} alt='' />
          <p className='honeycomb-text'>Employee Information System</p>
        </div>
      </li> */}
    </ul>
  );
};

export default HonyComb;
