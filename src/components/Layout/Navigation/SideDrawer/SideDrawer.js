import React from 'react';

import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../../Backdrop/Backdrop';
import Aux from '../../../../hoc/Auxillary'

const SideDrawer = (props)=>{
  let assignedClass = [];
  if(props.show){
    assignedClass = [classes.SideDrawer , classes.Open];
  }
  else{
    assignedClass = [classes.SideDrawer , classes.Close];
  }
  return (
    <Aux>
      <Backdrop clicked={props.close} show={props.show}/>
      <div className={assignedClass.join(' ')}  onClick={props.close}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
}

export default SideDrawer;
