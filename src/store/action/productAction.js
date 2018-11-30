import swal from 'sweetalert2';
import actionTypes from '../constant/constant'
import firebase from '../../Config/Firebase/firebase';
import History from '../../History/History';

const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

export function allProduct() {
    const allproductArr = []

    return dispatch => {
        db.collection('products').get()
            .then((querySnapshot) => {
                // console.log(querySnapshot,'querysnaps')
                querySnapshot.forEach(docs => {
                    // if (docs.data().userUid === userUid) {
                    const obj = {
                        data: docs.data(),
                        key: docs.id
                    }
                    allproductArr.push(obj)
                    console.log('products Arrr*********',allproductArr)
                    dispatch({ type: actionTypes.ALLPRODUCTS, payload: allproductArr })
                    // }
                })
            })
    }
}


export function products(userUid) {
    const productArr = []
    return dispatch => {
        // console.log(userUid, 'ussserrrrrr')
        db.collection('products').get()
            .then((querySnapshot) => {
                // console.log(querySnapshot,'querysnaps')
                querySnapshot.forEach(docs => {
                    if (docs.data().userUid === userUid) {
                        const obj = {
                            data: docs.data(),
                            key: docs.id
                        }
                        productArr.push(obj)
                        console.log(productArr, 'products Arrr')
                        dispatch({ type: actionTypes.PRODUCTS, payload: productArr })
                    }
                })
            })
    }
}