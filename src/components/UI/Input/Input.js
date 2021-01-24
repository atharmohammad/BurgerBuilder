import React from 'react';
import classes from './Input.module.css'

const input = (props)=>{

  let InputElement = null;
  const InputClasses = [classes.InputElement];
  if(props.Invalid&&props.shouldValidate&&props.touched){
    InputClasses.push(classes.Invalid);
  }

  switch(props.elementType){
    case ('input'): InputElement = <input
      onChange={props.changed}
      className={InputClasses.join(' ')}
     {...props.elementConfig} value={props.value} />
      break;
    case('textarea'):InputElement = <textarea
    onChange={props.changed}
    className={InputClasses.join(' ')}
     {...props.elementConfig} value={props.value} />
      break;

    case ('select'): InputElement = (
      <select onChange={props.changed}
      className={InputClasses.join(' ')}
      value={props.value}>
      {props.elementConfig.options.map(op=>{
        return(
          <option key={op.value} value={op.value}>
            {op.displayValue}
          </option>
        );
      })}
     </select>
     )
      break;

    default:InputElement = <input
      onChange={props.changed}
      className={InputClasses.join(' ')}
     {...props.elementConfig} value={props.value} />
  }

  return (
    <div className={classes.Input}>
      <label className={classes.label}>{props.label}</label>
        {InputElement}
    </div>
  );
}

export default input;
