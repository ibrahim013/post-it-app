import React from 'react';
import { mount } from 'enzyme';
import { Header } from '../../component/Header';
import { Navigation } from '../../component/Navigation';

describe('<Header />', () => {
  const wrapper = mount(<Header />);
  it('should find a button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('should contain a <Navigation /> component', () => {
    expect(wrapper.find(Navigation).length).toEqual(1);
  });
  it('should display copyright and Designed by', () => {
<<<<<<< HEAD
    expect(wrapper.find('h3').at(1).text()).toEqual('POST IT',
=======
    expect(wrapper.find('h3').at(1).text()).toEqual('POST IT'
>>>>>>> 0977beaca520f233e2bd1750fcd67ac515654e6f
    );
  });
});
