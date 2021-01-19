import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return (
    <div className={classes.BuildControl}>
        <h3 className={classes.Label}>{props.label}</h3>
        <button className={classes.More} onClick={props.add}>+</button>
        <button className={classes.Less} onClick={props.remove} disabled={props.Disabledinfo}>-</button>
    </div>
  );
};

export default buildControl;
