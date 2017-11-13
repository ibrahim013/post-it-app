import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import { PasswordReset } from '../../component/PasswordReset';


describe('<PasswordReset />', () => {
  const wrapper = mount(<PasswordReset />,
    {
      childContextTypes: { router: PropTypes.func },
      context: { router: {
        history: {
          push: () => null,
          createHref: () => null,
          replace: () => null,
          exact: true,
          path: '/passwordreset',
          component: '[function ]',
        },
        computedMatch: {
          path: '/passwordreset',
          url: '/passwordreset',
          isExact: true,
          params: {},
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
