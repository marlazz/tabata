import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const SelectedExercisesSection = ({ selectedExercises, handleRemoveExercise }) => {
  return (
    <div className="create-session__summary">
      <h2>Exercices sélectionnés</h2>
      <List dense={true}>
        {selectedExercises.map((exercise) => (
          <ListItem
            key={exercise.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveExercise(exercise.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={exercise.name}
              secondary={`Difficulté: ${exercise.difficulty}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SelectedExercisesSection;
