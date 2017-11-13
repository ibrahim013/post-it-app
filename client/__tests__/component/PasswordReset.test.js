import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import PasswordReset from '../../component/PasswordReset';


describe('<PasswordReset />', () => {
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
  it('should find a form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('should find a button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('should have the component default state as empty', () => {
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().isLoading).toBe(false);
  });
  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
  });
});
