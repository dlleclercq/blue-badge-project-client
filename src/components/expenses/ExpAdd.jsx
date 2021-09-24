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

// dialog box
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [amountError, setAmountError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [categoryError, setcategoryError] = useState(false);
  const [reoccuringError, setReoccuringError] = useState(false);

  // function to clear values after fetch
  const clearForm = () => {
    // reset state variables
    setCategory("");
    setName("");
    setAmount("");
    setDueDate("");
    setReoccuring(false);
  };

  // update state variables with form inputs
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

  // validate input form return section
  let addExpense = (e) => {
    e.preventDefault();

    if(!amount) {
      setAmountError(true)
      return
    }

    if(!dueDate) {
      setDateError(true)
      return
    }

    if(!category) {
      setcategoryError(true)
      return
    }

    if(!reoccuring) {
      setReoccuringError(true)
      return
    }

    if(!name) {
      setNameError(true)
      return
    }

    // fetch to submit info to database
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
      .then(handleClickOpen);
      setAmountError(false);
      setNameError(false);
      setDateError(false);
      setReoccuringError(false);
      setNameError(false);
  };

  // Dialog box
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                required="true"
                error={categoryError}
                helperText=""
              >
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
                required="true"
                error={reoccuringError}
                helperText=""
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
          <Grid item sm={3}>
            {/* vendor name input */}
            <TextField
              id="txtName"
              label="payee"
              variant="standard"
              onChange={updateName}
              required="true"
              error={nameError}
              helperText=""
            />
          </Grid>
          <Grid item sm={7} />
          <Divider />

          <Grid item sm={2} />
          <Grid item sm={1}>
            {/* amount input */}
            <TextField
              id="txtAmount"
              label="Amount"
              variant="standard"
              onChange={updateAmount}
              required="true"
              error={amountError}
              helperText="The payment amount is required"
            />
          </Grid>
          <Grid item sm={9} />
          <Divider />
          <Grid item sm={2} />
          <Grid item sm={1}>
            {/* Left blank intentionally to allow space for date field */}
          </Grid>
          <Grid item sm={9} />
          <Divider />
          <Grid item sm={2} />
          <Grid item sm={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="outlined"
                margin="normal"
                name="dpDueDate"
                id="dpDueDate"
                format="MM/dd/yyyy"
                label="Date"
                clearable
                value={dueDate}
                onChange={updateDueDate}
                required="true"
                error={dateError}
                helperText=""
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={8} />
          <Divider />
          <Grid item sm={2} />
          <Divider />
          <Grid item sm={2}>
            <Button variant="contained" color="secondary" onClick={addExpense}>
              Add Expense
            </Button>
            <Button variant="contained" color="secondary" onClick={clearForm}>
              Clear
            </Button>
          </Grid>
          <Grid item sm={2} />
          <Divider />
          <Grid item sm={2} />
          <Grid item sm={1}>
            {/* err/succ msg */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Your payment has been successfully added.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {/* <Button onClick={handleClose}>Disagree</Button> */}
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item sm={9} />
          <Divider />
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpAdd;
