import React from 'react';
import BodyImg1st from '../../assets/Tasks.gif';
import BodyImg2nd from '../../assets/about-us.svg';
import DigitalSvg from '../../assets/about/digital.svg';
import SyncSvg from '../../assets/about/sync.svg';
import SystemSvg from '../../assets/about/system-update.svg';
import Blob from '../../assets/about/blob.svg';
import { Link } from 'react-router-dom';
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
        <img src={BodyImg2nd} alt='body-2nd-img' />
        <div className='body-second-details'>
          <img src={Blob} alt='blob' className='blob-svg' />
          <p>
            About us? We simply are group of enthuastic and innovative group of
            people delivering the needs of digitalization in world of
            technology.
          </p>
          <div className='about-perks'>
            <div className='digital-perk perk'>
              <img src={DigitalSvg} alt='digitalize' className='perk-svg' />
              <h5>Digitalize</h5>
              <p>
                We digitalize your educational data using modern technologies.
              </p>
            </div>
            <div className='system-perk perk'>
              <img src={SystemSvg} alt='systemize' className='perk-svg' />
              <h5>Systemize</h5>
              <p>
                We mange your educational data systematically eradicating old
                process.
              </p>
            </div>
            <div className='sync-perk perk'>
              <img src={SyncSvg} alt='syncronize' className='perk-svg' />
              <h5>Synchronize</h5>
              <p>
                We have offline and online features synchornizing in real-time
                with our data servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
