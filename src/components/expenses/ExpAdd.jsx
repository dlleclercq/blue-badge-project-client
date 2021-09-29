import React, { useState } from "react";
import Chart from "../chart/Chart";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
import APIURL from "../../helpers/enviornment";
import { Label } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "#6ccff6",
    opacity: 0.8,
  },
}));

const ExpAdd = (props) => {
  const classes = useStyles();
  const history = useHistory();

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
    // if (!amount) {
    //   setAmountError(true);
    //   return;
    // }
    // if (!dueDate) {
    //   setDateError(true);
    //   return;
    // }
    // if (!category) {
    //   setcategoryError(true);
    //   return;
    // }
    // if (!reoccuring) {
    //   setReoccuringError(true);
    //   return;
    // }
    // if (!name) {
    //   setNameError(true);
    //   return;
    // }
    // fetch to submit info to database
    fetch(`${APIURL}/expense/add`, {
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
    // setAmountError(false);
    // setNameError(false);
    // setDateError(false);
    // setReoccuringError(false);
    // setNameError(false);
  };
  // Dialog box
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    props.getExpense();
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleClick() {
    history.push("/ExpAdd");
  }

  return (
    <div className={classes.root}>
      <form onSubmit={addExpense}>
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
            <Grid item xs={4} />
            <Grid item xs={2}>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#6ccff6",
                }}
              >
                EXPENSES
              </h1>
            </Grid>
          </Grid>

          <Grid item xs={3} />
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
                  required="true"
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
                  disableUnderline="true"
                  required="true"
                  // error={reoccuringError}
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

          <Grid item xs={2}>
            <Paper className={classes.paper}>
              {/* vendor name input */}
              <TextField
                id="txtName"
                label="Vendor"
                variant="standard"
                onChange={updateName}
                required="true"
                // error={nameError}
              />
            </Paper>
          </Grid>
          <Grid item xs={3} />

          <Grid item xs={4} />

          <Grid item xs={2}>
            <Paper className={classes.paper}>
              {/* amount input */}
              <TextField
                id="txtAmount"
                label="Payment Amount"
                variant="standard"
                onChange={updateAmount}
                required="true"
                // error={amountError}
              />
            </Paper>
          </Grid>

          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Label> </Label>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="dense"
                  id="dpDueDate"
                  format="MM/dd/yyyy"
                  label=""
                  helperText=""
                  disablePast="true"
                  // disableToolbar="true"
                  value={dueDate}
                  onChange={updateDueDate}
                  required="true"
                  // error={dateError}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Paper>
          </Grid>

          <Grid item xs={5} />

          <Grid item xs={2}>
            <Paper style={{ backgroundColor: "#020202" }}>
              <Button variant="contained" color="secondary" type="submit">
                Add Expense
              </Button>
            </Paper>
          </Grid>
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
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>

          <Grid item sm={9} />
        </Grid>
      </form>
    </div>
  );
};

export default ExpAdd;
