import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface CommentListProps {
  comments: Array<{ id: number; body: string; postId: number; likes: number; user?: { username?: string } }>;
  onDelete: (id: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onDelete }) => {
  return (
    <Paper elevation={3}>
      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="like">
                    <ThumbUpIcon /> {comment.likes}
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(comment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText 
                primary={comment.body} 
                secondary={`By ${comment.user?.username || 'Anonymous'} - Post ID: ${comment.postId}`} 
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default CommentList;
