import {shallow,configure} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {NavigationItems} from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()});

describe('<NavigationItems />',()=>{
  let wrapper;

  beforeEach(()=>{
    wrapper = shallow(<NavigationItems />)
  })

  it('It should render three <NavigationItem/> if authenticated',()=>{
    wrapper.setProps({
      token:"se21#wa"
    })
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('It should render 2 <NavigationItem/> if not authenticated',()=>{
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  })
})
