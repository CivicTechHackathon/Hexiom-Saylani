import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    CURRENTUSER: null,
    CURRENTUSERUID: null,
    SLIDER: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CURRENTUSER:
            return ({
                ...states,
                CURRENTUSER: action.payload
            })
        case actionTypes.CURRENTUSERUID:
            return ({
                ...states,
                CURRENTUSERUID: action.payload
            })
        case actionTypes.SLIDER:
            return ({
                ...states,
                SLIDER: action.payload
            })
        default:
            return states;
    }
}