import React, { useState, FC } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import "./TimerForm.scss";
import { styled } from "@mui/material/styles";
import { OutlinedInput } from "@mui/material";

const CustomSelect = styled(Select)(({ theme }) => ({
  "&.MuiSelect-select": {
    paddingRight: '0px', // Retirer l'espace pour la flèche
  },
  "& .MuiSvgIcon-root": {
    // Vous pouvez commenter ou supprimer ces lignes si vous ne voulez pas de flèche
    // display: "none",
  },
  "& .MuiSelect-select.MuiSelect-outlined": {
    backgroundColor: "var(--color-success)",
    color: "#ffffff",
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
}));
interface TimerFormProps {
  effortTime: number;
  recoveryTime: number;
  setEffortTime: (time: number) => void;
  setRecoveryTime: (time: number) => void;
}

const TimerInput: FC<{
  label: string;
  time: number;
  setTime: (time: number) => void;
}> = ({ label, time, setTime }) => {
  const [unit, setUnit] = useState("seconds");

  const handleUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newUnit = event.target.value as string;
    setUnit(newUnit);
    setTime(newUnit === "minutes" ? time * 60 : time);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10) || 0;
    setTime(unit === "minutes" ? value * 60 : value);
  };

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel htmlFor={`${label}-input`}>{label}</InputLabel>
      <OutlinedInput
        id={`${label}-input`}
        type="number"
        value={unit === "minutes" ? time / 60 : time}
        onChange={handleTimeChange}
        endAdornment={
          <InputAdornment position="end">
            <CustomSelect
              value={unit}
              onChange={handleUnitChange}
              inputProps={{
                name: `${label}-unit`,
                id: `${label}-unit-select`,
              }}
            >
              <MenuItem value="seconds">sec</MenuItem>
              <MenuItem value="minutes">min</MenuItem>
            </CustomSelect>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

const TimerForm: FC<TimerFormProps> = ({
  effortTime,
  recoveryTime,
  setEffortTime,
  setRecoveryTime,
}) => {
  return (
    <div className="timer-form">
      <TimerInput
        label="Temps d'effort"
        time={effortTime}
        setTime={setEffortTime}
      />
      <TimerInput
        label="Temps de récupération"
        time={recoveryTime}
        setTime={setRecoveryTime}
      />
    </div>
  );
};

export default TimerForm;
