import React from 'react';
import { Button } from 'react-bootstrap';

// redux part
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alert';

const Alert = ({ alerts, removeAlert }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      const { id, msg, alertType } = alert;
      return (
        <div key={id} className={`alert alert-${alertType}`}>
          {msg}{' '}
          <Button className='alert-btn' onClick={() => removeAlert(id)}>
            <i className='fas fa-times'></i>
          </Button>
        </div>
      );
    })
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
