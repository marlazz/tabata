import React, { useEffect, useState } from "react";
import "./CreateSession.scss";
import exercises from "../../data/exercices.json";
import ExerciseFilters from "../../components/exercises/exercise-filters/ExerciseFilters.tsx";
import ExerciseCard from "../../components/exercises/exercise-card/ExerciseCard.tsx";
import SelectedExercisesSection from "../../components/exercises/selected-exercises/SelectedExercises.tsx";
import { useNavigate } from "react-router-dom";
import TimerForm from "../../components/timer-form/TimerForm.tsx";
import { convertTimeToSeconds } from "../../helpers/time.helpers.tsx";

export interface Exercise {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  muscleGroups: string[];
}

const CreateSession = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState("all");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [effortTime, setEffortTime] = useState("");
  const [recoveryTime, setRecoveryTime] = useState("");
  const navigate = useNavigate();

  const handleStartSession = () => {
    const effortSeconds = convertTimeToSeconds(effortTime);
    const recoverySeconds = convertTimeToSeconds(recoveryTime);
    const totalSessionTime =
      selectedExercises.length * (effortSeconds + recoverySeconds);

    navigate("/session", {
      state: {
        exercises: selectedExercises,
        effortTime: effortSeconds,
        recoveryTime: recoverySeconds,
        totalTime: totalSessionTime,
      },
    });
  };

  const handleRemoveExercise = (exerciseId) => {
    setSelectedExercises(
      selectedExercises.filter((ex) => ex.id !== exerciseId)
    );
  };

  const toggleExerciseSelection = (exercise) => {
    if (selectedExercises.find((ex) => ex.id === exercise.id)) {
      setSelectedExercises(
        selectedExercises.filter((ex) => ex.id !== exercise.id)
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  useEffect(() => {
    function filterExercises(exercisesList) {
      return exercisesList.filter((exercise) => {
        const difficultyMatches =
          difficultyFilter === "all" ||
          exercise.difficulty === difficultyFilter;
        const muscleGroupMatches =
          muscleGroupFilter === "all" ||
          exercise.muscleGroup.some((group) => group === muscleGroupFilter);
        return difficultyMatches && muscleGroupMatches;
      });
    }

    setFilteredExercises(filterExercises(exercises));
  }, [difficultyFilter, muscleGroupFilter]);

  const uniqueMuscleGroups = new Set();
  exercises.forEach((exercise) => {
    exercise.muscleGroup.forEach((group) => {
      uniqueMuscleGroups.add(group);
    });
  });
  const muscleGroupOptions = Array.from(uniqueMuscleGroups).sort();

  return (
    <div className="create-session">
      <h1>Créer sa séance</h1>
      <div className="create-session__section">
        <TimerForm
          effortTime={effortTime}
          recoveryTime={recoveryTime}
          setEffortTime={setEffortTime}
          setRecoveryTime={setRecoveryTime}
        />
      </div>
      {selectedExercises.length > 0 && (
        <div className="create-session__section">
          <SelectedExercisesSection
            selectedExercises={selectedExercises}
            handleRemoveExercise={handleRemoveExercise}
          />
          <button
            onClick={handleStartSession}
            className="create-session__start-btn"
          >
            Start Session {">>>"}
          </button>
        </div>
      )}
      <div className="create-session__section">
        <h2>Choisir les exercices</h2>
        <div>
          <ExerciseFilters
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
            muscleGroupFilter={muscleGroupFilter}
            setMuscleGroupFilter={setMuscleGroupFilter}
            muscleGroupOptions={muscleGroupOptions}
          />
        </div>
        <div className="create-session__exercise-list">
          {filteredExercises.map((exercise, id) => (
            <ExerciseCard
              key={id}
              exercise={exercise}
              isSelected={selectedExercises.includes(exercise)}
              onToggleSelect={() => toggleExerciseSelection(exercise)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
