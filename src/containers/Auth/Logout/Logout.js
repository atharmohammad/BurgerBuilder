import React , {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionCreator from '../../../store/index';

class Logout extends Component {

  componentDidMount(){
    this.props.onLogout();
  }

  render(){
    return(
      <Redirect to='/authentication'/>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onLogout : ()=>dispatch(actionCreator.logout())
  }
}

export default connect(null,mapDispatchToProps)(Logout);
