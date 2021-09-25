import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

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

// imports for dialog box
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import APIURL from "../../helpers/enviornment";

const ExpEdit = (props) => {
  // useEffect(() => {
  //   handleClickOpen();
  // }, [])
  console.log(props.data);
  const [open, setOpen] = React.useState(false);

  const [editCategory, setEditCategory] = useState(props.data.category);
  const [editName, setEditName] = useState(props.data.name);
  const [editAmount, setEditAmount] = useState(props.data.amount);
  const [editDueDate, setEditDueDate] = useState(props.data.dueDate);
  const [editReoccuring, setEditReoccuring] = useState(props.data.reoccuring);

  let updateCategory = (e) => {
    setEditCategory(e.target.value);
  };
  let updateName = (e) => {
    setEditName(e.target.value);
  };
  let updateAmount = (e) => {
    setEditAmount(e.target.value);
  };
  let updateDueDate = (date) => {
    setEditDueDate(date);
  };
  let updateReoccuring = (e) => {
    setEditReoccuring(e.target.value);
  };


  const ExpUpdate = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/expense/edit/${props.data.id}`, {
      method: "PUT",
      body: JSON.stringify({
        expense: {
          category: editCategory,
          name: editName,
          amount: editAmount,
          dueDate: editDueDate,
          reoccuring: editReoccuring,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.getExpense();
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText color="#020202" fontWeight="bold">
            Edit Expense
          </DialogContentText>
          {/* category dropdown list */}
          <Grid containter>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel id="ddlExpCat">Category</InputLabel>
                <Select
                  labelId="ddlExpCat"
                  id="ddlExpCat"
                  disableUnderline="true"
                  value={editCategory}
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
            </Grid>

            {/* Recurring payment dropdown list  */}
            <Grid item xs={12}>
              <FormControl>
                <InputLabel id="ddlExpRec">Frequency</InputLabel>
                <Select
                  labelId="ddlExpRec"
                  id="ddlExpRec"
                  value={editReoccuring}
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
            </Grid>

            {/* vendor name input */}
            <Grid item xs={12}>
              <TextField
                id="txtName"
                label="Vendor"
                variant="standard"
                onChange={updateName}
                required="true"
                value={editName}
                // error={nameError}
              />

              {/* amount input */}
              <TextField
                id="txtAmount"
                label="Payment Amount"
                variant="standard"
                onChange={updateAmount}
                required="true"
                value={editAmount}
                // error={amountError}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="dpDueDate"
                  format="MM/dd/yyyy"
                  label="Due Date"
                  helperText=""
                  disablePast="true"
                  // disableToolbar="true"
                  value={editDueDate}
                  onChange={updateDueDate}
                  required="true"
                  // error={dateError}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ExpUpdate}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ExpEdit;
