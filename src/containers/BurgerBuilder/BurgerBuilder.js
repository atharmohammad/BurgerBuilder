import React,{PureComponent} from 'react'
import Burger from '../../components/Burger/Burger.js'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls.js'
import Modals from '../../components/UI/Modal/Modal.js'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/Auxillary'
import {connect} from 'react-redux'
import * as actionType from '../../store/action';


const index ={
  'salad' : 0,
  'cheese': 1,
  'bacon' : 2,
  'meat'  : 3
};

const prices = {
  'salad' : 5,
  'cheese': 10,
  'bacon' : 15,
  'meat'  : 25
}

class BurgerBuilder extends PureComponent{
  state = {
    // ingredients:[
    //   {value:'salad',count:0},
    //   {value:'cheese',count:0},
    //   {value:'bacon',count:0},
    //   {value:'meat',count:0},
    // ]
    show:true,
    order:false,
    // Loading:false,
    error:false
  }

  // componentDidMount(){
  //   axios.get('https://burger-builder-react-92bac-default-rtdb.firebaseio.com/ingredients.json')
  //       .then(response=>{
  //         this.setState({ingredients:response.data});
  //       })
  //       .catch(error =>{
  //         this.setState({
  //           error:true
  //         });
  //       });
  // }

  // AddIngredients = (type)=>{
  //   const obj = [
  //     ...this.state.ingredients
  //   ];
  //   const oldcount = obj[index[type]].count;
  //   const newcount = oldcount + 1;
  //   obj[index[type]].count = newcount;
  //   const oldprice = this.state.price;
  //   const newprice = oldprice + prices[type];
  //   this.setState({
  //     ingredients:obj , price:newprice
  //   });
  //
  //   this.updateOrder(newprice);
  //
  // }

  // removeIngredients = (type)=>{
  //   const obj = [
  //     ...this.state.ingredients
  //   ];
  //   const oldcount = obj[index[type]].count;
  //   let newcount = oldcount;
  //   let newprice = 0;
  //
  //   if(oldcount !== 0)
  //     newcount = oldcount - 1;
  //
  //   obj[index[type]].count = newcount;
  //
  //   for(let i = 0; i<obj.length ; i++){
  //     newprice += prices[obj[i].value]*obj[i].count;
  //   }
  //   newprice += 30;
  //
  //   this.setState({
  //     ingredients:obj , price:newprice
  //   });
  //
  //   this.updateOrder(newprice);
  // }

  // updateOrder = (price)=>{
  //   if(price > 30){
  //     this.setState({
  //       show:false
  //     });
  //   }
  //   else{
  //     this.setState({
  //       show:true
  //     });
  //   }
  // }

  showbill = ()=>{
    this.setState({
      order:true
    });
  }

  cancelBill = ()=>{
    this.setState({
      order:false
    });
  }

  confimOrder=()=>{
    //
    // const queryparams = [];
    // for(let i = 0 ; i<this.props.ingredients.length; i++){
    //   queryparams.push(encodeURIComponent((this.props.ingredients[i].value)) + '=' + encodeURIComponent((this.props.ingredients[i].count)));
    // };
    // queryparams.push('price='+this.state.price);
    // const queryString = queryparams.join('&');
    this.props.history.push({
      pathname:'/checkout',
      // search:'?'+ queryString
    });

  }

  render(){
    // console.log(this.state.price);
    let disabledinfo = [];
    for(let i = 0; i<this.props.ingredients.length ; i++){
      if(this.props.ingredients[i].count === 0){
        disabledinfo.push(true);
      }
      else {
        disabledinfo.push(false);
      }
    }
    // console.log(disabledinfo);



    let ordersummary = null;
    let burger = this.state.error ? <p>Something Went Wrong ! Please Try Again After Sometime ! </p> : <Spinner />;

    if(this.props.ingredients.length > 0){
      burger = (
         <Aux>
            <Burger ingredients={this.props.ingredients}/>
            <BurgerControls add={this.props.AddIngredients}
            del={this.props.removeIngredients}
            Disabledinfo = {disabledinfo}
            cost={this.props.price}
            order={!this.props.show}
            bill={this.showbill}/>
          </Aux>
        );

        ordersummary = (
          <OrderSummary cost={this.props.price}
          clickedcancel={this.cancelBill}
          clickedconfirm={this.confimOrder}
          ingredients={this.props.ingredients}/>
        );
    }

    if(this.state.Loading){
      ordersummary = <Spinner />;
    }

    return (
      <div>
        <Modals show={this.state.order} cancelBill={this.cancelBill} >
          {ordersummary}
        </Modals>
        {burger}

      </div>
    );
  }
};

const mapStatetoProps=state=>{
  return {
    ingredients : state.ingredients,
    price:state.price,
    show:state.show
  }
};

const mapDispatchtoProps=dispatch=>{
  return{
    AddIngredients:(type)=>dispatch({type:actionType.ADDINGREDIENT,ingredientName:type}),
    removeIngredients:(type)=>dispatch({type:actionType.REMOVEINGREDIENT,ingredientName:type})
  }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(BurgerBuilder,axios));
