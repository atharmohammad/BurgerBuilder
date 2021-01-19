import React from 'react'
import Button from '../../UI/Button/Button.js'

const OrderSummary = (props)=>{
  let count = 0;
  const order = props.ingredients.map((p,key,index)=>{
    return (
      <h4 key={count++}><li>{p.value} : x {p.count}</li></h4>
    );
  })

  return (
    <div>
      <h3>Your Burger has all these Delicious Ingredients !</h3>
      <ul>
        {order};
      </ul>

      <h3> This Delicious Burger is just ₹ {props.cost} only !!</h3>
      <Button clicked={props.clickedconfirm}
      Type='Success'>Confirm</Button>
      <Button clicked={props.clickedcancel}
      Type='Danger'>Cancel</Button>
    </div>
  );
};

export default OrderSummary;
