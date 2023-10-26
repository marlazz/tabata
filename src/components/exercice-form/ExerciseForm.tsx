import React, { useState } from 'react';
import './ExerciseForm.scss';

interface ExerciseFormProps {
  onAddExercise: (exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ onAddExercise }) => {
  const [newExerciseName, setNewExerciseName] = useState<string>('');

  const handleAddExercise = () => {
    if (newExerciseName.trim()) {
      onAddExercise(newExerciseName);
      setNewExerciseName('');
    }
  };

  return (
    <div className="exercise-form">
      <h2>Ajouter un exercice</h2>
      <input
        type="text"
        placeholder="Nom de l'exercice"
        value={newExerciseName}
        onChange={(e) => setNewExerciseName(e.target.value)}
      />
      <button onClick={handleAddExercise}>Ajouter</button>
    </div>
  );
};

export default ExerciseForm;
