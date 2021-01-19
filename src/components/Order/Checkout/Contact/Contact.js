import React ,{Component} from 'react';
import Button from '../../../UI/Button/Button';
import classes from './Contact.module.css';
import axios from '../../../../axios-order'
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';
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
            required:false
          },
          value:''
        },

        address:{
          elementType:'input',
          elementConfig:{
            type:'text',
            placeholder:'Destination Adress'
          },
          value:'',
          valid:false,
          validation:{
            required:false
          }
        },

        country:{
          elementType:'input',
          elementConfig:{
            type:'text',
            placeholder:'Country'
          },
          value:'',
          valid:false,
          validation:{
            required:false
          }
        },

        email:{
          elementType:'input',
          elementConfig:{
            type:'text',
            placeholder:'Your Email'
          },
          value:'',
          valid:false,
          validation:{
            required:false
          }
        },

        Phone:{
          elementType:'input',
          elementConfig:{
            type:'text',
            placeholder:'Contact Number'
          },
          value:'',
          valid:false,
          validation:{
            required:false
          }
        },

        deliveryMode:{
          elementType:'select',
          elementConfig:{
            options:[
              {value:'fastest', displayValue:'Fastest'},
              {value:'normal', displayValue:'Normal'},
            ]
           },
          value:''
        }

      },
    Loading:false
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

      axios.post('/orders.json',order)
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
      isvalid = value.trim() !== '';
    }
    if(rules.minLength){
      isvalid = value.length >= rules.minLength;
    }

    if(rules.maxLength){
      isvalid = value.length <= rules.maxLength
    }

    return isvalid;

  }

  inputChangedHandler=(event,inputIdentifier)=>{
    const updatedForm = {...this.state.orderform};
    const formElements = {...updatedForm[inputIdentifier]};
    formElements.value = event.target.value;
    formElements.valid = this.checkValidity(formElements.value,formElements.validation);
    updatedForm[inputIdentifier] = formElements;
    this.setState({
      orderform:updatedForm
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
                 shouldValidate={f.config.validation}
                 Invalid={!f.config.valid}
                 />
              );
            })
          }
          <Button  Type='Success' clicked={this.placeOrderHandler} >ORDER</Button>
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

export default Contact;
