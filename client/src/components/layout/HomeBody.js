import React, { useEffect } from 'react';
import BodyImg1st from '../../assets/Tasks.gif';
import BodyImg2nd from '../../assets/about-us.svg';
import DigitalSvg from '../../assets/about/digital.svg';
import SyncSvg from '../../assets/about/sync.svg';
import SystemSvg from '../../assets/about/system-update.svg';
import { Button, Container, Row, Col } from 'react-bootstrap';
import HonyComb from './HonyComb.js';
import WhyUs from './WhyUs';
import { Link } from 'react-router-dom';

// animate on scroll imports
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeBody = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className='body-container'>
      <Container className='body-first-part'>
        <Row className='body-first-details-row'>
          <Col className='body-first-details-col'>
            <h2>
              Make Your <span style={{ color: '#992b3e' }}>School</span>{' '}
              <span className='management-span' style={{ color: '#13578b' }}>
                <span>Manage</span>
                <span>ment</span>
              </span>{' '}
              System Easy?
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
              className='register-btn-col'
            >
              <Link to='/register'>
                <Button
                  className='btn-gradient-bg'
                  style={{
                    borderRadius: '25px',
                    letterSpacing: '4px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                  }}
                >
                  Register
                </Button>
              </Link>
            </Container>
          </Col>
          <Col className='body-first-img-container'>
            <img
              src={BodyImg1st}
              alt='product-teardown'
              className='body-first-img'
            />
          </Col>
        </Row>
      </Container>
      <div className='body-second-part'>
        <svg
          id='svg'
          viewBox='0 0 1440 700'
          xmlns='http://www.w3.org/2000/svg'
          className='transition duration-300 ease-in-out delay-150'
          className='about-wave'
          preserveAspectRatio='none'
        >
          <defs>
            <linearGradient
              id='gradient-first'
              x1='0%'
              y1='50%'
              x2='100%'
              y2='50%'
            >
              <stop offset='5%' stopColor='#0693e3ff'></stop>
              <stop offset='95%' stopColor='#002bdcff'></stop>
            </linearGradient>
          </defs>
          <path
            d='M 0,700 C 0,700 0,350 0,350 C 143.78571428571428,421.92857142857144 287.57142857142856,493.85714285714283 410,472 C 532.4285714285714,450.14285714285717 633.5,334.5 743,307 C 852.5,279.5 970.4285714285713,340.14285714285717 1088,362 C 1205.5714285714287,383.85714285714283 1322.7857142857142,366.92857142857144 1440,350 C 1440,350 1440,700 1440,700 Z'
            stroke='none'
            strokeWidth='0'
            fill='url(#gradient-first)'
            className='transition-all duration-300 ease-in-out delay-150 path-0'
          ></path>
        </svg>
        <img
          src={BodyImg2nd}
          alt='body-2nd-img'
          data-aos='fade-right'
          className='about-us-img'
        />

        <div className='body-second-details'>
          <h2 className='about-us-header' data-aos='fade-up'>
            <span style={{ color: '#992b3e' }}>About</span>{' '}
            <span style={{ color: '#13578b' }}>us</span>
          </h2>
          <p data-aos='fade-up'>
            About us? We simply are group of enthuastic and innovative group of
            people delivering the needs of digitalization in world of
            technology.
          </p>
          <div className='about-perks'>
            <div
              className='digital-perk perk'
              data-aos='fade-up'
              data-aos-delay='10'
              data-aos-offset='150'
            >
              <div className='gradient-hover-perk'></div>
              <img src={DigitalSvg} alt='digitalize' className='perk-svg' />
              <h5 className='perk-header'>Digitalize</h5>
              <p className='perk-text'>
                We digitalize your educational data using modern technologies.
              </p>
            </div>
            <div
              className='system-perk perk'
              data-aos='fade-up'
              data-aos-delay='40'
              data-aos-offset='190'
            >
              <div className='gradient-hover-perk'></div>
              <img src={SystemSvg} alt='systemize' className='perk-svg' />
              <h5 className='perk-header'>Systemize</h5>
              <p className='perk-text'>
                We mange your educational data systematically eradicating old
                process.
              </p>
            </div>
            <div
              className='sync-perk perk'
              data-aos='fade-up'
              data-aos-delay='60'
              data-aos-offset='220'
            >
              <div className='gradient-hover-perk'></div>
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
        <svg
          id='svg'
          viewBox='0 0 1440 700'
          xmlns='http://www.w3.org/2000/svg'
          className='transition duration-300 ease-in-out delay-150'
          className='sms-wave'
          preserveAspectRatio='none'
        >
          <defs>
            <linearGradient
              id='gradient-second'
              x1='0%'
              y1='50%'
              x2='100%'
              y2='50%'
            >
              <stop offset='0%' stopColor='#002bdcff'></stop>
              <stop offset='100%' stopColor='#0693e3ff'></stop>
            </linearGradient>
          </defs>
          <path
            d='M 0,700 C 0,700 0,350 0,350 C 74.1076923076923,423.76666666666665 148.2153846153846,497.53333333333336 229,472 C 309.7846153846154,446.46666666666664 397.2461538461539,321.6333333333333 471,288 C 544.7538461538461,254.36666666666667 604.8,311.93333333333334 684,347 C 763.2,382.06666666666666 861.5538461538463,394.6333333333334 950,378 C 1038.4461538461537,361.3666666666666 1116.9846153846152,315.5333333333333 1197,306 C 1277.0153846153848,296.4666666666667 1358.5076923076924,323.23333333333335 1440,350 C 1440,350 1440,700 1440,700 Z'
            stroke='none'
            strokeWidth='0'
            fill='url(#gradient-second)'
            className='transition-all duration-300 ease-in-out delay-150 path-0'
            transform='rotate(-180 720 350)'
          ></path>
        </svg>
        <div className='body-third-part-details'>
          <h2 data-aos='fade-up'>
            <span style={{ color: '#992b3e' }}>School</span> <br />
            <span className='management-span' style={{ color: '#36cee7' }}>
              <span>Manage</span>
              <span>ment</span>
            </span>{' '}
            System (SMS)
          </h2>
          <h6 data-aos='fade-up' data-aos-delay='10'>
            Say Goodbye to all the paperworks !
          </h6>
          <p data-aos='fade-up' data-aos-delay='20'>
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
        <HonyComb />
      </div>
      <div className='body-fourth-part'>
        <WhyUs />
      </div>
    </div>
  );
};

export default HomeBody;
