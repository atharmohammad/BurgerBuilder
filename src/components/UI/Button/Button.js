import React from 'react'
import classes from './Button.module.css'

const button=(props)=>(
  <button
    disabled={props.Disabled}
   className={[classes.Button , classes[props.Type]].join(' ')}
  onClick={props.clicked}>{props.children}</button>
);

export default button;
