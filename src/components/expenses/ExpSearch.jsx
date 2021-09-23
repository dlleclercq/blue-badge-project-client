import React, { useState, useEffect } from "react";
// text field imports
import TextField from "@material-ui/core/TextField";

// import for button
import Button from "@material-ui/core/Button";
import { FormControl, responsiveFontSizes } from "@material-ui/core";
import { isPropertySignature } from "typescript";
import { ContentPasteOutlined } from "@mui/icons-material";

const ExpSearch = (props) => {

    const [raw, setRaw] = useState([]);
    // const [filtered, setFiltered] = useState(Object.assign(raw));
    // let searchResults = [...raw]; 
    
    let searchByName = () => {
        fetch(`http://localhost:3000/expense/all`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }) //end headers 
        })//end fetch
        .then((res) => res.json())
        .then((res) =>setRaw(...res))
        // .then((res) => res.json())
        // .then((res) => console.log('This is res', res))
        // .then((res) => setRaw(res))
        console.log('This is raw:', raw)
    } // function
    
    
    
    return ( 
        <div>
            <button type="submit" onClick={searchByName}>Search</button>
        </div>
     );
} // end FC 
 
export default ExpSearch;