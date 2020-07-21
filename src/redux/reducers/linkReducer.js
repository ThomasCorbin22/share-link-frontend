import { 
    LOAD_LINK_SUCCESS_ACTION, 
    LOAD_LINK_FAILURE_ACTION, 
    POST_LINK_SUCCESS_ACTION, 
    POST_LINK_FAILURE_ACTION, 
} from '../actions/linkActions'

const initialState = {
    linkStore: []
}

export function linkReducer (state = initialState, action){
    switch(action.type){
        case LOAD_LINK_SUCCESS_ACTION:
            return {
                linkStore: action.links
            }
        case LOAD_LINK_FAILURE_ACTION:
            return {
                linkStore: state.linkStore
            }
        case POST_LINK_SUCCESS_ACTION:
            return {
                linkStore: state.linkStore.concat(action.links)
            }
        case POST_LINK_FAILURE_ACTION:
            return {
                linkStore: state.linkStore
            }
        default:
            return state;
    }
}