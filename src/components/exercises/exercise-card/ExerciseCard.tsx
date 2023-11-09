import React, { useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "./ExerciseCard.scss";

const ExerciseCard = ({ exercise, isSelected, onToggleSelect }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`exercise-card ${isSelected ? 'selected' : ''}`} onClick={onToggleSelect}>
      <div className="exercise-card__info">
        <h3>{exercise.name}</h3>
        <p>{exercise.difficulty}</p>
        <InfoIcon onClick={handleClickOpen} />
      </div>

      <Dialog onClose={handleClose} aria-labelledby="exercise-details-dialog" open={open}>
        <DialogTitle id="exercise-details-dialog">{exercise.name}</DialogTitle>
        <DialogContent>
          <p>{exercise.description}</p>
          {/* <div>Muscle Groups: {exercise.muscleGroups.join(', ')}</div> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExerciseCard;

