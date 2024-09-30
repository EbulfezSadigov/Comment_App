// types.ts
export interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        username: string;
    };
}

export interface CommentsState {
    comments: Comment[];
}

// Action Types
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Action Interfaces
interface FetchCommentsSuccessAction {
    type: typeof FETCH_COMMENTS_SUCCESS;
    payload: Comment[];
}

interface AddCommentAction {
    type: typeof ADD_COMMENT;
    payload: Comment;
}

interface DeleteCommentAction {
    type: typeof DELETE_COMMENT;
    payload: { id: number };
}

export type CommentsActionTypes = FetchCommentsSuccessAction | AddCommentAction | DeleteCommentAction;