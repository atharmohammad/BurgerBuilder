import * as actionType from '../actions/actionType';

const initialState = {
  userId : null,
  token : null,
  Loading : false,
  error:null,
  authRedirectPath:'/',
  email:''
};

const authentication_succesfull = (state , action)=>{
  return{
    ...state,
    token:action.data.idToken,
    userId:action.data.localId,
    error:null,
    Loading:false,
    email:action.data.email
  }
};

const reducer = (state=initialState , action)=>{
  switch(action.type){
    case(actionType.AUTH_START):{
      return{
        ...state,
        Loading:true
      }
    }

    case(actionType.AUTH_SUCCESS):{
      return authentication_succesfull(state,action);
    }

    case(actionType.AUTH_FAIL):{
      return{
        ...state,
        Loading:false,
        error:action.error
      }
    }

    case(actionType.AUTH_LOGOUT):{
      return{
        ...state,
        Loading:false,
        token:null,
        userId:null,
        authRedirectPath:'/'
      }
    }

    case(actionType.SETAUTHPATH):{
      return{
        ...state,
        authRedirectPath:action.path
      }
    }

    case(actionType.PERSISTANTAUTH):{
      return{
        ...state,
        token:action.token,
        userId:action.userId,
        Loading:false,
        error:null
      }
    }

    default:return state

  }
}

export default reducer;
