import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

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

{/* <TextField
                        className={classes.year}
                        select
                        required={true}
                        label="Condition"
                        // value={currency}
                        onChange={(e) => setCondition(e.target.value)}
                        helperText="Please select Vehicle Condition"
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value={"New"}>New</MenuItem>
                        <MenuItem value={"Used"}>Used Vehicle</MenuItem>
                      </TextField> */}


      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={2} />
          <Grid item xs={8}>
            {/* category dropdown list */}
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="ddlExpCat">Category</InputLabel>
                <Select
                  labelId="ddlExpCat"
                  id="ddlExpCat"
                  value={category}
                  onChange={updateCategory}
                  required={true}
                  //   input={<BootstrapInput />}
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

            {/* vendor name input */}
            <Grid item xs={6}>
              <TextField
                id="txtName"
                label="Payee"
                variant="outlined"
                required={true}

                onChange={updateName}
              />
            </Grid>

            {/* amount input */}
            <Grid item xs={6}>
              <TextField
                id="txtAmount"
                label="Amount"
                variant="outlined"
                required={true}
                onChange={updateAmount}
              />
            </Grid>

            {/* due date - date picker field */}
            <Grid item xs={6}>
              <label htmlFor="dpDueDate">Due Date</label>
              <br />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="dpDueDate"
                  // label="Due Date"
                  format="MM/dd/yyyy"
                  value={dueDate}
                  onChange={updateDueDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            {/* Recurring payment dropdown list  */}
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="ddlExpRec">Frequency</InputLabel>
                <Select
                  labelId="ddlExpRec"
                  id="ddlExpRec"
                  value={reoccuring}
                  required={true}
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

            {/* Buttons */}
            <Grid item xs={12}>
              <Button variant="contained" onClick={addExpense}>
                Add
              </Button>
            </Grid>

            {/* Submit confirmation
            <Grid item xs={12}>
              <div>
                <Button onClick={handleOpen}>Open modal</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Expense Submitted!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <div id="textAreaConf">
                        <h4>Category: {category}</h4>
                        <h4>Payee: {name}</h4>
                        <h4>Amount: {amount}</h4>
                        <h4>Due Date: {toString({dueDate})}</h4>
                        <h4>Frequency: {toString(reoccuring)}</h4>
                      </div>
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </Grid> */}
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpAdd;
