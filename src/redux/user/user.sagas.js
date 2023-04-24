import {takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {auth, googleProvider, createUserProfile} from '../../firebase/firebase.util';

export function* signInWithGoogle(){
try{
const userRef = yield auth.signInWithPopup(googleProvider);
console.log(userRef);
}catch(err){

}
}

export function* onGoogleSignInStart(){
yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START); 
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart)]);
}