import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import Paper from '@material-ui/core/Paper';
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
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
    this.setState({data:this.state.letter.map((prop, key) => {
          console.log(prop)
          return {
            id: key,
            start:prop.start,
            end:prop.end,
            name:prop.name
          };
        })
      });
      console.log(data)
      }
  render() {
      var classes=this.props;
    return (
      <Paper className={classes.root}>
      <ReactTable
              data={this.state.data}
              columns={[
                {
                  Header: "Id",
                  accessor: "id"
                },
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Start",
                  accessor: "start"
                },
                {
                  Header: "End ",
                  accessor: "end"
                },
                {
                  Header: ""
                }
              ]}
              defaultPageSize={10}
              showPaginationTop
              showPaginationBottom={false}
              className="-striped -highlight"
            />
      </Paper>
    );
  }
}

export default withStyles(useStyles)(Front);
