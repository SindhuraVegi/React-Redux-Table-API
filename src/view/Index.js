import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import Table from 'react-bootstrap/Table';
import '../App.css';
import {
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";
import { makeStyles, withStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  Table:{
      minWidth: 500,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const App = (props) => {
  const dataStore = useSelector((state) => state.Data);
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((responseData) => {
        console.log("data from route", responseData);
        props.reducerData(responseData);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const simulateSlowNetworkRequest = () =>
    new Promise((resolve) => setTimeout(resolve, 500));

  useEffect(() => {
    let isCancelled = false;
    simulateSlowNetworkRequest().then(() => {
      if (!isCancelled) {
        setData(dataStore[0]);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [dataStore]);
  return (
      <div className="App">
        <h2>JSONPlaceholder</h2>
        <h4>jsonplaceholder!</h4>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">User ID</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Body</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow align="center" key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.userId}
              </StyledTableCell>
              <StyledTableCell align="center">{row.title}</StyledTableCell>
              <StyledTableCell align="center">{row.id}</StyledTableCell>
              <StyledTableCell align="center">{row.body}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
  );
};
const mapStateToProps = (props) => {
  return {
    data: props.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reducerData(data) {
      dispatch({ type: "DATA_FETCH", data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
