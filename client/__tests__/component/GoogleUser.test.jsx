import React from 'react';
import { mount } from 'enzyme';
import { GooglePhoneVerification } from '../../component/GoogleUser';


describe('<GooglePhoneVerification />', () => {
  const wrapper = mount(<GooglePhoneVerification />);
  it('should find a form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('[type="tel"]').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).text()).toEqual(' Update');
  });
  it('should have the component default state as empty', () => {
    expect(wrapper.state().phoneNumber).toEqual('');
    expect(wrapper.state().isLoading).toEqual(false);
  });
  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
  });
});
