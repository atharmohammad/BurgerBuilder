export const checkValidity=(value,rules)=>{
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

  if(rules.isEmail){
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
    isvalid = pattern&&isvalid;
  }
  return isvalid;

}
