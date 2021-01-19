import React,{Component} from 'react'
import Aux from '../../hoc/Auxillary.js'
import Toolbar from './Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from './Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
  state = {
    showside:false,
  }

  closeSideDrawer = ()=>{
    this.setState({
      showside:false
    });
  }

  toggleSideDrawer = ()=>{
    let temp;
    if(this.state.showside === false)
      temp = true;
    else
      temp = false;

    this.setState({
      showside:temp
    });
  }
  render(){
    return (
      <Aux>
        <SideDrawer
         close={this.closeSideDrawer} show={this.state.showside}/>
        <Toolbar toggle={this.toggleSideDrawer}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
