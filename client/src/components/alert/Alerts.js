import React from 'react';
import { Alert } from 'react-bootstrap';

// redux part
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      const { id, msg, alertType } = alert;
      return (
        <Alert variant={`${alertType}`} key={id} className='mb-0'>
          <p style={{ marginBottom: '0' }}>{msg}</p>
        </Alert>
      );
    })
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
