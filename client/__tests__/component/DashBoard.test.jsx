import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { DashBoard } from '../../component/DashBoard';
import Navigation from '../../component/Navigation';
import AddGroup from '../../component/AddGroup';
import GetGroupList from '../../component/GetGroupList';


describe('<DashBoard />', () => {
  const wrapper = shallow(<DashBoard />,
    {
      childContextTypes: { router: PropTypes.object },
      context: { router: {
        history: {
          push: () => null,
          createHref: () => null,
          replace: () => null,
          match: {
            path: '/dashboard',
            url: '/dashboard',
            isExact: true,
            params: {},
          },
          route: {
            location: {
              pathname: '/dashboard',
              search: '',
              hash: '',
              key: '8ziqbv',
            },
          },
        },
      } },
    },
);
  it('should contain a <Navigation /> component', () => {
    expect(wrapper.find(Navigation)).toHaveLength(1);
  });
  it('should contain a <AddGroup /> component', () => {
    expect(wrapper.find(AddGroup)).toHaveLength(1);
  });
  it('should contain a <GetGroupList /> component', () => {
    expect(wrapper.find(GetGroupList)).toHaveLength(1);
  });
});
