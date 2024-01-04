import React from "react";
import { LocalFireDepartment } from "@mui/icons-material";

export const getDifficultyIcons = (difficulty) => {
  const difficultyMapping = {
    Beginner: 1,
    "Beginner to Intermediate": 2,
    Intermediate: 3,
    "Intermediate to Advanced": 4,
    Advanced: 5,
  };

  const difficultyLevel = difficultyMapping[difficulty] || 0;
  return Array.from({ length: difficultyLevel }, (_, index) => (
    <LocalFireDepartment key={index} style={{ color: "#C58BF2" }} />
  ));
};
