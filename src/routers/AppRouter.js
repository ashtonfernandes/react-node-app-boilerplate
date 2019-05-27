import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import Login from '../components/login/Login';
import Home from '../components/home/Home';
import ForgotPassword from '../components/forgotPassword/ForgotPassword';
import PageNotFound from '../components/pageNotFound/PageNotFound';
import translatedData from '../../build/locales/translatedData.json';

addLocaleData([...en, ...fr]);

const AppRouter = (props) => {

    const { lang } = props

    // Defining user's language
    const language = (lang || navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

    // Split locales with a region code
    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

    const messages = translatedData[languageWithoutRegionCode] || translatedData[language] || translatedData.en;

    return (
        <IntlProvider locale={lang} messages={messages} key={lang}>
            <div>
                <main>
                    <Header />
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" render={(props) => (
                                <Home {...props} />
                            )}/>
                            <Route path="/login" component={Login} />
                            <Route path="/reset" component={ForgotPassword} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </BrowserRouter>
                </main>
            </div>
        </IntlProvider>
    )
}

AppRouter.propTypes = {
    lang: PropTypes.string.isRequired
};


const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    lang: state.localeReducer.lang
});

export default connect(mapStateToProps, { })(AppRouter);