import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addComment } from '../redux/actions/commentActions';
import { Comment } from '../redux/types';

const AddCommentForm: React.FC = () => {
    const [comment, setComment] = useState<string>(() => {
        // Get the saved comment from localStorage or return an empty string
        return localStorage.getItem('newComment') || '';
    });

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
        // Save the comment in localStorage whenever it changes
        localStorage.setItem('newComment', e.target.value);
    };

    const handleSubmit = () => {
        const data: Comment = {
          id: new Date().getTime(),
          body: comment,
          postId: 1,
          likes: 0,
          user: { username: 'Anonymous' },
        };
      
        const commentAction = addComment(data);
        dispatch(commentAction);
      
        setComment('');
        localStorage.removeItem('newComment'); // Remove the saved comment from localStorage
      };

    return (
        <div className='flex items-center gap-4 whitespace-nowrap mb-10'>
            <TextField
                label="Add a comment"
                value={comment}
                onChange={handleChange}
                fullWidth
            />
            <Button variant="contained" onClick={handleSubmit} disabled={!comment.trim()}>
                Add Comment
            </Button>
        </div>
    );
};

export default AddCommentForm;