import React,{Component} from 'react'
import Layout from './components/Layout/Layout.js'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js'
import {BrowserRouter,Route,withRouter} from 'react-router-dom'
import Checkout from './components/Order/Checkout/Checkout'
import Orders from './components/Order/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actionCreator from  './store/index'
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount = ()=>{
    this.props.persistentAuthenticating();
  }

  render(){
    return(
      <BrowserRouter>
        <Layout>
          <div>
            <Route exact path='/' component={BurgerBuilder}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders} />
            <Route path='/authentication' component={Auth} />
            <Route path='/logout' component={Logout} />
          </div>
        </Layout>
      </BrowserRouter>
    );
  }
};

const mapDispatchToProps = dispatch =>{
  return{
    persistentAuthenticating : ()=>dispatch(actionCreator.persistentAuthenticating())
  }
}

export default (connect(null,mapDispatchToProps)(App));
