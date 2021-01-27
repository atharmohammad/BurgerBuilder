import React,{Component} from 'react';
import Order from '../Order';
import axios from '../../../axios-order.js'
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component{
  state={
    Loading:true,
    orders:[]
  }

  componentDidMount=()=>{
    axios.get('/orders.json')
      .then(res=>{
        // console.log(res.data);
        const fetched_order = [];
        for(let key in res.data){
            fetched_order.push({
              ...res.data[key],
              id:key
            });
          console.log(fetched_order);
        };
        this.setState({
          orders:fetched_order,
          Loading:false
        });
      })
      .catch(err=>{
        this.setState({Loading:false});
      })
  }

  render(){

    let orders = <Spinner/>

    if(!this.state.Loading){
      orders = this.state.orders.map(val=>{
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

export default withErrorHandler(Orders,axios);
