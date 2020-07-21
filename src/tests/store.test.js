import { store } from '../redux/store'
import { postLink, loadLinks } from '../redux/actions/linkActions'
import * as axios from 'axios';

jest.mock("axios");

let linkStore
let links = [{ "id": 1, "name": "Facebook", "url": "https://facebook.com", "tags": [{ "name": "Social" }, { "name": "News" }, { "name": "Messaging" }] },
{ "id": 2, "name": "Google", "url": "https://google.com", "tags": [{ "name": "Search" }] },
{ "id": 3, "name": "BBC", "url": "https://bbc.com", "tags": [{ "name": "News" }] }]

let new_link = { "id": 4, "name": "LinkedIn", "url": "https://linkedIn.com", "tags": [{ "name": "Professional" }] }

describe('Redux Store', () => {
    beforeEach(() => { // Runs before each test in the suite
        linkStore = store()
    });

    it('Store has initial state', () => {
        expect(linkStore.getState()).toEqual({
            linkReducer: {
                linkStore: []
            }
        })
    })
    it('Load link success', () => {
        linkStore.dispatch({
            type: 'LOAD_LINK_SUCCESS_ACTION',
            links
        })
        expect(linkStore.getState()).toEqual({
            linkReducer: {
                linkStore: links
            }
        })
    })
    it('Load link failure', () => {
        linkStore.dispatch({
            type: 'LOAD_LINK_FAILURE_ACTION',
            links
        })
        expect(linkStore.getState()).toEqual({
            linkReducer: {
                linkStore: []
            }
        })
    })
    it('Post link success', () => {
        linkStore.dispatch({
            type: 'LOAD_LINK_SUCCESS_ACTION',
            links
        })
        expect(linkStore.getState()).toEqual({
            linkReducer: {
                linkStore: links
            }
        })

        linkStore.dispatch({
            type: 'POST_LINK_SUCCESS_ACTION',
            links: new_link
        })
        expect(linkStore.getState()).toEqual({
            linkReducer: {
                linkStore: links.concat([new_link])
            }
        })
    })
    it('Post link failure', () => {
        linkStore.dispatch({
            type: 'LOAD_LINK_SUCCESS_ACTION',
            links
        })
        expect(linkStore.getState()).toEqual({
            linkReducer: {
                linkStore: links
            }
        })

        linkStore.dispatch({
            type: 'POST_LINK_FAILURE_ACTION',
            links: new_link
        })
        expect(linkStore.getState()).toEqual({
            linkReducer: {
                linkStore: links
            }
        })
    })
})

describe('Actions', () => {
    beforeEach(async () => { // Runs before each test in the suite
        linkStore = store()
    });

    it('Dispatches loadLinks successfully', async () => {
        axios.get.mockImplementation(() => Promise.resolve({ data: links }));

        await linkStore.dispatch(loadLinks())
        console.log(linkStore.getState().linkReducer.linkStore)
        expect(linkStore.getState().linkReducer.linkStore.length).toBeGreaterThanOrEqual(1)
    })

    it('Dispatches postLink successfully', async () => {
        axios.get.mockImplementation(() => Promise.resolve({ data: links }));
        axios.post.mockImplementation(() => Promise.resolve({ data: [new_link] }));

        await linkStore.dispatch(loadLinks())
        expect(linkStore.getState().linkReducer.linkStore).toEqual(links)

        await linkStore.dispatch(postLink(new_link))
        expect(linkStore.getState().linkReducer.linkStore).toEqual(links.concat([new_link]))
    })
})