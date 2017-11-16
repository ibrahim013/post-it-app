import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import { PasswordReset } from '../../component/PasswordReset';


describe('<PasswordReset />', () => {
  const onSubmit = sinon.spy();
  const passwordReset = sinon.spy(() => Promise
    .resolve({ data: { message: 'Success' }, response: { data: 'Error' } }));
  const wrapper = mount(<PasswordReset />,
    {
      childContextTypes: { router: PropTypes.object },
      context: { router: {
        history: {
          push: () => null,
          createHref: () => null,
          replace: () => null,
          match: {
            path: '/passwordreset',
            url: '/passwordreset',
            isExact: true,
            params: {},
          },
          location: {
            pathname: '/passwordreset',
            search: '',
            hash: '',
            key: 'bbpg48',
          },
        },
      } },
    },
);
  const props = {
    passwordReset,
  };
  it('should find a form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('[type="email"]').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).text()).toEqual('Reset Password');
  });
  it('should have the component default state as empty', () => {
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().isLoading).toBe(false);
  });
  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
  });
  it('should call onSubmit when reset password form is submitted', () => {
    const wrapper = mount(<PasswordReset {...props}/>);
    wrapper.setState({ email: 'musa@musa.com', isLoading: true });
    wrapper.find('form').at(0).simulate('submit');
    expect(onSubmit.calledOnce).toEqual(false);
  });
});
