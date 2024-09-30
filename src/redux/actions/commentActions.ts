import axios from 'axios';
import { Dispatch } from 'redux';
import { CommentsActionTypes, FETCH_COMMENTS_SUCCESS, DELETE_COMMENT, ADD_COMMENT, Comment } from '../types';

// Action creators
export const fetchComments = () => async (dispatch: Dispatch<CommentsActionTypes>) => {
  const response = await axios.get('https://dummyjson.com/comments');
  dispatch(
    {
      type: FETCH_COMMENTS_SUCCESS,
      payload: response.data.comments
    }
  );
};

export const addComment = (comment: Comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const deleteComment = (id: number): CommentsActionTypes => ({
  type: DELETE_COMMENT,
  payload: { id },
});