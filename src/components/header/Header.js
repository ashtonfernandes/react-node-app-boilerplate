import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { logout } from '../login/loginActions';
import { setLocale } from './localeActions';
import { isLoggedIn } from '../login/loginReducer';
import './Header.css';

const companyLogo = require('../../assets/icons/logo.png');

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => {
        if (localStorage.getItem('lang') && localStorage.getItem('lang') === 'en') {
                this.setState({ activeLanguageEnglish: true, activeLanguageFrench: false})
        } else {
            this.setState({ activeLanguageFrench: true, activeLanguageEnglish: false })
        }
    }

    logout = () => {
        this.setState({
            logoutNow: true
        });
    }

    closeLogout = () => {
        this.setState({
            logoutNow: false
        });
    }

    changeLocale = (language) => {
        this.props.setLocale(language);
        if (language && language === 'en') {
            this.setState({ activeLanguageEnglish: true, activeLanguageFrench: false})
        }

        else {
            this.setState({ activeLanguageFrench: true, activeLanguageEnglish: false })
        }
    }

    render() {
        const { logoutNow, activeLanguageEnglish, activeLanguageFrench } = this.state;
        // const { isLoggedIn } = this.props;
        return (
            <div className="header-container">
                <a href="/">
                    <img
                        alt="logo"
                        className="company-logo"
                        src={companyLogo}
                    />
                </a>
                <div className="header-right">
                    <div className="language-picker">
                        <div className={ activeLanguageEnglish ? 'active-language': null } role="button" tabIndex="0" onKeyPress={() => this.changeLocale('en')} onClick={() => this.changeLocale('en')}>EN</div>
                        <div className={ activeLanguageFrench ? 'active-language': null } role="button" tabIndex="1" onKeyPress={() => this.changeLocale('fr')} onClick={() => this.changeLocale('fr')}>FR</div>
                    </div>

                    {this.props.isLoggedIn ?
                        <div className="sign-out" role="button" tabIndex="0" onKeyPress={this.logout} onClick={this.logout}>
                            <FormattedMessage id="header.sign_out" defaultMessage="Sign Out"/>
                        </div>
                        :
                        <div>
                            <FormattedMessage id="header.name" defaultMessage="React Boilerplate"/>
                        </div>
                    }
                </div>
                {logoutNow && 
                    <div className="logout-container">
                        <div className="logout-container-title"><FormattedMessage id="header.confirmation" defaultMessage="Are you sure you want to logout?"/></div>
                        <div>
                            <button type="submit" className="logout-container-button" onClick={this.closeLogout}>No</button>
                            <a href="/"><button type="submit" onClick={this.props.logout} className="logout-container-button">Yes</button></a>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Header.propTypes = {
    // isLoggedIn: PropTypes.func.isRequired,
    // setLocale: PropTypes.func.isRequired,
    // logout: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isLoggedIn: isLoggedIn(state)
});

export default connect(mapStateToProps, { logout, setLocale })(Header);
