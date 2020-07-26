import firebaseAuth from '../../api/firebaseAuth'
import AsyncStorage from '@react-native-community/async-storage'; 
export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = (userId, token) => {
  return{
    type: AUTHENTICATE,
    userId,
    token
  }
}


export const signup = (email, password) => {
  return async dispatch => {

    try{
      const signupData = {
        email: email,
        password: password,
        returnSecureToken: true
      }
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
        const response =  await firebaseAuth.post('/accounts:signUp?key=AIzaSyDFJynrkARTeVC0ES3wZ7hcn8y-AIX69y4', signupData, config)
        const resData = response.data
      dispatch(authenticate(resData.localId, resData.idToken));
    }catch(err){
      let errData = err.response.data;
      let message = 'Something went wrong'
      if(errData.error.message=== 'EMAIL_EXISTS'){
        message = 'This email already exists!'
      }
      throw new Error(message);
    }
  };
};


export const signin = (email, password) => {
  return async dispatch => {

    try{
      const signupData = {
        email: email,
        password: password,
        returnSecureToken: true
      } 
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
        const response =  await firebaseAuth.post('/accounts:signInWithPassword?key=AIzaSyDFJynrkARTeVC0ES3wZ7hcn8y-AIX69y4', signupData, config)
        const resData = response.data
      dispatch(authenticate(resData.localId, resData.idToken));
        const expirationDate =new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000) 
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)

    }catch(err){
      
      let errData = err.response.data;
      let message = 'Something went wrong'
      if(errData.error.message=== 'EMAIL_NOT_FOUND'){
        message = 'This email could not be found!'
      }else if(errData.error.message === 'INVALID_PASSWORD'){
        message = 'This password is not valid'
      }
      throw new Error(message)
        
    }
  };
};


const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expiryDate: expirationDate.toISOString()
  }))
}


