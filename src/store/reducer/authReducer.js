import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    CURRENTUSER: null,
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CURRENTUSER:
            return ({
                ...states,
                CURRENTUSER: action.payload
            })
        default:
            return states;
    }
}