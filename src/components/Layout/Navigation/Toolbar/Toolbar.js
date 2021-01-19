import React from 'react'
import classes from './Toolbar.module.css'
import LOGO from '../../../Logo/Logo.js'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar=(props)=>(

  <div className={classes.Toolbar}>
    <DrawerToggle clicked={props.toggle} />
    <div className={classes.Logo}>
      <LOGO/>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </div>
);

export default Toolbar;
