import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from '../../actionTypes/types';
import { loginUser } from '../../services/services';

// ACTION GENERATORS
export const setLoginSuccess = (profile) => ({
    type: LOGIN_SUCCESS,
    profile
});

export const setLoginError = (loginError) => ({
    type: LOGIN_ERROR,
    loginError
});

export const setLogoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

// THUNK ACTIONS 
export const login = (username, password) => dispatch => 
loginUser(username, password)
        .then(profile => {
            dispatch(setLoginSuccess(profile))
            return Promise.resolve(profile);
        })
        .catch(err => {
            dispatch(setLoginError(err))
            return Promise.reject(err);
        })


export const logout = () => dispatch => {
    dispatch(setLogoutSuccess());
    return Promise.resolve(true);
}