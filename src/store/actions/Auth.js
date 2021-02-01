import * as actionType from './actionType';
import axios from 'axios';

const auth_start = ()=>{
  return{
    type:actionType.AUTH_START
  }
}

const auth_fail = (error)=>{
  return{
    type:actionType.AUTH_FAIL,
    error:error
  }
}

const auth_success = (data)=>{
  return{
    type:actionType.AUTH_SUCCESS,
    data:data
  }
}

export const logout = ()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return{
    type:actionType.AUTH_LOGOUT
  }
}

const auth_logout = (expirationTime)=>{
  return dispatch=>{
    setTimeout(()=>{
      dispatch(logout());
    },expirationTime*1000);
  }
}

export const authenticating = (email,password,isSignUp)=>{
  return dispatch=>{
    dispatch(auth_start());
    const authData = {
      email:email,
      password:password,
      returnSecureToken:true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4JuYHfqJAr2B-eZIqZfNflc7LWslQcaU';
    if(!isSignUp)
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4JuYHfqJAr2B-eZIqZfNflc7LWslQcaU';

    axios.post(url,authData)
      .then(response=>{
        // console.log(response.data);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        localStorage.setItem('expirationDate',expirationDate);
        dispatch(auth_success(response.data));
        dispatch(auth_logout(response.data.expiresIn));
      })
      .catch(err=>{
        // console.log(err);
        dispatch(auth_fail(err.response.data.error));
      });
  }

}

export const setAuthPath = (path)=>{
  return dispatch=>{
    dispatch({type:actionType.SETAUTHPATH,path:path});
  }
}

export const persistentAuthenticating = ()=>{
  return dispatch=>{
    const token = localStorage.getItem('token');
    if(token){
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date()){
        dispatch(logout());
      }
      else{
        const expirationTime = (expirationDate.getTime() - new Date().getTime())/1000;
        const userId = localStorage.getItem('userId');
        dispatch({type:actionType.PERSISTANTAUTH , token:token , userId:userId});
        dispatch(auth_logout(expirationTime));
      }
    }
    else{
      dispatch(logout());
    }
  }
}
