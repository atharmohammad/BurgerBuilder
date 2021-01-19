import React from 'react'
import BurgerIngredients from './Burgeringredients/Burgeringredients.js'
import classes from './Burger.module.css'

const Burger = (props)=>{
  const Arr = props.ingredients;
  let ingredients = [];
  for(let i = 0; i<Arr.length; i++){
    for(let x = 0; x<Arr[i].count; x++){
      ingredients.push(<BurgerIngredients type={Arr[i].value} key={i+x+Arr[i].value}/>);
    }
  }
  if(ingredients.length === 0){
    ingredients = <h3>Please Choose a ingredients!!</h3>;
  }
  return (
    <div className={classes.Burger}>
    <BurgerIngredients type='bread-top' />
      {ingredients}
    <BurgerIngredients type='bread-bottom' />
    </div>
  );
}

export default Burger;
