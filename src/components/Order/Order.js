import React from 'react';
import classes from './Order.module.css';
const order = (props)=>{
  let ind = 0;
  let ingredients = props.ingredients.map(ing=>{
    return(
      <p className={classes.ingredients} key={ind++}>{ing.value} ({ing.count})</p>
    );
  });

  return(
    <div className={classes.Order}>
      <p><strong>Name : {props.name} </strong></p>
      <p><strong>Address : {props.address.street} {props.address.pincode}</strong></p>
      <h3>Ingredients :</h3>
        <ul>
          {ingredients}
        </ul>
        <div className={classes.price}>
          Price : <strong>₹ {props.price}</strong>
        </div>
    </div>
  );
}

export default order;
