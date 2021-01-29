import React,{Component} from 'react'
import Layout from './components/Layout/Layout.js'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js'
import {BrowserRouter,Route} from 'react-router-dom'
import Checkout from './components/Order/Checkout/Checkout'
import Orders from './components/Order/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
class App extends Component {
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

export default App;
