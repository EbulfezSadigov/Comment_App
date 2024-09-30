import { CommentsActionTypes, CommentsState } from '../types';

const initialState: CommentsState = {
    comments: [],
};

export const commentsReducer = (state = initialState, action: CommentsActionTypes) => {
    switch (action.type) {
        case "FETCH_COMMENTS_SUCCESS":
            return {
                ...state,
                comments: action.payload
            };
        case "ADD_COMMENT":
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        case "DELETE_COMMENT":
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.payload.id)
            };
        default:
            return state;
    }
};