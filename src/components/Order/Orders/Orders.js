import React,{Component} from 'react';
import Order from '../Order';
import axios from '../../../axios-order.js'
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actionCreator from '../../../store/index'
import {Redirect} from 'react-router-dom'

class Orders extends Component{

  componentDidMount=()=>{
    this.props.FetchOrders(this.props.token);
  }

  render(){

    let orders = <Spinner/>

    if(this.props.token == null){
      return(<Redirect to='/authentication'/>);
    }

    if(this.props.error){
      orders = <p>There is Something Wrong !Try Again Later</p>;
    }

    if(!this.props.Loading){
      orders = this.props.orders.map(val=>{
        return(
            <Order key={val.id} ingredients={val.Ingredients}
                    name={val.orderData.name}
                    address={val.orderData.address}
                     price={val.price}
                      country={val.orderData.country} Phone={val.orderData.Phone}
                       delivery={val.orderData.deliveryMode} />
        );
      });
    }

      return(
        <div>
          {orders}
        </div>

      );
  }
}

const mapStateToProps = (state)=>{
  return{
    orders:state.ord.orders,
    error:state.ord.error,
    Loading:state.ord.Loading,
    token:state.auth.token
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    FetchOrders : (token)=>dispatch(actionCreator.fetchOrder(token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
