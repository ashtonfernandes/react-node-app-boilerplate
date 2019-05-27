import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import InLineErrorMessage from '../inLineErrorMessage/InLineErrorMessage';
import './ForgotPassword.css';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // const errors = this.validate(this.state.username, this.state.password);
        // this.setState({ 
        //     errors,
        //     loginError: false
        // });

        // if (Object.keys(errors).length === 0) {
        //     this.props.login(this.state.username, this.state.password).then(() => {
        //         this.props.history.push("/");
        //     }, () => {
        //         this.setState({
        //             loginError: true
        //         });
        //     })
        // }
    };

    validate = (username, password) => {
        const errors = {};
        if (!username) errors.username = "Username field empty";
        if (!password) errors.password = "Password field empty";
        return errors;
    }

    render() {
        const { password, errors, loginError } = this.state;
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <div>
                    <input
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            type="password"
                            placeholder="password"
                        />
                        { errors && errors.password && <InLineErrorMessage text={errors.password} /> }
                    </div>
                    <div>
                        <input
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            type="password"
                            placeholder="confirm password"
                        />
                        { errors && errors.password && <InLineErrorMessage text={errors.password} /> }
                    </div>
                    {loginError && 
                        <div className="login-error-case">
                            <div>Passwords do not match.</div>
                        </div>
                    }
                    <div className="login-button-container">
                        <button className="login-button" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

// ForgotPassword.propTypes = {
    // login: PropTypes.func.isRequired,
    // history: PropTypes.shape({
    //     push: PropTypes.func.isRequired
    // }).isRequired,
    // isLoggedIn: PropTypes.func.isRequired
// };

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

export default connect(mapStateToProps, { })(ForgotPassword);
