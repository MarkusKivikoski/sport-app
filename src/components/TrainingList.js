import React, { useState } from "react";
import AddTraining from "./AddTraining";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useStyles } from "../components/styles/Styles";
import EditTraining from "./EditTraining";
import CalendarComponent from "./CalendarComponent";

const TrainingList = () => {
  const trainingApi = "https://customerrest.herokuapp.com/api/trainings";
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState([]);
  const [customer, setCustomer] = useState("");
  const classes = useStyles();

  const fetchTrainings = () => {
    fetch(trainingApi)
      .then(response => response.json())
      .then(responseData => setTraining(responseData.content))
      //.then(responseData => setCustomer(responseData.content[0].links[0].href))

      .catch(err => console.error(err));
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetchTrainings();
  }, []);

  const deleteTraining = link => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(link, { method: "DELETE" })
        .then(() => fetchTrainings())
        .then(() => setOpen(true))
        .catch(err => console.error(err));
    }
  };

  const editTraining = (training, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(training)
    })
      .then(res => fetchTrainings())
      .catch(err => console.error(err));
  };

  const saveTraining = newTraining => {
    fetch(trainingApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTraining)
    })
      .then(() => fetchTrainings())
      .catch(err => console.error(err));
  };

  const columns = [
    {
      Header: "Customer",
      accessor: "customer"
    },
    {
      Header: "Activity",
      accessor: "activity"
    },
    {
      id: Date,
      Header: "Date",
      accessor: date => moment(date.date).format("DD.MM.YYYY HH:mm")
    },
    {
      Header: "Duration (minutes)",
      accessor: "duration"
    },
    {
      filterable: false,
      sortable: false,
      width: 80,
      Cell: ({ value }) => (
        <Button
          size="small"
          color="secondary"
          onClick={() => deleteTraining(value)}
        >
          <DeleteOutlineIcon />
        </Button>
      ),
      accessor: "links[0].href"
    },
    {
      filterable: false,
      sortable: false,
      width: 80,
      Cell: row => (
        <EditTraining training={row.original} updateTraining={editTraining} />
      )
    }
  ];

  return (
    <div>
      <Grid container direction="column" alignItems="center">
        <Grid>
          <h1>TrainingList</h1>
          <AddTraining saveTraining={saveTraining} />
        </Grid>

        <Grid item xs={12}>
          <ReactTable
            className={classes.table}
            filterable={true}
            columns={columns}
            data={training}
            showPagination={false}
            minRows={1}
          />
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={"Training deleted"}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TrainingList;
