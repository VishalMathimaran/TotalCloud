import React, { Component }  from 'react';
import './styles/style.css';
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import './styles/style.css'
import {Bar} from 'react-chartjs-2';
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
      label: 'Sales',
      type:'line',
      data: [51, 65, 40, 49, 60, 37, 40],
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2'
    },{
      type: 'bar',
      label: 'Visitor',
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'
    }]
};

const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ]
  }
};

const plugins = [{
    afterDraw: (chartInstance, easing) => {
        const ctx = chartInstance.chart.ctx;
        ctx.fillText("This text drawn by a plugin", 100, 100);
    }
}];
const frontStyle = makeStyles({
  root: {
    width: '50%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});
class Front extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      letter:[]
    };
  }
  convertDate=(dateString)=>{
     // Oct 23
var dateParts = dateString.split("/");
const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// month is 0-based, that's why we need dataParts[1] - 1
var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  return dateObject.getDate() + "/" + months[dateObject.getMonth()];
  }
  async componentWillMount() {
      console.log("component mount")
      const {data} = await axios.get(`http://localhost:5000/searching`)
      this.setState({letter: data})
      this.setState({data: this.state.letter.map((customer,id) => (
        <tr key={id}>
          <th align='left'>{customer.id-1}</th>
          <td align='left'>{customer.name}</td>
          <td align='right'>
            {customer.start}
          </td>
          <td align='right'>
            {customer.end}
          </td>
        </tr>
      ))})
      }
  render() {
    var {classes}=this.props;
    return (
      <Paper className={classes.root} align="center">
        <Table className="table"  aria-label="simple table" style={{ width: "auto", tableLayout: "auto" }}>
          <TableHead>
            <TableRow className="bottom">
              <TableCell align="right"> </TableCell>
              <TableCell className="name" align="left"><b>intern-assignment</b></TableCell>
              <TableCell align="right"><span className="text">Start date</span></TableCell>
              <TableCell align="right"><span className="text">End date</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.letter.map(row => (
              <TableRow key={ row.id}>
                <TableCell align = "left" className='index' component="th" scope="row">
                  {row.id-1}
                </TableCell>
                <TableCell className="name" align="left"><Checkbox
        value={"checked"+row.name}
        inputProps={{
          'aria-label': 'uncontrolled-checkbox',
        }}
      />{row.name}</TableCell>
                <TableCell align="right">{this.convertDate(row.start)}</TableCell>
                <TableCell align="right">{this.convertDate(row.end)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Bar
           data={data}
           options={options}
           plugins={plugins}
         />
      </Paper>
    );
  }
}

export default withStyles(frontStyle)(Front);
