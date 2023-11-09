import React from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import "./ExerciseFilters.scss";

const ExerciseFilters = ({
  difficultyFilter,
  setDifficultyFilter,
  muscleGroupFilter,
  setMuscleGroupFilter,
  muscleGroupOptions,
}) => {
  return (
    <div className="exercise-filters">
      <FormControl variant="outlined" className="exercise-filters__control">
        <InputLabel id="difficulty-label">Niveau de difficulté</InputLabel>
        <Select
          labelId="difficulty-label"
          id="difficultyFilter"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          label="Niveau de difficulté"
          IconComponent={FilterListIcon}
        >
          <MenuItem value="all">Tous les niveaux</MenuItem>
          <MenuItem value="Beginner">Débutant</MenuItem>
          <MenuItem value="Intermediate">Intermédiaire</MenuItem>
          <MenuItem value="Advanced">Avancé</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className="exercise-filters__control">
        <InputLabel id="muscle-group-label">Groupe musculaire</InputLabel>
        <Select
          labelId="muscle-group-label"
          id="muscleGroupFilter"
          value={muscleGroupFilter}
          onChange={(e) => setMuscleGroupFilter(e.target.value)}
          label="Groupe musculaire"
          IconComponent={FilterListIcon}
        >
          <MenuItem value="all">Tous les groupes musculaires</MenuItem>
          {muscleGroupOptions.map((group) => (
            <MenuItem value={group} key={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ExerciseFilters;
