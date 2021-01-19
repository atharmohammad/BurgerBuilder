import React,{Component}from 'react'
import classes from './Modals.module.css'
import Backdrop from '../../Backdrop/Backdrop.js'
import Aux from '../../../hoc/Auxillary'
class modals extends Component {
  // console.log(props.show);
  shouldComponentUpdate = (nextProps , nextState)=>{
    //We only update OrderSummary which is wrapped in modal only when we show it on modal
    return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
  }
  render (){
    // console.log('Updated');
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.cancelBill}/>
        <div style={{
          transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity:this.props.show ? '1' : '0'
        }}
        className={classes.modals}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
};

export default modals;
