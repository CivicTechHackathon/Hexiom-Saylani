import swal from 'sweetalert2';
import actionTypes from '../constant/constant'
import firebase from '../../Config/Firebase/firebase';
import History from '../../History/History';
import { func } from 'prop-types';

const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

export function stateAuthChangeAction() {
    return dispatch => {
        // History.push('/')
        // swal.showLoading();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                console.log('uid*************', uid)
                dispatch({ type: actionTypes.CURRENTUSERUID, payload: uid })

                // Start Addition Work For Sign Up

                db.collection("sliderImage").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log("Image Slider*******:", doc);
                        console.log("Image Slider data*******:", doc.data());
                        dispatch({ type: actionTypes.SLIDER, payload: doc.data() })
                    })
                })

                console.log('UserUID***********', uid)
                db.collection("users").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (uid === doc.id) {
                            const data = doc.data();
                            const jsonData = JSON.stringify(data)
                            const userApproval = JSON.parse(jsonData).isApproved;
                            const role = JSON.parse(jsonData).role;

                            const userObj = JSON.parse(jsonData);
                            console.log('userObj********', userObj)
                            // dispatch({ type: actionTypes.CURRENTUSERUID, payload: doc.id })
                            dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                            // swal({
                            //     type: 'success',
                            //     title: 'Successfull!',
                            //     showConfirmButton: false,
                            //     timer: 1000
                            // })
                            // setTimeout(() => {
                            //     // History.push('/')
                            // }, 1000)

                            swal({
                                showConfirmButton: false,
                                timer: 100
                            })

                            // console.log('role*****', role)
                            // console.log('userApproval', userApproval, typeof userApproval)
                            // if (role === 'seller') {
                            //     if (userApproval === 'true') {
                            //         const userObj = JSON.parse(jsonData);
                            //         console.log('userObj********', userObj)
                            //         dispatch({ type: actionTypes.CURRENTUSERUID, payload: doc.id })
                            //         dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                            //     }
                            // }
                            // else if (role === 'buyer') {
                            //     const userObj = JSON.parse(jsonData);
                            //     console.log('userObj********', userObj)
                            //     dispatch({ type: actionTypes.CURRENTUSERUID, payload: doc.id })
                            //     dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                            //     swal({
                            //         type: 'success',
                            //         title: 'Successfull!',
                            //         showConfirmButton: false,
                            //         timer: 1000
                            //     })
                            //     setTimeout(() => {
                            //         // History.push('/')
                            //     }, 1000)
                            // }
                            // else {
                            //     swal({
                            //         timer: 100,
                            //         showConfirmButton: false
                            //     })
                            //     setTimeout(() => {
                            //         // History.push('/login')
                            //     }, 100)
                            // }
                        }
                    });
                });

            }
            // else {
            //     swal({
            //         timer: 100,
            //         showConfirmButton: false
            //     })
            //     setTimeout(() => {
            //         History.push('/login')
            //     }, 100)
            // }
        });
    }
}


export function SignupAction(userData) {
    return dispatch => {
        swal.showLoading();
        console.log('userData****', userData);
        const useruid = firebase.auth().currentUser.uid;
        db.collection("users").doc(useruid).set({
            ...userData,
            isApproved: 'false',
            signupDate: new Date().toDateString()
        })
            .then(() => {
                swal({
                    type: "success",
                    title: 'Successfull',
                    timer: 1000
                })
                setTimeout(() => {
                    History.push('/')
                }, 1000)
                console.log("Document successfully written!");
            })
            .catch((error) => {
                swal({
                    type: 'error',
                    title: error.message
                })
                console.error("Error writing document: ", error);
            });
    }
}

export function LoginAction(user) {
    return dispatch => {
        swal.showLoading();
        console.log('User****', user);
        if (user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((success) => {
                    console.log('success***', success)
                    var docRef = db.collection("users").doc(success.user.uid);
                    docRef.get().then(doc => {
                        if (doc.exists) {
                            console.log("Document data:", doc.data());
                            db.collection("users").get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    if (success.user.uid === doc.id) {
                                        const data = doc.data();
                                        const jsonData = JSON.stringify(data)
                                        const role = JSON.parse(jsonData).role
                                        const userApproval = JSON.parse(jsonData).isApproved
                                        console.log('userApproval', userApproval, typeof userApproval)

                                        const userObj = JSON.parse(jsonData);
                                        dispatch({ type: actionTypes.CURRENTUSERUID, payload: doc.id })
                                        dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                                        History.push('/')
                                    }
                                });
                            });

                        } else {
                            // doc.data() will be undefined in this case
                            History.push({
                                pathname: '/signup',
                                state: { cond1: true }
                            })
                            swal({
                                showConfirmButton: false,
                                timer: 100
                            })
                            console.log("No such document!");
                        }
                    }).catch(error => {
                        console.log("Error getting document:", error);
                    });
                })
                .catch((error) => {
                    console.log('error***', error.message)
                    swal({
                        type: 'error',
                        title: error.message,
                    })
                })

        }

        else {
            if (!user.email) {
                swal({
                    type: 'error',
                    title: 'Please enter email!',
                })
            }
            else if (user.email && !user.password) {
                swal({
                    type: 'error',
                    title: 'Please enter password',
                })
            }
        }
    }
}


export function forgotPasswordAction(email) {
    return dispatch => {
        console.log('Email Address', email)
        if (email) {

            var auth = firebase.auth();

            auth.sendPasswordResetEmail(email)
                .then((success) => {
                    // Email sent.
                    console.log('success***', success)
                    swal({
                        title: 'Check email to reset your password!',
                        timer: 1500,
                        showConfirmButton: false
                    })
                    setTimeout(() => {
                        History.push('/login')
                    }, 1500)
                })
                .catch((error) => {
                    // An error happened.
                    console.log('error***', error);
                    swal({
                        type: 'error',
                        title: error.message,
                    })
                });
        }
        else {
            swal({
                type: 'error',
                title: 'Please enter email address',
            })
        }
    }
}

// ProductForm Work

export function addProductAction(productObj, userUID) {
    return dispatch => {
        console.log(userUID)
        console.log(productObj, 'hdiuhiuh')
        swal.showLoading();
        // console.log(db.collection("products").doc(userUID))
        const addProduct = db.collection("products")
        addProduct.add(productObj)
            .then(() => {
                swal({
                    type: 'success',
                    title: 'Successfully Added',
                    timer: 1500,
                    showConfirmButton: false
                })
            })
            .catch((error) => {
                swal({
                    type: 'error',
                    title: error.message,
                })
            });
    }
}


export function editProfile(userProfile, userUID) {
    return dispatch => {
        swal.showLoading();
        db.collection("users").doc(userUID).set({ ...userProfile })
            .then(() => {
                swal({
                    type: 'success',
                    title: 'Saved!',
                    showConfirmButton: false,
                    timer: 1000
                })
                setTimeout(() => {
                    History.push('/')
                }, 1000)
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
}


export function LogoutAction() {
    return dispatch => {
        firebase.auth().signOut()
            .then(() => {
                console.log('Signed Out');
                const toast = swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000
                });

                toast({
                    type: 'success',
                    title: 'Logout successfully'
                })
                dispatch({ type: actionTypes.CURRENTUSERUID, payload: null })
                dispatch({ type: actionTypes.CURRENTUSER, payload: null })

                setTimeout(() => {
                    History.push('/')
                }, 3000);

            }, function (error) {
                console.error('Sign Out Error', error);
            })
            .catch((error) => {
                console.log('error', error.message)
            })
    }
}