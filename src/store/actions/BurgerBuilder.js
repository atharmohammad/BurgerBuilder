import * as actionType from './actionType';
import axios from '../../axios-order';

export const addIngredients = (ing)=>{
  return{
    type:actionType.ADDINGREDIENT,
    ingredientName:ing
  }
}

export const removeIngredients = (ing)=>{
  return{
    type:actionType.REMOVEINGREDIENT,
    ingredientName:ing
  }
}

export const fetchIngredients = (ing)=>{
  return{
    type:actionType.INIT_INGREDIENTS,
    ingredients:ing
  }
}

export const initIngredients = ()=>{
  return dispatch=>{
    axios.get('https://burger-builder-react-92bac-default-rtdb.firebaseio.com/ingredients.json')
         .then(response=>{
           dispatch(fetchIngredients(response.data))
         })
         .catch(error =>{
           dispatch({type:actionType.FETCH_INGREDIENTS_ERROR})
         });
  }
}
