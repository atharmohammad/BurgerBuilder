import React from 'react';
import Burger from '../../../Burger/Burger';
import Button from '../../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const checkoutsummary = (props)=>{
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We Hope it Taste's Well</h1>
      <div style={{width: '100%' , margin:'auto'}}>
        <Burger ingredients = {props.ingredients}/>
      </div>
      <Button Type='Success' clicked={props.confirm}>Confirm</Button>
      <Button Type='Danger' clicked={props.cancel} >Cancel</Button>

    </div>
  );
}

export default checkoutsummary;
