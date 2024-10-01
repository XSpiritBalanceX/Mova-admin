import { FormControlLabel, Checkbox } from "@mui/material";
import moment from "moment";
import { useParams } from "react-router-dom";
import "./SettingTeachSchedule.scss";

interface IButtonTimeProps {
  time: string;
  day: number;
  cbHandleCreateSchedule: (time: string, day: string) => void;
  schedule: { day: number; time_start: string; time_end: string }[];
}

const ButtonTime = ({ time, day, cbHandleCreateSchedule, schedule }: IButtonTimeProps) => {
  const { type } = useParams();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    cbHandleCreateSchedule(name, value);
  };

  const isTimeInSchedule = schedule.some(
    (item) => item.day === day && item.time_start === moment(time, "HH:mm").utc().format("HH:mm"),
  );

  return (
    <FormControlLabel
      control={
        <Checkbox
          className="timeCheckbox"
          value={day}
          name={time}
          onChange={handleCheck}
          checked={isTimeInSchedule}
          disabled={type === "schedule" ? true : false}
        />
      }
      label={time}
      className="timeButton"
    />
  );
};

export default ButtonTime;
