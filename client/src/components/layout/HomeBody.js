import React from 'react';
import BodyImg1st from '../../assets/Tasks.gif';
import BodyImg2nd from '../../assets/about-us.svg';
import DigitalSvg from '../../assets/about/digital.svg';
import SyncSvg from '../../assets/about/sync.svg';
import SystemSvg from '../../assets/about/system-update.svg';
import Blob from '../../assets/about/blob.svg';
import { Button, Container } from 'react-bootstrap';

const HomeBody = () => {
  return (
    <div className='body-container'>
      <div className='body-first-part'>
        <div className='body-first-details'>
          <h2>
            Make Your <span style={{ color: '#992b3e' }}>School</span>{' '}
            <span style={{ color: '#13578b' }}>Management</span> System Easy?
          </h2>
          <p
            style={{
              fontSize: '1rem',
              marginBottom: '1rem',
              letterSpacing: '0px',
              marginTop: '1rem',
            }}
          >
            You are at right place. We are here to offer you the best school
            management web app to meet your requirements.
          </p>
          <Container
            style={{
              display: 'flex',
              gap: '1rem',
              paddingTop: '0.5rem',
              paddingLeft: '0',
            }}
            fluid
          >
            <Button
              className='btn-login'
              style={{
                borderRadius: '25px',
                letterSpacing: '4px',
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              Register
            </Button>
          </Container>
        </div>
        <img
          src={BodyImg1st}
          alt='product-teardown'
          className='body-first-img'
        />
      </div>
      <div className='body-second-part'>
        <img src={Blob} alt='blob' className='blob-svg' />
        <img src={BodyImg2nd} alt='body-2nd-img' />
        <div className='body-second-details'>
          <h2 className='about-us-header'>About us</h2>
          <p>
            About us? We simply are group of enthuastic and innovative group of
            people delivering the needs of digitalization in world of
            technology.
          </p>
          <div className='about-perks'>
            <div className='digital-perk perk'>
              <div className='gradient-hover'></div>
              <img src={DigitalSvg} alt='digitalize' className='perk-svg' />
              <h5 className='perk-header'>Digitalize</h5>
              <p className='perk-text'>
                We digitalize your educational data using modern technologies.
              </p>
            </div>
            <div className='system-perk perk'>
              <div className='gradient-hover'></div>
              <img src={SystemSvg} alt='systemize' className='perk-svg' />
              <h5 className='perk-header'>Systemize</h5>
              <p className='perk-text'>
                We mange your educational data systematically eradicating old
                process.
              </p>
            </div>
            <div className='sync-perk perk'>
              <div className='gradient-hover'></div>
              <img src={SyncSvg} alt='syncronize' className='perk-svg' />
              <h5 className='perk-header'>Synchronize</h5>
              <p className='perk-text'>
                We have offline and online features synchornizing in real-time
                with our data servers.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='body-third-part'>
        <div className='sms-text'>
          <h2>School Mangement System (SMS)</h2>
          <p>Say Goodbye to all the papers.</p>
          <p>
            School Management System, a delightful product of Digital Nepal aims
            to bridge the information gaps that may exist between the School
            Management, Teachers, Students and the Parents. This software can be
            a sanctification for the effective management of the overall
            operations of your educational institution. This enthralling
            software can be used for updating the information of the students,
            mining, storing and instant access, centralizing and controlling the
            activities of the whole school. With the use of this software, you
            can control and mine the overall information of the students and
            report them to their parents and also store that information for the
            future references.
          </p>
        </div>
        <div className='sms-honeycomb'>
          <ul id='hexGrid'>
            <li className='hex-shape'></li>
            <li className='hex-shape'></li>
            <li className='hex-shape'></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
