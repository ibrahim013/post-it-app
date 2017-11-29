import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { AddMessage } from '../../component/AddMessage';

describe('<AddMessage />', () => {
  const onSubmit = sinon.spy();
  const postMessage = sinon.spy(() => Promise
      .resolve({ data: { message: 'message added sucesfuly' },
        response: { data: 'Error' } }));
  const wrapper = mount(<AddMessage />);
  it('should find a form element', () => {
    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('form').at(0).length).toEqual(1);
  });
  it('should have the component default state ', () => {
    expect(wrapper.state().message).toEqual('');
    expect(wrapper.state().piority).toEqual('Normal');
    expect(wrapper.state().groupId).toEqual(undefined);
    expect(wrapper.state().groupName).toEqual(undefined);
  });
  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
  });
  const props = {
    postMessage,
  };
  it('should call onSubmit when group is added and submitted', () => {
    const wrapper = mount(<AddMessage {...props}/>);
    wrapper.setState({ message: 'hello from test',
      piority: 'critical',
      groupId: '-KX56484449',
      groupName: 'Andela' });
    wrapper.find('form').at(0).simulate('submit');
    expect(onSubmit.calledOnce).toEqual(false);
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
  it('should receive props on componentDidReceiveProps', () => {
    const nextProps = {
      groupName: 'Andela',
    };
    wrapper.setProps(nextProps);
    expect(wrapper.state('groupName')).toEqual(nextProps.groupName);
  });
});
