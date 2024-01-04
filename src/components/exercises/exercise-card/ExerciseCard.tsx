import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./ExerciseCard.scss";
import { getDifficultyIcons } from "../../../helpers/exercise.helpers.tsx";
import { Exercise } from '../../../pages/create-session/CreateSessionPage';
import { InfoOutlined } from "@mui/icons-material";

export interface ExerciseCardProps {
  exercise: Exercise,
  isSelected?: Boolean,
  onToggleSelect?: () => {},
};

const ExerciseCard = ({ exercise, isSelected, onToggleSelect }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={`exercise-card ${isSelected ? "selected" : ""}`}
      onClick={onToggleSelect}
    >
      <div className="exercise-card__info">
        <div className="exercise-card__info-title">
          <h4>{exercise.name}</h4>
          <InfoOutlined onClick={handleClickOpen} style={{ color: "#C58BF2" }}/>
        </div>
          <span className="exercise-card__difficulty">{getDifficultyIcons(exercise.difficulty)}</span>
      </div>

      <Dialog
        onClose={handleClose}
        aria-labelledby="exercise-details-dialog"
        open={open}
      >
        <DialogTitle id="exercise-details-dialog">{exercise.name}</DialogTitle>
        <DialogContent>
          <p>{exercise.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExerciseCard;
