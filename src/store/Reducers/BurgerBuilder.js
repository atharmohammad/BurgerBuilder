import * as actionType from '../actions/actionType.js';
const index ={
  'salad' : 0,
  'cheese': 1,
  'bacon' : 2,
  'meat'  : 3
};

const prices = {
  'salad' : 5,
  'cheese': 10,
  'bacon' : 15,
  'meat'  : 25
};


const initialState = {
  ingredients:[],
  price:30,
  show:false,
  error:false,
  building:false,
};
//action.ingredientIndex = ingredient array index
const reducer = (state=initialState,action)=>{
  switch(action.type){
    case (actionType.ADDINGREDIENT):{
      const ingredients = [...state.ingredients];
      const ingr = {...state.ingredients[index[action.ingredientName]]};
      ingr.count += 1;
      ingredients[index[action.ingredientName]] = ingr;
      const price = state.price + prices[action.ingredientName];

      let show = false;
      if(price > 30){
        show = true;
      }
      return(
        {
          ...state,
          ingredients:ingredients,
          price:state.price + prices[action.ingredientName],
          show:show,
          building:true
        }
      );
    }

    case(actionType.REMOVEINGREDIENT):{
      const ingredients = [...state.ingredients];
      const ingr = {...state.ingredients[index[action.ingredientName]]};
      ingr.count -= 1;
      ingredients[index[action.ingredientName]] = ingr;
      const price =state.price - prices[action.ingredientName];
      let show = true;
      if(price <= 30){
        show = false;
      }

      return(
        {
          ...state,
          ingredients:ingredients,
          price:price,
          show:show,
          building:true
        }
      );
    }

    case (actionType.INIT_INGREDIENTS):{
      return{
        ...state,
        ingredients:action.ingredients,
        price:30,
        error:false,
        show:false,
        building:false
      }
    }

    case (actionType.FETCH_INGREDIENTS_ERROR):{
      return{
        ...state,
        error:true
      }
    }

    default:
      return state;

  }
}

export default reducer;
