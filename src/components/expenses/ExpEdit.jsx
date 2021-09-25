import React, { useState, useEffect } from "react";

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

const ExpEdit = (props) => {

  // useEffect(() => {
  //   handleClickOpen();
  // }, [])
console.log(props.data)
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
    debugger
    fetch(`http://localhost:3000/expense/edit/${props.data.id}`, {
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
        props.getExpense()
      })
    
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Expense</DialogContentText>
          {/* category dropdown list */}
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

          {/* Recurring payment dropdown list  */}
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

          {/* vendor name input */}
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
