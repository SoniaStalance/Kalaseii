//racfp
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
const Alert = ({ alerts }) => alerts != null && alerts.length > 0 && alerts.map(alert => (
    //jsx - Javascript XML used to write HTML in React
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        { alert.msg }
    </div>
));

Alert.propTypes = {
    //ptar
    alerts: PropTypes.array.isRequired
}
//mapping a redux state to a prop
//here, the array of alerts
const mapStateToProps = state => ({
    //refer root reducers i.e. index.js
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);