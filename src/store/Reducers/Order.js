import * as actionType from '../actions/actionType';

const initialState = {
  orders:[],
  error:null,
  Loading:true
}

const reducer=(state=initialState,action)=>{
  switch(action.type){
    case(actionType.FETCH_ORDERS_SUCCESS):{
      return{
        ...state,
        orders:action.orders,
        error:null,
        Loading:false
      }
    }

    case(actionType.FETCH_ORDER_FAIL):{
      return{
        ...state,
        error:action.error,
        Loading:false
      }
    }

    default:return state;

  }
}

export default reducer;
