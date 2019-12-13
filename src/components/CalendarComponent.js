import React, { useState, setState } from "react";
import Calendar from "react-calendar";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../components/styles/Styles";
import moment, { calendarFormat } from "moment";

const CalendarComponent = () => {
  const classes = useStyles();
  const [date, setDate] = useState("");

  const onChange = date => {
    setDate(date.toString());
  };

  return (
    <div>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12} className={classes.calendar}>
          <Calendar onClickDay={data => onChange(data)} />
        </Grid>

        <h1>Day comes here:</h1>
        <h2>Selected day:{date}</h2>
      </Grid>
    </div>
  );
};

export default CalendarComponent;
