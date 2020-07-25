import firebaseAuth from '../../api/firebaseAuth'
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';



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
      console.log(resData);
      dispatch({ 
        type: SIGNUP,
        token: action.token,
        userId: action.userId,
       });
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
      console.log(resData);
      dispatch({ 
        type: SIGNIN,
        token: resData.idToken,
        userId: resData.localId });
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


