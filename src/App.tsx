import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import CommentList from './components/CommentList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RootState } from './redux/reducers/store';
import { deleteComment, fetchComments } from './redux/actions/commentActions';
import AddCommentForm from './components/AddComment';
import { CommentsActionTypes } from './redux/types';

const App: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, CommentsActionTypes> = useDispatch();
  const { comments } = useSelector((state: RootState) => state.comments);
  
  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    // Restore scroll position on component mount
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }

    const handleScroll = () => {
      // Save scroll position in sessionStorage
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Comments Application
        </Typography>
      </Box>

      <AddCommentForm />
      
      <CommentList 
        comments={comments} 
        onDelete={(id) => dispatch(deleteComment(id))} 
      />
    </Container>
  );
};

export default App;