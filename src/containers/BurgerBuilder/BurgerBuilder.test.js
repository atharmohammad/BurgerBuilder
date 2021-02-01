import {shallow,configure} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter:new Adapter()});

describe('<BurgerBuilder />',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<BurgerBuilder InitIngredients={()=>{}} ingredients={[{value:'salad',count:0}]}/>)
  }); //Here we have to pass ingrediends and initIngredients in here
  //because when using wrapper.setProps give props after component in rendered so
  //if props is being used in some process at time of mounting then it will fails the test
  it('it will load burger controls after loading ingredients',()=>{
    //   wrapper.setProps({
    //     ingredients:[
    //       {value:'salad',count:0},
    //       {value:'cheese',count:0},
    //       {value:'bacon',count:0},
    //       {value:'meat',count:0},
    //     ]
    // });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })
})
