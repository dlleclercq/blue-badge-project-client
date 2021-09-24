import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const Login = (props) => {
  const history = useHistory();
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
    if (!email || !password) return;

    e.preventDefault();
    fetch("http://localhost:3000/user/login", {
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
        handleClick();
        props.updateToken(data.sessionToken);
      });
  };

  function handleClick() {
    history.push("/ExpSplash");
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText color="primary">
            To login to iSpend, please enter the following:
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
            <Button onClick={handleSubmit} type="submit" color="primary">
              Login
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Login;
