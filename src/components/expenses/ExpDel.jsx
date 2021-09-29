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

// imports for dialog box
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import APIURL from "../../helpers/enviornment";

const ExpDel = (props) => {
    // useEffect(() => {
  //   handleClickOpen();
  // }, [])

  console.log(props.data)
  const [open, setOpen] = React.useState(false);

  const deleteExpense = (expense) => {
    fetch(`${APIURL}/expense/delete/${props.data.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => props.getExpense()); // *** need to know the correction function name
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
      Delete
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this item? </DialogContentText>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={deleteExpense}>Delete</Button>
      </DialogActions>
    </Dialog>
  </div>  
  );
};

export default ExpDel;
