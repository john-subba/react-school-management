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
import Attendance from '../../assets/honeycomb/attendance.svg';
import Bus from '../../assets/honeycomb/bus.svg';
import Sms from '../../assets/honeycomb/sms.svg';

const HonyComb = () => {
  return (
    <div
      style={{
        paddingBottom: '8rem',
        height: '50%',
      }}
    >
      <ul className='honeycomb'>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#354DF4',
            }}
          ></div>
          <div className='honeycomb-details'>
            <img src={Calendar} alt='' />
            <p className='honeycomb-text'>Academic Calendar</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#007ee9',
            }}
          ></div>
          <div className='honeycomb-details'>
            <img src={Class} alt='' />
            <p className='honeycomb-text'>Grade/Class Management</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{ backgroundColor: '#008fec' }}
          ></div>
          <div>
            <img src={Company} alt='' />
            <p className='honeycomb-text'>Rolewise Permission Login</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#00b7f6',
            }}
          ></div>
          <div>
            <img src={Files} alt='' />
            <p className='honeycomb-text'>Daily Lesson Plan Mangement</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#00e6f6',
            }}
          ></div>
          <div>
            <img src={Form} alt='' />
            <p className='honeycomb-text'>Subject Management</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#0053f5',
            }}
          ></div>
          <div>
            <img src={GradeSheet} alt='' />
            <p className='honeycomb-text'>Grade/CAS management</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#0060ed',
            }}
          ></div>
          <div>
            <img src={Info} alt='' />
            <p className='honeycomb-text'>Notice Managment</p>
          </div>
        </li>
      </ul>
      <ul className='honeycomb'>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#008fec',
            }}
          ></div>
          <div>
            <img src={Meeting} alt='' />
            <p className='honeycomb-text'>Employee Information System</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#00cff9',
            }}
          ></div>
          <div className='honeycomb-details'>
            <img src={Mobile} alt='' />
            <p className='honeycomb-text'>Leave Approval System</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#002dff',
            }}
          ></div>
          <div>
            <img src={Money} alt='' />
            <p className='honeycomb-text'>Banking Transaction Facilities</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#0043fb',
            }}
          ></div>
          <div className='honeycomb-details'>
            <img src={StudentReading} alt='' />
            <p className='honeycomb-text'>Student Management system</p>
          </div>
        </li>
      </ul>
      <ul className='honeycomb'>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#009eec',
            }}
          ></div>
          <div>
            <img src={Attendance} alt='' />
            <p className='honeycomb-text'>E-Attendance System</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#0BB8FA',
            }}
          ></div>
          <div>
            <img src={Website} alt='' />
            <p className='honeycomb-text'>Addmission Portal</p>
          </div>
        </li>
        <li className='honeycomb-cell'>
          <div
            className='honeycomb-background'
            style={{
              backgroundColor: '#1F87EB',
            }}
          ></div>
          <div>
            <img src={Bus} alt='' />
            <p className='honeycomb-text'>Transportation System</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HonyComb;
