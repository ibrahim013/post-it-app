import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../component/Header';
import Navigation from '../../component/Navigation';

describe('<Header />', () => {
  const wrapper = shallow(<Header />);
  it('should find a button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('should contain a <Navigation /> component', () => {
    expect(wrapper.find(Navigation)).toHaveLength(1);
  });
});
