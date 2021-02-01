import reducer from './Auth';
import * as actionType from '../actions/actionType';

describe('auth reducer',()=>{

  it('idToken,email and userId to be set after login',()=>{
    expect(reducer({
      userId : null,
      token : null,
      Loading : false,
      error:null,
      authRedirectPath:'/',
      email:''
    }, {
      type:actionType.AUTH_SUCCESS,
      data:{
        idToken:'Some-toke-id',
        localId:'Some-userId',
        email:'email'
      }}
    )).toEqual({
      userId : 'Some-userId',
      token : 'Some-toke-id',
      Loading : false,
      error:null,
      authRedirectPath:'/',
      email:'email'
    })
  })

});
