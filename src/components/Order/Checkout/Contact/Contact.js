import React ,{Component} from 'react';
import Button from '../../../UI/Button/Button';
import classes from './Contact.module.css';
import axios from '../../../../axios-order'
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';
import {connect} from 'react-redux';

class Contact extends Component{
  state={
    orderform:{
        name:{
          elementType:'input',
          elementConfig:{
            type:'text',
            placeholder:'Your Name'
          },
          valid:false,
          validation:{
            required:false,
            maxLength:150,
            minLength:4
          },
          touched:false,
          value:'',
        },

        address:{
          elementType:'input',
          elementConfig:{
            type:'text',
            placeholder:'Destination Adress'
          },
          valid:false,
          validation:{
            required:false,
            maxLength:450,
            minLength:5
          },
          touched:false,
          value:'',

        },

        country:{
          elementType:'input',
          elementConfig:{
            type:'text',
            placeholder:'Country'
          },
          valid:false,
          validation:{
            required:false,
            maxLength:150,
            minLength:2
          },
          touched:false,
          value:'',
        },

        email:{
          elementType:'input',
          elementConfig:{
            type:'text',
            placeholder:'Your Email'
          },
          valid:false,
          validation:{
            required:false,
            maxLength:150,
            minLength:8
          },
          touched:false,
          value:'',

        },

        Phone:{
          elementType:'input',
          elementConfig:{
            type:'text',
            placeholder:'Contact Number',
          },
          valid:false,
          validation:{
            required:false,
            maxLength:12,
            minLength:10
          },
          touched:false,
          value:'',

        },

        deliveryMode:{
          elementType:'select',
          elementConfig:{
            options:[
              {value:'fastest', displayValue:'Fastest'},
              {value:'normal', displayValue:'Normal'},
            ]
           },
          value:'fastest',
          valid:true,
          validation:{},
        }
      },
    Loading:false,
    invalidform:true
  }

  placeOrderHandler=(event)=>{
      event.preventDefault();
      this.setState({
        Loading:true
      });

      let orderData={};
      for(let formElement in this.state.orderform){
        orderData[formElement] = this.state.orderform[formElement].value;
      }
      const order = {
        Ingredients : this.props.ingredients,
        price: this.props.price,
        orderData:orderData
      };

      axios.post('/orders.json?auth='+this.props.token,order)
        .then(response=>{
          this.setState({
            Loading:false,
          });
        })
        .catch(error=>{
          this.setState({
            Loading:false,
          });
        });

        this.props.history.replace('/');
  }

  checkValidity=(value,rules)=>{
    let isvalid = true;
    if(rules.required){
      isvalid = (value!== '');
    }
    if(rules.minLength){
      isvalid = (value.length < rules.minLength)?false:isvalid;
    }

    if(rules.maxLength){
      isvalid = (value.length > rules.maxLength)?false:isvalid;
    }

    return isvalid;

  }

  inputChangedHandler=(event,inputIdentifier)=>{
    const updatedForm = {...this.state.orderform};
    const formElements = {...updatedForm[inputIdentifier]};
    formElements.value = event.target.value;
    formElements.valid = this.checkValidity(formElements.value,formElements.validation);
    formElements.touched = true;
    updatedForm[inputIdentifier] = formElements;

    let invalidform = false;
    for(let key in updatedForm){
      invalidform = updatedForm[key].valid==false?true:invalidform;
    }

    this.setState({
      orderform:updatedForm,
      invalidform:invalidform
    });

  }



  render(){

    const formarray = [];
    for(let key in this.state.orderform){
      formarray.push({
        id:key,
        config:this.state.orderform[key]
      });
    }

    let contact = <Spinner/>;
    if(!this.state.Loading){
      contact = (
        <form>
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
          <Button Disabled={this.state.invalidform} Type='Success' clicked={this.placeOrderHandler} >ORDER</Button>
        </form>

      );
    }
    return (
      <div className={classes.Contact}>
        <h1>Enter Your Data to Place Your Order </h1>
        {contact}
      </div>
    );
  }

}

const mapStatetoProps = state=>{
  return(
    {
      ingredients : state.ing.ingredients,
      price : state.ing.price,
      token:state.auth.token
    }
  );
}

export default connect(mapStatetoProps)(Contact);
