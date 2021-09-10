import React, { useState } from "react";

// drop down list imports
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

// text field imports
import TextField from "@material-ui/core/TextField";

// date picker imports
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// import for checkbox
import Checkbox from "@material-ui/core/Checkbox";

// import for button
import Button from "@material-ui/core/Button";

const ExpAdd = (props) => {
  // declare useState variables to submit via sequelize
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reoccuring, setReoccuring] = React.useState(true);

  // update state variables with data from inputs
  let updateCategory = (e) => {
    setCategory(e.target.value);
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
    setReoccuring(e.target.checked);
    console.log("recurring payment:", reoccuring);
  };

  // fetch to submit infor to database
  let addExpense = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/expense/add", {
      method: "POST",
      body: JSON.stringify({
        expenseAdd: {
          category: category,
          name: name,
          amount: amount,
          dueDate: dueDate,
          reoccuring: reoccuring,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Autorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((expenseData) => {
        console.log("Expense Data:", expenseData);
      });
  };

  return (
    <form>
      {/* category dropdown list */}
      {/* <FormControl className={classes.margin}> */}
      <InputLabel id="ddlExpCat">Expense Category</InputLabel>
      <Select
        labelId="ddlExpCat"
        id="ddlExpCat"
        value={category}
        onChange={updateCategory}
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
      <br />
      {/* </FormControl> */}

      {/* vendor name input */}
      <TextField
        id="txtName"
        label="Vendor Name"
        variant="outlined"
        onChange={updateName}
      />
      <br />

      {/* amountj input */}
      <TextField
        id="txtAmount"
        label="Payment Amount"
        variant="outlined"
        onChange={updateAmount}
      />
      <br />

      {/* due date - date picker field */}
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
      <br />

      {/* Recurring checkbox  */}
      <label htmlFor="ckboxReoccuring">Check for recurring expesse</label>
      <Checkbox
        id="ckboxReoccuring"
        checked={true}
        onChange={updateReoccuring}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      <br />

      <Button variant="contained" onClick={addExpense}>
        Add Expesse
      </Button>
    </form>
  );
};

export default ExpAdd;
