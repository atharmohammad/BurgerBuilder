import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary'


const withErrorHandler = (WrappedComponent , axios)=>{

  return class extends Component{

    constructor(props){
      super(props);

        this.state={
          error:null
        };

      // this.reqinterceptor = axios.interceptors.request.use(req=>{
      //   return req;
      // });
      //
      //  this.temp = null;
      // this.resinterceptor = axios.interceptors.response.use(res=>res , error=>{
      //   this.temp = error;
      // });

    }

    componentWillMount(){
      this.reqinterceptor = axios.interceptors.request.use(req=>{
        this.setState({error:null});
        return req;
      });
      this.resinterceptor = axios.interceptors.response.use(res=>res , error=>{
        this.setState({error:error});
      });
    }

      //Here we eject the reference to interceptor when this component unmounts because
      //if we dont and there are many other component on which withErrorHandler is wrapped
      //arount then there would be many ids for interceptors will be stored which can also
      //cause memory leak,also for every request and response on that component they also
      //have to pass through interceptor of every component which is not needed.

      componentWillUnmount(){
        axios.interceptors.request.eject(this.reqinterceptor);
        axios.interceptors.response.eject(this.resinterceptor);
      }

      errorHandler=()=>{
        this.setState({
          error:null
        });
      }
      render(){
        return (
          <Aux>
            <Modal show={this.state.error} cancelBill={this.errorHandler}>
              {this.state.error != null ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Aux>
        );
      }
  }
}

export default withErrorHandler;
