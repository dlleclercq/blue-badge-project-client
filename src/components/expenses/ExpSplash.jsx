import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ExpAdd from "./ExpAdd";

const ExpSplash = (props) => {
  const [showButton, setShowButton] = useState(false);

  const handleClick = (e) => {
    setShowButton(true);
  };

  const { token } = props;

  const drawerWidth = 0;

  return (
    <div>
      <Button onClick={handleClick}>
        <AddIcon />
      </Button>
      {/* {showButton === true && <ExpAdd token={token}/>}*/}
      {showButton === true && (
        <div>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
              }}
            >
              <Toolbar>
                <Typography variant="h6" noWrap component="div">
                  Add New Expense
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="permanent"
              anchor="top"
            >
              <Toolbar />
            </Drawer>
            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
              <Toolbar />
              <Typography paragraph>
                <ExpAdd token={token} />
              </Typography>
              <Typography paragraph></Typography>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default ExpSplash;
