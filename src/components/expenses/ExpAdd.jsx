import React, { useState } from "react";
import Chart from "../chart/Chart";

import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

// drop down list imports
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

// text field imports
import TextField from "@material-ui/core/TextField";

// date picker imports
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// import for button
import Button from "@material-ui/core/Button";
import { FormControl } from "@material-ui/core";

// layout imports
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(3),
  },
  // root: {
  //   flexGrow: 1,
  // },
  paper: {
    padding: theme.spacing(0.5),
    textAlign: "center",
    justifyContent: "center",
    // color: "#6ccff6",
    // fontWeight: "bold",
    backgroundColor: "#5E0035",
    // opacity: 0.99,
  },
}));

const ExpAdd = (props) => {
  const classes = useStyles();

  // declare useState variables to submit via sequelize
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reoccuring, setReoccuring] = React.useState(false);

  // update state variables with data from inputs
  let updateCategory = (e) => {
    setCategory(e.target.value);
    console.log("Update Cat fired");
    console.log(category);
  };

  let updateName = (e) => {
    setName(e.target.value);
    console.log("vendor name:", name);
  };

  let updateAmount = (e) => {
    setAmount(e.target.value);
    console.log("amount: ", amount);
  };

  let updateDueDate = (date) => {
    setDueDate(date);
    console.log("due date:", dueDate);
  };

  let updateReoccuring = (e) => {
    setReoccuring(e.target.value);
    console.log("recurring payment:", reoccuring);
  };

  // fetch to submit infor to database
  let addExpense = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/expense/add", {
      method: "POST",
      body: JSON.stringify({
        expense: {
          category: category,
          name: name,
          amount: amount,
          dueDate: dueDate,
          reoccuring: reoccuring,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((expenseData) => {
        console.log("Expense Data:", expenseData);
      });
  };

  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={3} direction="row">
          <Grid item container style={{ borderBottom: "1px solid #757780" }}>
            <Grid item xs={1}>
              <img
                src="./assets/iSpendLogo.png"
                height="45"
                width="45"
                alt="iSpend Logo"
              />
            </Grid>
            <Grid item xs={11} />
            <Grid item xs={1} />
            <Grid item xs={11}>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "left",
                  color: "#6ccff6",
                }}
              >
                EXPENSES
              </h1>
            </Grid>
          </Grid>

          <Grid
            item
            container
            style={{ justifyContent: "center", marginTop: "5px" }}
          >
            <Paper className={classes.paper}>
              <Chart />
            </Paper>
          </Grid>

          <Grid item xs={4} />

          <Grid item xs={2}>
            <Paper className={classes.paper}>
              {/* category dropdown list */}
              <FormControl className={classes.formControl}>
                <InputLabel id="ddlExpCat">Category</InputLabel>
                <Select
                  labelId="ddlExpCat"
                  id="ddlExpCat"
                  disableUnderline="true"
                  value={category}
                  onChange={updateCategory}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                  <MenuItem value={"Food"}>Food</MenuItem>
                  <MenuItem value={"Electric"}>Electric</MenuItem>
                  <MenuItem value={"Gas"}>Gas</MenuItem>
                  <MenuItem value={"Water"}>Water</MenuItem>
                  <MenuItem value={"Childcare"}>Childcare</MenuItem>
                  <MenuItem value={"Health"}>Health</MenuItem>
                  <MenuItem value={"Beauty"}>Beauty</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={2}>
            <Paper className={classes.paper}>
              {/* Recurring payment dropdown list  */}
              <FormControl className={classes.formControl}>
                <InputLabel id="ddlExpRec">Frequency</InputLabel>
                <Select
                  labelId="ddlExpRec"
                  id="ddlExpRec"
                  value={reoccuring}
                  onChange={updateReoccuring}
                  disableUnderline="false"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={true}>Recurring</MenuItem>
                  <MenuItem value={false}>Non-Recurring</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={4} />

          <Grid item xs={4} />

          <Grid item xs={2}>
            <Paper className={classes.paper}>
              {/* vendor name input */}
              <TextField
                id="txtName"
                label="Vendor"
                variant="standard"
                onChange={updateName}
              />
            </Paper>
          </Grid>

          <Grid item xs={2}>
            <Paper className={classes.paper}>
              {/* amount input */}
              <TextField
                id="txtAmount"
                label="Payment Amount"
                variant="standard"
                onChange={updateAmount}
              />
            </Paper>
          </Grid>

          <Grid item xs={4} />

          <Grid item xs={5} />

          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  inputVariant="standard"
                  variant="dialog"
                  margin="normal"
                  id="dpDueDate"
                  format="MM/dd/yyyy"
                  label="Due Date"
                  helperText=""
                  disablePast="true"
                  disableToolbar="true"
                  clearable
                  value={dueDate}
                  onChange={updateDueDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Paper>
          </Grid>

          <Grid item xs={5} />

          <Grid item xs={5} />

          <Grid item xs={2}>
            <Paper style={{ backgroundColor: "#020202" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={addExpense}
              >
                Add Expense
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ExpAdd;
