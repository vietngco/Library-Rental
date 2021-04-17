import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {AppBar, Tabs, Tab, Typography, Box} from '@material-ui/core';
// import { TabPanel } from '@material-ui/lab';
import {useState, useEffect} from 'react';
import Chart from "react-google-charts";
import Icon from "@material-ui/core/Icon";

import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    tabs:{

    },
    tab:{
        textcolor: 'green',
        color: 'purple'
    }
  }));

export default function Report(){

    const [noOfUser, setNoOfUser] = useState({});
    const [noOfLoans, setNoOfLoans] = useState({});
    const [pieData, setpiedata] = useState({});

const [noOfEmployees, setnoOfEmployees] = useState({});
const [avgAnnual, setavgAnnual] = useState({});
const [avgHourly, setavgHourly] = useState({});
const [BarData, setBardata] = useState({});
const [EpieData, setEpiedata] = useState({});

useEffect(() =>{
  EfetchData(new Date('2021-03-18T21:11:54'), new Date());
}, [])



    useEffect(() =>{
        fetchData(new Date('2021-03-18T21:11:54'), new Date());
    }, [])

    function fetchData(selectedDate,selectedDate2){
        console.log(selectedDate.toString(), selectedDate2.toString());
        fetch(`http://localhost:5000/api/reports/fetchusersdate?date1=${encodeURIComponent(selectedDate.toISOString())}&date2=${encodeURIComponent(selectedDate2.toISOString())}`)
        .then( response => response.json() ).then(res => setNoOfUser(res));
        fetch('https://uhlib.cc/api/reports/fetchusersloans')
        .then( response => response.json() ).then(res => setNoOfLoans(res));
        fetch('https://uhlib.cc/api/reports/fetchpieitems')
        .then( response => response.json() ).then(res => setpiedata(res));
        //setpiedata(piedatArray)

    }
    function EfetchData(selectedDate3,selectedDate4){
      fetch(`http://localhost:5000/api/reports/fetchTotalEmp?date3=${encodeURIComponent(selectedDate3.toISOString())}&date4=${encodeURIComponent(selectedDate4.toISOString())}`)
      .then( response => response.json() ).then(res => setnoOfEmployees(res));
      fetch(`http://localhost:5000/api/reports/fetchAnnualAvg?date3=${encodeURIComponent(selectedDate3.toISOString())}&date4=${encodeURIComponent(selectedDate4.toISOString())}`)
      .then( response => response.json() ).then(res => setavgAnnual(res));
      fetch(`http://localhost:5000/api/reports/fetchHourlyAvg?date3=${encodeURIComponent(selectedDate3.toISOString())}&date4=${encodeURIComponent(selectedDate4.toISOString())}`)
      .then( response => response.json() ).then(res => setavgHourly(res));
      fetch('http://localhost:5000/api/reports/fetchBaritems')
      .then( response => response.json() ).then(res => setBardata(res));
      fetch(`http://localhost:5000/api/reports/fetchEpieitems?date3=${encodeURIComponent(selectedDate3.toISOString())}&date4=${encodeURIComponent(selectedDate4.toISOString())}`)
      .then( response => response.json() ).then(res => setEpiedata(res));
    }

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      
    };

    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-03-18T21:11:54'));
    const [selectedDate2, setSelectedDate2] = React.useState(new Date());
    const [selectedDate3, setSelectedDate3] = React.useState(new Date('2021-03-18T21:11:54'));
    const [selectedDate4, setSelectedDate4] = React.useState(new Date());
    
    const handleDateChange = (date) => {
      console.log(date.toISOString());
        setSelectedDate(date);
        fetchData(date, selectedDate2);
      };

    const handleDateChange2 = (date) => {
        console.log('selected date',date.toString());
        setSelectedDate2(date);
        fetchData(selectedDate,date);
      };
      const handleDateChange3 = (date) => {
        setSelectedDate3(date);
        EfetchData(date, selectedDate4);
      };
      
      const handleDateChange4 = (date) => {
        setSelectedDate4(date);
        EfetchData(selectedDate3,date);
      };
    return <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" />

{/* https://material-ui.com/components/tabs/ */}
        <AppBar position="static">
            <Tabs value={"1"} onChange={handleChange} aria-label="simple tabs example" centered>
                <Tab label="Item One" {...a11yProps(0)} className={classes.tab}/>
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} onChange={handleChange} index={0}>
            Item One


            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item className="" xs={12}>
                    <Paper >
                        <h1>Report  {selectedDate.toISOString()}</h1>
                        
                    </Paper>
                </Grid>
                <Grid item className="" xs={12}>
                    <Paper >
                        <h3>Registered users {noOfUser.count} </h3>
                        
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper >
                    <p>Number of loans  {noOfLoans.data}</p>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <h3>Total revenue </h3>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper>
                        <h3>Items per library</h3>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper>
                    <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={pieData}
                            options={{
                                title: 'Items loaned',
                                is3D: true
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                    </Paper>
                    
                </Grid>


                        
        </Grid>


 {/* Date picker  */}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
 


 
<MuiPickersUtilsProvider utils={DateFnsUtils}>

<KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate2}
          onChange={handleDateChange2}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>    

    {/* Date picker  */}

</TabPanel>
        <TabPanel value={value} onChange={handleChange} index={1}>

        <Transaction_report/>
</TabPanel>
        <TabPanel value={value} onChange={handleChange} index={2}>
        <Paper>
            Item Three
            <Grid item xs={12}>

                    <h3>Total number of employees: {noOfEmployees.data} </h3>
                
            </Grid>
            <Grid item xs={12}>
                        <h3>Average hourly rate: ${avgHourly.data} </h3>
                  
                </Grid>
            <Grid item xs={12}>
              
                    <h3>Average annual wage: ${avgAnnual.data} </h3>
             
            </Grid>
            <Grid item xs={12}>
     
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={BarData}
              options={{
                chart: {
                  title: 'Each Library Information',
                  subtitle: 'Showing employees and transactions of each library by it\'s ID',
                },
              }}
              rootProps={{ 'data-testid': '2' }}
            />
     
            </Grid>
            <Grid item xs={12}>
      
                    <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={EpieData}
                            options={{
                                title: 'Type of Employees',
                                is3D: true
                            }}
                            rootProps={{ 'data-testid': '3' }}
                            />
        
                 
                </Grid>
                </Paper>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate3}
          onChange={handleDateChange3}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        </MuiPickersUtilsProvider>
 


 
<MuiPickersUtilsProvider utils={DateFnsUtils}>

<KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate4}
          onChange={handleDateChange4}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>  
</TabPanel>
    </div>;
}




function TabONE(){return <p>TAB ONE</p>}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }



  // item 2 
  class Transaction_report extends React.Component {
    state = {
      data_rev:[] ,
      data_count:[],
      summary: {
        count:0,
        total:0
      }
    }
    componentDidMount(){ // defualt 
      console.log("amount the component")
      this.getData_rev("2021-04-01", "2021-04-30")
      this.getData_count("2021-04-01", "2021-04-30")
      this.getSummary("2021-04-01", "2021-04-30")
    }
    date_change (startdate, enddate){
      console.log("Date changed, updated the data")
      this.getData_rev(startdate, enddate)
      this.getData_count(startdate, enddate)
      this.getSummary(startdate, enddate)
    }
    getData_rev = async (startdate, enddate) =>{
      const url = `http://localhost:5000/api/reports/trans_rev/${startdate}/${enddate}`
      const res = await fetch(url)
      const json = await res.json()
      console.log("this is json", json)
      // update the state : data 
      this.setState({data_rev:json})
    }
    getData_count = async (startdate, enddate) =>{
      const url = `http://localhost:5000/api/reports/trans_count/${startdate}/${enddate}`
      const res = await fetch(url)
      const json = await res.json()
      console.log("this is json", json)
      this.setState({data_count:json})
    }
    getSummary = async (start, end)=>{
      const url = `http://localhost:5000/api/reports/trans_total/${start}/${end}`
      const res = await fetch(url)
      const json = await res.json()
      this.setState({summary:json})
    }
    render(){
      return (
        <div class="ui center aligned basic segment">
        <div>
          <Date_start ondate_change={this.date_change.bind(this)}/>
          <div class="ui placeholder segment">
          <div class="ui two column stackable center aligned grid">
            <div class="ui vertical divider">And</div>
            <div class="middle aligned row">
              <div class="column">
                <div class="ui icon header">
                  <i class="search icon"></i>
                  TOTAL TRANSACTIONS: {this.state.summary.count}
                </div>
                <div class="field">
                  <div class="ui search">
                    
                    <div class="results"></div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="ui icon header">
                  <i class="dollar sign icon"></i>
                  TOTAL REVENUE : {this.state.summary.total}
                </div>
                
              </div>
            </div>
          </div>
        </div>
          <Chart
            width={800}
            height={'300px'}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["date_label", "count"],...this.state.data_count]
            }
            options={{
              title: 'TRANSACTION_COUNT',
              hAxis: { title: 'Day', titleTextStyle: { color: '#333' } },
              vAxis: { minValue: 0 },
              chartArea: { width: '70%', height: '70%' },
            }}
          />
          <Chart
            width={800}
            height={300}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["date_label", "count"],...this.state.data_count]
            }
            options={{
              title: 'count',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Total Population',
                minValue: 0,
              },
              vAxis: {
                title: 'City',
              },
            }}
            legendToggle
          />
          <Chart
            width={800}
            height={'300px'}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["date_label", "Revenue"],...this.state.data_rev]
            }
            options={{
              title: 'REVENUES',
              hAxis: { title: 'Day', titleTextStyle: { color: '#333' } },
              vAxis: { minValue: 0 },
              // For the legend to fit, we make the chart area smaller
              chartArea: { width: '70%', height: '70%' },
              // lineWidth: 25
            }}
          />
          <Chart
            width={800}
            height={300}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["date_label", "count"],...this.state.data_rev]
            }
            options={{
              title: 'revuenues',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Total Population',
                minValue: 0,
              },
              vAxis: {
                title: 'City',
              },
            }}
            legendToggle
          />
        </div>
        </div>
      )
    }
  }

  const Date_start = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const fetch_url = (date)=>{
     
      var sd = new Date(startDate);
      var year=sd.getFullYear();
      var month=sd.getMonth()+1 //getMonth is zero based;
      var day=sd.getDate();
      var sd=year+"-"+month+"-"+day;

      var ed = new Date(endDate);
      var year=ed.getFullYear();
      var month=ed.getMonth()+1 //getMonth is zero based;
      var day=ed.getDate();
      var ed=year+"-"+month+"-"+day;

      props.ondate_change(sd, ed)
    }
    return (
      <div>
        <DatePicker selected={startDate} 
            onChange={date => setStartDate(date)}
          	dateFormat='yyyy/MM/dd'
            onCalendarClose={fetch_url}
        />
        <DatePicker selected={endDate} 
          onChange={date => setEndDate(date)} 
          onCalendarClose={fetch_url}
        />
      </div>
    );
  };



   