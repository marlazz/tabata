import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { CloseOutlined } from '@mui/icons-material';

const SelectedExercisesSection = ({ selectedExercises, handleRemoveExercise }) => {
  return (
    <div className="create-session__summary">
      <List dense={true}>
        {selectedExercises.map((exercise) => (
          <ListItem
            key={exercise.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveExercise(exercise.id)}>
                <CloseOutlined />
              </IconButton>
            }
          >
            <ListItemText
              primary={exercise.name}
              // secondary={`Difficulté: ${exercise.difficulty}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SelectedExercisesSection;
