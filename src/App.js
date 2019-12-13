import React from "react";
import TrainingList from "./components/TrainingList";
import CustomerList from "./components/CustomerList";
import TopNav from "./components/TopNav";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStyles } from "./components/styles/Styles";
import CalendarComponent from "./components/CalendarComponent.js";

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <Grid container className={classes.app}>
          <Grid item xs={12}>
            <div className="App">
              <Route path="/customers" component={CustomerList} />
              <Route path="/trainings" component={TrainingList} />
              <Route path="/calendar" component={CalendarComponent} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <TopNav />
          </Grid>
        </Grid>
      </Switch>
    </Router>
  );
}
