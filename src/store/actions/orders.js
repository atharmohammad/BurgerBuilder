import * as actionType from './actionType';
import axios from '../../axios-order.js'

const getOrder = (orders)=>{
  return {
    type:actionType.FETCH_ORDERS_SUCCESS,
    orders:orders
  }
}

export const fetchOrder = (token,userId)=>{
  return dispatch =>{
    const queryparams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId + '"';
    axios.get('/orders.json' + queryparams)
      .then(res=>{
        // console.log(res.data);
        const fetched_order = [];
        for(let key in res.data){
            fetched_order.push({
              ...res.data[key],
              id:key
            });
          // console.log(fetched_order);
        };
        dispatch(getOrder(fetched_order));
      })
      .catch(err=>{
        dispatch({type:actionType.FETCH_ORDER_FAIL,error:err});
      })
  }
}
