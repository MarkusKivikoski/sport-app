import React, { useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Grid from "@material-ui/core/Grid";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Button from "@material-ui/core/Button";
import { useStyles } from "../components/styles/Styles";

const CustomerList = props => {
  const customerApi = "https://customerrest.herokuapp.com/api/customers";
  const [customer, setCustomer] = useState([]);
  const setOpen = useState(false);
  const classes = useStyles();

  const fetchCustomers = () => {
    fetch(customerApi)
      .then(response => response.json())
      .then(responseData => setCustomer(responseData.content))
      .catch(err => console.error(err));
  };

  React.useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = link => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(link, { method: "DELETE" })
        .then(() => fetchCustomers())
        .then(() => setOpen(true))
        .catch(err => console.error(err));
    }
  };

  const editCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(() => fetchCustomers())
      .catch(err => console.error(err));
  };

  const saveCustomer = newCustomer => {
    fetch(customerApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    })
      .then(() => fetchCustomers())
      .catch(err => console.error(err));
  };

  const columns = [
    {
      Header: "First name",
      accessor: "firstname"
    },
    {
      Header: "Last Name",
      accessor: "lastname"
    },
    {
      width: 150,
      Header: "Address",
      accessor: "streetaddress"
    },
    {
      width: 80,
      Header: "Postal",
      accessor: "postcode"
    },
    {
      Header: "City",
      accessor: "city"
    },
    {
      width: 170,
      Header: "e-mail",
      accessor: "email"
    },
    {
      width: 120,
      Header: "Phone",
      accessor: "phone"
    },
    {
      filterable: false,
      sortable: false,
      width: 80,
      Cell: row => (
        <EditCustomer customer={row.original} updateCustomer={editCustomer} />
      )
    },
    {
      filterable: false,
      sortable: false,
      width: 80,
      Cell: ({ value }) => (
        <Button
          size="small"
          color="secondary"
          onClick={() => deleteCustomer(value)}
        >
          <DeleteOutlineIcon />
        </Button>
      ),
      accessor: "links[0].href"
    }
  ];

  return (
    <div>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <h1>CustomerList</h1>
          <AddCustomer saveCustomer={saveCustomer} />
        </Grid>
        <Grid item xs={12}>
          <ReactTable
            filterable={true}
            columns={columns}
            data={customer}
            showPagination={false}
            minRows={1}
            className={classes.table}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerList;
