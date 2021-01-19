import React,{Component} from 'react';
import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import Contact from './Contact/Contact';

class Checkout extends Component{
  state={
    ingredients:[],
    price:30,
  }

  componentWillMount=()=>{
    const query = new URLSearchParams(this.props.location.search);
    const ingredients=[];
    let price = 30;
    for(let param of query.entries()){
      if(param[0] !== 'price'){
        ingredients.push({value:param[0],count:+param[1]});
      }
      else{
        price=param[1];
      }
    };
    this.setState({
      ingredients:ingredients,
      price:price
    });
    // console.log(ingredients);
  }

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
         ingredients={this.state.ingredients}/>
         <Route path={this.props.match.path + '/contact-data'}
          render={(props)=><Contact ingredients={this.state.ingredients} price={this.state.price} {...props} />}/>
       </div>
    );
  }
}

export default Checkout;
