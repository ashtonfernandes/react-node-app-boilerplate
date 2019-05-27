import React from 'react';
import PropTypes from 'prop-types';
import './inLineErrorMessage.css';

const InLineErrorMessage = ( error ) => 
    Object.keys(error).map((key) => <span className="in-line-error-message" key={key}>! {error.text}</span>)

InLineErrorMessage.propTypes = {
    text: PropTypes.string.isRequired
};

export default InLineErrorMessage;
