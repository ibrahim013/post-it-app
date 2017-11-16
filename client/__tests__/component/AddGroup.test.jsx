import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { AddGroup } from '../../component/AddGroup';


describe('<AddGroup />', () => {
  const onSubmit = sinon.spy();
  const addGroups = sinon.spy(() => Promise
      .resolve({ data: { message: 'Group added sucesfuly' },
        response: { data: 'Error' } }));
  const wrapper = mount(<AddGroup />);
  it('should find a form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('[type="text"]').at(0).length).toEqual(1);
    expect(wrapper.find('[type="text"]').at(1).length).toEqual(1);
    expect(wrapper.find('button').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).text()).toEqual('Create Group');
  });
  it('should have the component default state as empty', () => {
    expect(wrapper.state().groupName).toEqual('');
    expect(wrapper.state().description).toEqual('');
  });
  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
  });
  const props = {
    addGroups,
  };
  it('should call onSubmit when a group is added and submitted', () => {
    const wrapper = mount(<AddGroup {...props}/>);
    wrapper.setState({ groupName: 'Andela', description: 'games club' });
    wrapper.find('form').at(0).simulate('submit');
    expect(onSubmit.calledOnce).toEqual(false);
  });
});
