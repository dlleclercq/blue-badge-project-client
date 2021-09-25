import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useForkRef } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { Button } from "@material-ui/core";
import ExpEdit from "../expenses/ExpEdit";
import ExpDel from "../expenses/ExpDel";
import APIURL from "../../helpers/enviornment";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: false,
    label: "Due Date",
  },
  {
    id: "reoccuring",
    numeric: false,
    disablePadding: false,
    label: "Reoccuring",
  },
  {
    id: "edit",
    numeric: false,
    disablePadding: false,
    label: "Edit",
  },
  {
    id: "delete",
    numeric: false,
    disablePadding: false,
    label: "Delete",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function ExpenseTable(props) {
  const getExpense = () => {
    console.log(props);
    if (!props.token) return;
    fetch(`${APIURL}/expense/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => setRows(data));
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("amount");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    getExpense();
  }, [props.token]);
  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row?.name);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row?.name)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row?.name}
                      selected={isItemSelected}
                    >
                      <TableCell align="left">{row?.name}</TableCell>
                      <TableCell align="left">{row?.category}</TableCell>
                      <TableCell align="left">$ {row?.amount}</TableCell>
                      <TableCell align="left">{row?.dueDate}</TableCell>
                      <TableCell align="left">
                        {
                          (row.reoccuring = false ? (
                            <CheckBox disabled color="primary" />
                          ) : (
                            <CheckBox color="primary" />
                          ))
                        }
                      </TableCell>
                      <TableCell align="left"><Button><ExpEdit getExpense={getExpense} token={props.token} data={row}/></Button></TableCell>
                      <TableCell align="left"><Button><ExpDel getExpense={getExpense} token={props.token} data={row}/></Button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      {/* <form>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Signup
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Signup</DialogTitle>
        <DialogContent>
          <DialogContentText color="primary">
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
        </form> */}
    </Box>
  );
}
