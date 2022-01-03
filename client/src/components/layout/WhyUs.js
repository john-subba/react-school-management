import React from 'react';
import Digital from '../../assets/whyus/digital.svg';
import Gears from '../../assets/whyus/gears.svg';
import Sync from '../../assets/whyus/sync.svg';
import Arrow1 from '../../assets/whyus/arrow1.svg';
import Arrow2 from '../../assets/whyus/arrow2.svg';
import Arrow3 from '../../assets/whyus/arrow3.svg';
import Right from '../../assets/whyus/right.svg';
import { Container, Row, Col } from 'react-bootstrap';
import data from '../../data/whyus';

const WhyUs = () => {
  return (
    <>
      <Container style={{ marginTop: '7rem', marginBottom: '3rem' }}>
        <Row className='whyus-container'>
          <Col className='whyus-headings'>
            <h2>Why choose us?</h2>
            <h6>We provide best school management software</h6>
            <p>We help you and your education digitalize</p>

            {data.map((item) => {
              const { id, text } = item;
              return (
                <div key={id} className='whyus-details'>
                  <img src={Right} alt='' className='whyus-right' />
                  <p>{text}</p>
                </div>
              );
            })}
          </Col>
          <Col>
            <div className='whyus-icons'>
              <div className='whyus-digital'>
                <img src={Digital} alt='' className='whyus-icon' />
                <h4>Digitalize</h4>
              </div>
              <div className='whyus-arrows'>
                <img src={Arrow1} alt='' className='whyus-icon' />
                <img src={Arrow2} alt='' className='whyus-icon' />
              </div>
              <div className='whyus-gears'>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <img src={Gears} alt='' className='whyus-icon' />
                  <h4>Systemize</h4>
                </div>
                <img
                  src={Arrow3}
                  alt=''
                  className='whyus-icon'
                  style={{ marginLeft: '3rem' }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <img src={Sync} alt='' className='whyus-icon' />
                  <h4>Synchronize</h4>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WhyUs;
