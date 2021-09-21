import React, { useState } from "react";
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
// import add view all page

const ExpEdit = (props) => {
  /***********************
      *** Edit EXpense ***
      This function will be passed down as props for use on view all page buttons
      This FC will only display if the "edit button" is clicked on view all
   **********************/

  const [updateCategory, setUpdateCategory] = useState(props.viewAll.category);
  const [updateName, setUpdateName] = useState(props.viewAll.name);
  const [updateAmount, setUpdateAmount] = useState(props.viewAll.name);
  const [updateDueDate, setUpdateDueDate] = useState(props.viewAll.name);
  const [updateReoccuring, setUpdateReoccuring] = useState(
    props.viewAll.reoccuring
  );
  /**
    // **** this should be set to true if button clicked to update from view all
     */
  const [updateActive, setUpdateActive] = useState(false);

  /*
   *** this state variable is intialized to empty object.  The object will be filled using the info form the view all when on the line item the user clicks the edit button on
   */
  const [expToUpdate, setExpToUpdate] = useState({});

  const editUpdateExpense = (expense) => {
    setExpToUpdate(expense);
    console.log("Expense data", expense);
  };

  /*
   *** these two functions are toggled by button clicks on view all
   */
  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  const ExpUpdate = (e, exp) => {
    // *** this function will have to be referenced in view
    e.preventDefault();
    console.log("Item to be updated:", props.expenseToUpdate);
    fetch(`http://localhost:3000/expense/edit:id`, {
      method: "PUT",
      body: JSON.stringify({
        expense: {
          category: updateCategory,
          name: updateName,
          amount: updateAmount,
          dueDate: updateDueDate,
          reoccuring: updateReoccuring,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/jason",
        Authorization: props.token,
      }),
    }).then((res) => {
      props.fetchExpenses(); // *** need actual name of fetch from add all FC
      props.updateOff();
    });
  };

  return (
    <Modal isOpen={true}>
      <ModalHeader>Update an Expense</ModalHeader>
      <ModalBody>
        <Form onSubmit={ExpUpdate}>
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
          <Button type="submit">Update the Workout!</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ExpEdit;
