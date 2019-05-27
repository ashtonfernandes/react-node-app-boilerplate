import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from '../../actionTypes/types';

const INITIAL_STATE = {
    profile: localStorage.getItem('profile'),
    loginError: false
};

export const isLoggedIn = (state) => state.loginReducer.profile && !state.loginReducer.loginError === true;

// REDUCERS
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('profile', action.profile);
            return {
                ...state,
                profile: action.profile,
                loginError: false
            };

        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.loginError
            };
        
        case LOGOUT_SUCCESS:
        localStorage.removeItem('profile');
            return {
                ...state,
                profile: false
            };

        default:
            return state;
    }
};