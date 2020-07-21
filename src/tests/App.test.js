import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { BrowserRouter as Router, MemoryRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history'

import { PureApp } from '../App.js';
import AddLink from '../components/AddLink/AddLink.js';
import LinkList from '../components/LinkList/LinkList.js';
import Profile from '../components/Profile/Profile.js';
import Search from '../components/Search/Search.js';

describe('<App />', () => {
    it('renders a <Profile /> component', () => {
        const wrapper = shallow(<PureApp />);
        expect(wrapper.find(Profile).length).toEqual(1);
    });
    it('renders a <Search /> component', () => {
        const wrapper = shallow(<PureApp />);
        expect(wrapper.find(Search).length).toEqual(1);
    });
    it('renders a <LinkList /> component', () => {
        const wrapper = mount(
            <Router>
                <PureApp />
            </Router>
        );
        expect(wrapper.find(LinkList).length).toEqual(1);
    });
    it('renders a <AddLink /> component', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/addLink']}>
                <PureApp/>
            </MemoryRouter>
        );

        expect(wrapper.find(AddLink).length).toEqual(1);
    });
});
