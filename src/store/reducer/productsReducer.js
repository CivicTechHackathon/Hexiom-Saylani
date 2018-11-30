import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    PRODUCTS : null,
    ALLPRODUCTS: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.PRODUCTS:
            return ({
                ...states,
                PRODUCTS: action.payload
            })
            case actionTypes.ALLPRODUCTS:
            return ({
                ...states,
                ALLPRODUCTS: action.payload
            })
        default:
            return states;
    }
}