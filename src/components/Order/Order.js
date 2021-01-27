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
      <p><strong>Name</strong> : {props.name} </p>
      <p><strong>Address </strong>: {props.address}</p>
      <p><strong>Country</strong> : {props.country}</p>
      <p><strong>Delivery</strong> : {props.delivery}</p>

      <h3>Ingredients :</h3>
        <ul>
          {ingredients}
        </ul>
        <div className={classes.price}>
        <strong>  Price : </strong>₹ {props.price}
        </div>
        <p><strong>Contact</strong> : {props.Phone}</p>
    </div>
  );
}

export default order;
