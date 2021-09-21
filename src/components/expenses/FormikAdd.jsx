import React from 'react';
import { Formik, Field, useField } from 'formik';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/************************** 
    *** Form Validaiton ***
***************************/
const FormikAdd = (props) => {

    const MyTextField = ({ placeholder, ...props }) => {
        const [field, meta] = useField();
        const errorText = meta.error && meta.touched ? meta.error : ''; 
        return (
            <TextField placeholder={placeholder} {...field} helperText={errorText} /> 
        )
    };


/*********************
    *** Form Input ***
 *********************/

    return (
        <div>
            <Formik 
            initialValues={{
                category: '',
                name: '',
                amount: '',
                dueDate: '',
                reoccuring: '', 
            }}
            
            onSubmit={(data, {setSubmitting}) => {
                setSubmitting(true);
                console.log("submit", data);
                setSubmitting(false);
            }}
            >
                {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>

                    <FormControl variant="filled" sx={{ m: 0, minWidth: 190 }}>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                        labelId="category"
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
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
                    <br/>
                    
                    <Field 
                        name="name"
                        value={values.name}
                        type="input"
                        as={TextField}
                        variant="filled"
                        label="Payee Name"
                    />
                    <br />

                    <Field 
                        name="amount"
                        value={values.amount}
                        type="input"
                        as={TextField}
                        variant="filled"
                        label="Payment Amount"
                    />
                    <br />

                    <Field 
                        name="dueDate"
                        value={values.dueDate}
                        type="input"
                        as={TextField}
                        variant="filled"
                        label="Due Date"
                    />
                    <br />

                    <FormControl variant="filled" sx={{ m: 0, minWidth: 190 }}>
                        <InputLabel id="category">Recurring</InputLabel>
                        <Select
                        labelId="Recurring"
                        id="reoccuring"
                        name="reoccuring"
                        value={values.reoccuring}
                        onChange={handleChange}
                        >                        
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <br />

                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <div>
                        <Button type="submit">Add</Button>
                    </div>                    
                </form>
            )} 
            </Formik>
        </div>
     );
}
 
export default FormikAdd;