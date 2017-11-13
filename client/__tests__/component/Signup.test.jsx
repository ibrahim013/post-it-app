// import React from 'react';
// import { mount } from 'enzyme';

// import PropTypes from 'prop-types';
// import { Signup } from '../../component/SignUpPage';

// describe('<Signup />', () => {

//   const wrapper = mount(<Signup {...props} />);
//   it('should have a signup form', () => {
//     expect(wrapper.find('form').length).toEqual(1);
//     expect(wrapper.find('[type="text"]').at(0).length).toEqual(1);
//     expect(wrapper.find('[type="email"]').at(0).length).toEqual(1);
//     expect(wrapper.find('[type="text"]').at(1).length).toEqual(1);
//     expect(wrapper.find('[type="password"]').at(0).length).toEqual(1);
//     expect(wrapper.find('[type="submit"]').at(0).length).toEqual(1);
//   });
//   it('should call onSubmit method when signup button is clicked', () => {
//     wrapper.find('[type="submit"]').get(0).click();
//     expect(onSubmit.calledOnce).toEqual(true);
//   });
//   it('should call onChange method when an input state is changed', () => {
//     wrapper.find('[type="text"]').at(0).simulate('change');
//     expect(onChange.calledOnce).toEqual(true);
//   });
//   it('should call isValid function when a form is submitted', () => {
//     wrapper.find('[type="submit"]').at(0).simulate('click');
//     expect(isValid.calledOnce).toEqual(true);
//   });
// });
