import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { SignUp } from '../../component/SignUp';

describe('<SignUp />', () => {
  const props = {
    signUpAction: jest.fn(),
  };
  const wrapper = mount(<SignUp {...props}/>, {
    childContextTypes: { router: PropTypes.object },
    context: {
      router: {
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
      },
    },
  });
  it('should show wrapper', () => {
    expect(wrapper.state().displayName).toEqual('');
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().errors).toEqual({});
    expect(wrapper.state().phoneNumber).toEqual('');
    expect(wrapper.state().isLoading).toBe(false);
  });
  it('should call onSubmit method on click of submit button', () => {
    const onSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onSubmit',
    ).mockImplementation(() => Promise.resolve({}));
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.setState({
      errors: {},
      isLoading: true,
    });
    wrapper.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalled();
  });
  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    const event = {
      target: {
        groupName: 'Andela',
        description: 'Fun group',
      },
    };
    wrapper.instance().onChange(event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
