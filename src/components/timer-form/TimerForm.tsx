import React, { ChangeEvent, FC } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface TimerFormProps {
  effortTime: string;
  recoveryTime: string;
  setEffortTime: (time: string) => void;
  setRecoveryTime: (time: string) => void;
}

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput: FC<TimeInputProps> = ({ label, value, onChange }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    InputProps={{
      endAdornment: <InputAdornment position="end">min:sec</InputAdornment>,
    }}
    variant="outlined"
    margin="normal"
    fullWidth
  />
);

const TimerForm: FC<TimerFormProps> = ({
  effortTime,
  recoveryTime,
  setEffortTime,
  setRecoveryTime,
}) => {

  const handleEffortChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEffortTime(event.target.value);
  };

  const handleRecoveryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecoveryTime(event.target.value);
  };

  return (
    <div className="create-session__timer-settings">
      <TimeInput
        label="Temps d'effort"
        value={effortTime}
        onChange={handleEffortChange}
      />
      <TimeInput
        label="Temps de récupération"
        value={recoveryTime}
        onChange={handleRecoveryChange}
      />
    </div>
  );
};

export default TimerForm;
