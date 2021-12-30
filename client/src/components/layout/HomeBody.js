import React from 'react';
import BodyImg1st from '../../assets/product-teardown.svg';
import BodyImg2nd from '../../assets/about-us.svg';
import { Link } from 'react-router-dom';

const HomeBody = () => {
  return (
    <div className='body-container'>
      <div className='body-first-part'>
        <img
          src={BodyImg1st}
          alt='product-teardown'
          className='body-first-img'
        />
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
            }}
          >
            You are at right place. We are here to offer you the best school
            management web app to meet your requirements.
          </p>
          <p>Get Started ? Yes</p>
          <p>Already an user ? Login</p>
        </div>
      </div>
      <div className='body-second-part'>
        <div className='body-second-details'></div>
        <img src={BodyImg2nd} alt='body-2nd-img' />
      </div>
    </div>
  );
};

export default HomeBody;
