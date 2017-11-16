import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { SignUp } from '../../component/SignUp';


describe('<SignUp />', () => {
  const wrapper = mount(<SignUp />,
    {
      childContextTypes: { router: PropTypes.object },
      context: { router: {
        history: {
          push: () => null,
          createHref: () => null,
          replace: () => null,
          exact: true,
          path: '/signup',
          component: '[function C]',
        },
        computedMatch: {
          path: '/signup',
          url: '/signup',
          isExact: true,
          params: {},
        },
      } },
    },
);
  it.only('should show wrapper', () => {
    expect(wrapper.state().displayName).toEqual('');
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().errors).toEqual({});
    expect(wrapper.state().phoneNumber).toEqual('');
    expect(wrapper.state().isLoading).toBe(false);
  });
});
