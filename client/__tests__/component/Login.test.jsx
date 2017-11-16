import React from 'react';
import GoogleButton from 'react-google-button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { mount } from 'enzyme';
import TextFieldGroup from '../../component/common/TextFieldGroup';
import { LogIn } from '../../component/LogIn';


describe('<LogIn />', () => {
  const wrapper = mount(<LogIn />,
    {
      childContextTypes: { router: PropTypes.object },
      context: { router: {
        history: {
          push: () => null,
          createHref: () => null,
          replace: () => null,
          exact: true,
          path: '/login',
          component: '[function C]',
        },
        computedMatch: {
          path: '/login',
          url: '/login',
          isExact: true,
          params: {},
        },
      } },
    },
);
  it('should contain a <TextFieldGroup /> component', () => {
    expect(wrapper.find(TextFieldGroup).length).toEqual(2);
  });
  it('should find a link to signup', () => {
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/signup');
  });
  it('should find a form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('should find a label', () => {
    expect(wrapper.find('label').length).toEqual(2);
  });
  it('should find a button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('should have the component default state as empty', () => {
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
    expect(wrapper.state().errors).toEqual({});
    expect(wrapper.state().isLoading).toBe(false);
  });
  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
    expect(wrapper.nodes[0].onHandleSubmit).toBeDefined();
    expect(wrapper.find(GoogleButton).length).toEqual(1);
  });
});
