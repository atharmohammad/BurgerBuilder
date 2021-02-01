import React ,{Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/index';
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../shared/validation';

class Auth extends Component{
  state={
    controls:{
        email:{
          elementType:'input',
          elementConfig:{
            type:'email',
            placeholder:'Mail Address'
          },
          valid:false,
          validation:{
            required:true,
            maxLength:150,
            minLength:6,
            isEmail:true,
            isNumeric:false
          },
          touched:false,
          value:'',
        },

        password:{
          elementType:'input',
          elementConfig:{
            type:'password',
            placeholder:'password'
          },
          valid:false,
          validation:{
            required:true,
            maxLength:450,
            minLength:8,
            isEmail:false,
            isNumeric:true
          },
          touched:false,
          value:'',

        },
      },
    isSignUp:true
  }

  componentDidMount = ()=>{
    if(!this.props.burgerBuilding && this.props.authPath === '/'){
      this.props.setAuthPath('/');
    }
  }

  signUpHandler=(event)=>{
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    const isSignUp = this.state.isSignUp;
    this.props.signUp (email,password,isSignUp);
  }

  switchAuthModeHandler = ()=>{
    this.setState(prevState=>{
      return {isSignUp : !prevState.isSignUp};
    });
  }

  inputChangedHandler=(event,inputIdentifier)=>{

    const newControls = {
      ...this.state.controls,
        [inputIdentifier]:{
          ...this.state.controls[inputIdentifier],
          value:event.target.value,
          valid:checkValidity(event.target.value,this.state.controls[inputIdentifier].validation),
          touched:true
        }
    }

    this.setState({
      controls:newControls
    })

  }



  render(){

    const formarray = [];
    for(let key in this.state.controls){
      formarray.push({
        id:key,
        config:this.state.controls[key]
      });
    }

    let auth = <Spinner/>;

    if(this.props.token){
       return <Redirect to={this.props.authPath}/>
    }

    let error = null;

    if(this.props.error)
      error = this.props.error.message;

    if(!this.props.Loading){
      auth = (
        <div>
        <form onSubmit={this.signUpHandler}>
          {
            formarray.map(f=>{
              return (
                <Input
                  key={f.id}
                  changed={(event)=>{this.inputChangedHandler(event,f.id)}}
                   elementType={f.config.elementType}
                   elementConfig={f.config.elementConfig}
                   value={f.config.value}
                   touched={f.config.touched}
                   shouldValidate={f.config.validation}
                   Invalid={!f.config.valid}
                 />
              );
            })
          }
          <Button Type='Success' >{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</Button>
        </form>
        <Button Type='Danger' clicked={this.switchAuthModeHandler} > Switch to {this.state.isSignUp ?'Sign In ': 'Sign Up' }</Button>
        </div>
      );
    }
    return (
      <div className={classes.Controls}>
        <h1>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</h1>
        {error}
        {auth}
      </div>
    );
  }

}
const mapStateToProps = state =>{
  return{
    Loading:state.auth.Loading,
    error:state.auth.error,
    token:state.auth.token,
    authPath:state.auth.authRedirectPath,
    burgerBuilding:state.ing.building
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    signUp : (email,password,isSignUp)=>dispatch(actionCreator.authenticating(email,password,isSignUp)),
    setAuthPath: (path)=>dispatch(actionCreator.setAuthPath(path))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth);
