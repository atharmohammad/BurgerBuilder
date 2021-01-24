import React,{Component} from 'react';
import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import Contact from './Contact/Contact';
import {connect} from 'react-redux';

class Checkout extends Component{

  // componentWillMount=()=>{
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients=[];
  //   let price = 30;
  //   for(let param of query.entries()){
  //     if(param[0] !== 'price'){
  //       ingredients.push({value:param[0],count:+param[1]});
  //     }
  //     else{
  //       price=param[1];
  //     }
  //   };
  //   this.setState({
  //     ingredients:ingredients,
  //     price:price
  //   });
  //   // console.log(ingredients);
  // }

    cancelHandler=()=>{
      this.props.history.goBack();
    }

    confirmHandler=()=>{
      this.props.history.replace('/checkout/contact-data');
    }


  render(){
    return (
      <div>
        <CheckoutSummary
          confirm={this.confirmHandler}
          cancel={this.cancelHandler}
         ingredients={this.props.ingredients}/>
         <Route path={this.props.match.path + '/contact-data'}
          component={Contact}/>
       </div>
    );
  }
}

const mapStatetoProps=(state)=>{
  return(
      {
        ingredients:state.ingredients,
        price : state.price
    }
  );
};

export default connect(mapStatetoProps)(Checkout);
