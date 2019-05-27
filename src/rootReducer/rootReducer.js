import { combineReducers } from 'redux';
// import user from './user';
import loginReducer from '../components/login/loginReducer';
import localeReducer from '../components/header/localeReducer';

export default combineReducers({
    loginReducer,
    localeReducer
})