import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const index ={
  'salad' : 0,
  'cheese': 1,
  'bacon' : 2,
  'meat'  : 3
};

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
    <h3>Current Cost : ₹ {props.cost}</h3>
      {controls.map((cntrl)=>{
        return(
          <BuildControl label={cntrl.label} key={cntrl.label}
          add={()=>props.add(cntrl.type)}
          remove={()=>props.del(cntrl.type)}
          Disabledinfo={props.Disabledinfo[index[cntrl.type]]}/>
        );
      })}
      <button className={classes.OrderButton}
      onClick={props.bill}
      disabled={props.order}>ORDER NOW!</button>
    </div>
  );
};

export default buildControls;
