import React from 'react';
import Alert from 'react-s-alert';
import { mount } from 'enzyme';
import App from '../../component/Header';
import { Header } from '../../component/Navigation';

describe('<App />', () => {
  const wrapper = mount(<App />);
  it('should contain a <Header /> component', () => {
    expect(wrapper.find(Header).length).toEqual(1);
  });
  it('should contain a <Alert /> component', () => {
    expect(wrapper.find(Alert).length).toEqual(1);
  });
});
