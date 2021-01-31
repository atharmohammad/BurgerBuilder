import React,{Component} from 'react'
import Layout from './components/Layout/Layout.js'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import Checkout from './components/Order/Checkout/Checkout'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actionCreator from  './store/index'
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent'

//Importing Orders cmponent asynchronousely as it is a large component
//No need to import smaller component lazily as it will not improve the app
const asyncOrders = asyncComponent(()=>{
  return import('./components/Order/Orders/Orders');
});

class App extends Component {

  componentDidMount = ()=>{
    this.props.persistentAuthenticating();
  }

  render(){

    let routes = (
      <Switch>
        <Route path='/authentication' component={Auth} />
        <Route exact path='/' component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )

    if(this.props.token){
      routes = (
          <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={asyncOrders} />
          <Route path='/authentication' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route exact path='/' component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
      )
    }
    return(
      <BrowserRouter>
        <Layout>
          <div>
            {routes}
          </div>
        </Layout>
      </BrowserRouter>
    );
  }
};

const mapStateToProps = state =>{
  return{
    token : state.auth.token
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    persistentAuthenticating : ()=>dispatch(actionCreator.persistentAuthenticating())
  }
}

export default (connect(mapStateToProps,mapDispatchToProps)(App));
