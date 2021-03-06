import React, { useState, useEffect } from "react";
// text field imports
import TextField from "@material-ui/core/TextField";

// import for button
import Button from "@material-ui/core/Button";
import { FormControl, responsiveFontSizes } from "@material-ui/core";
import { isPropertySignature } from "typescript";
import { ContentPasteOutlined } from "@mui/icons-material";
import APIURL from "../../helpers/enviornment";

const ExpSearch = (props) => {
  const [searchItem, setSearchItem] = useState("");
  const [raw, setRaw] = useState([]);
  const [filtered, setFiltered] = useState();

  let handleChange = (e) => {
    //e.preventDefault()
    setSearchItem(e.target.value);
    console.log(searchItem);
  };

  let searchByName = () => {
    fetch(`${APIURL}/expense/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }), //end headers
    }) //end fetch
      .then((res) => res.json())
      .then((res) => setRaw(res))
      .then(
        setFiltered(
          raw.filter((expense) => {
            if (expense === "") {
              searchByName();
            }
            console.log("Filtered:", filtered);
            return expense.name === "IPL";
          })
        )
      );
    console.log("This is raw:", raw);
  }; // function

  return (
    <div>
      <TextField
        id="txtAmount"
        label="Amount"
        variant="standard"
        onChange={handleChange}
        required="true"
        helperText=""
      />
      <Button type="submit" color="secondary" onClick={searchByName}>
        Search
      </Button>
    </div>
  );
}; // end FC

export default ExpSearch;
