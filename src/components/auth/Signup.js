import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      body: JSON.stringify({
        user: { email: email, passwordhash: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
      });
    console.log(email, password);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Signup
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Signup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join iSpend, please enter the following:
          </DialogContentText>

          <form noValidate autoComplete="off">
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              input
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="passwordhash"
              label="Password"
              type="password"
              input
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>

        <DialogActions>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Signup
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signup;
