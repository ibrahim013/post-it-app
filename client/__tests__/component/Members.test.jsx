import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Members } from '../../component/Members';


describe('<Members />', () => {
  const onSubmit = sinon.spy();
  const addMembers = sinon.spy(() => Promise
  .resolve({ data: { message: 'member added succesfully' }, response: { data: 'Error' } }));

  const wrapper = mount(<Members />);
  it('should find a form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('[type="text"]').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).length).toEqual(1);
    expect(wrapper.find('button').at(0).text()).toEqual('Add Members');
  });
  it('should have the component default state as empty', () => {
    expect(wrapper.state().member).toEqual('');
    expect(wrapper.state().errors).toEqual({});
  });
  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
  });
  const props = {
    addMembers,
  };
  it('should call onSubmit when a group is added and submitted', () => {
    const wrapper = mount(<Members {...props}/>);
    wrapper.setState({ Member: 'master' });
    wrapper.find('form').at(0).simulate('submit');
    expect(onSubmit.calledOnce).toEqual(false);
  });
});
