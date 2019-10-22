import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 200,

  },
});

class Front extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  async componentWillMount() {
      console.log("component mount")
      const {data} = await axios.get(`http://localhost:5000/searching`)
      this.setState({data: data})
      console.log(data)
      }
  render() {
      var classes=this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow >
              <TableCell><b>ID</b></TableCell>
              <TableCell align="right"><b>Name</b></TableCell>
              <TableCell align="right"><b>Start</b></TableCell>
              <TableCell align="right"><b>End</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.start}</TableCell>
                <TableCell align="right">{row.end}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(Front);
