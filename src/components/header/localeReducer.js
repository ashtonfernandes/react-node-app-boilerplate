import { LOCALE_SET } from '../../actionTypes/types';

const INITIAL_STATE = {
    lang: localStorage.getItem('lang')
};

// REDUCERS
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCALE_SET:
        localStorage.setItem('lang', action.lang);
            return {
                ...state,
                lang: action.lang
            };
        default:
            return state;
    }
};