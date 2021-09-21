import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

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
import { Grid } from "@material-ui/core";

// modal imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { formik, yupToFormErrors} from 'formik';
import * as Yup from 'yup'; 

// style for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

  // function to clear values after fetch
  const clearForm = () => {
    // reset state variables
    setCategory("");
    setName("");
    setAmount("");
    setDueDate("");
    setReoccuring(false);
    
    // reset input on form

  }

  // modal variables
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // update state variables with data from inputs
  let updateCategory = (e) => {
    setCategory(e.target.value);
  };

  let updateName = (e) => {
    setName(e.target.value);
  };

  let updateAmount = (e) => {
    setAmount(e.target.value);
  };

  let updateDueDate = (date) => {
    setDueDate(date);
  };

  let updateReoccuring = (e) => {
    setReoccuring(e.target.value);
  };

  // fetch to submit info to database
  let addExpense = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/expense/add`, {
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
      ;
  };

  

  return (
    <form>
      <h1
        style={{ display: "flex", justifyContent: "center", color: "#6ccff6" }}
      >
        EXPENSES
      </h1>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item container>
          <Grid item sm={2} />
          <Grid item sm={1}>
            {/* category dropdown list */}
            <FormControl className={classes.formControl}>
              <InputLabel id="ddlExpCat">Category</InputLabel>
              <Select
                labelId="ddlExpCat"
                id="ddlExpCat"
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
          </Grid>
          <Grid item sm={9} />
          <Divider />
          <Divider />

          <Grid item sm={2} />
          <Grid item sm={1}>
            {/* Recurring payment dropdown list  */}
            <FormControl className={classes.formControl}>
              <InputLabel id="ddlExpRec">Frequency</InputLabel>
              <Select
                labelId="ddlExpRec"
                id="ddlExpRec"
                value={reoccuring}
                onChange={updateReoccuring}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={true}>Recurring</MenuItem>
                <MenuItem value={false}>Non-Recurring</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={9} />
          <Divider />
          <Grid item sm={2} />
          <Grid item sm={1}>
            {/* vendor name input */}
            <TextField
              id="txtName"
              label="Vendor"
              variant="standard"
              onChange={updateName}
            />
          </Grid>
          <Grid item sm={9} />
          <Divider />

          <Grid item sm={2} />
          <Grid item sm={1}>
            {/* amount input */}
            <TextField
              id="txtAmount"
              label="Payment Amount"
              variant="standard"
              onChange={updateAmount}
            />
          </Grid>
          <Grid item sm={9} />
          <Divider />

          <Grid item sm={2} />
          <Grid item sm={1}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="standard"
                margin="normal"
                id="dpDueDate"
                format="MM/dd/yyyy"
                label="Due Date"
                helperText=""
                clearable
                value={dueDate}
                onChange={updateDueDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={9} />
          <Divider />

          <Grid item sm={2} />
          <Divider />
          <Grid item sm={2}>
            <Button variant="contained" color="secondary" onClick={addExpense}>
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpAdd;
