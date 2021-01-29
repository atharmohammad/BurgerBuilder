import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

const navigationItems = (props) => {
    let auth = <NavigationItem link='/authentication'>Authenticate</NavigationItem>
    let orders = null;
    if(props.token){
      auth = (<div>
                <NavigationItem link='/logout'>Logout</NavigationItem>
              </div>
            );
      orders=(
        <NavigationItem link='/orders'>Orders</NavigationItem>
      )
    }

    return(
      <ul className={classes.NavigationItems}>
          <NavigationItem link='/' exact>Burger Builder</NavigationItem>
          {orders}
          {auth}
      </ul>
    )
};

const mapStateToProps = (state)=>{
  return{
    token:state.auth.token
  }
}

export default connect(mapStateToProps)(navigationItems);
