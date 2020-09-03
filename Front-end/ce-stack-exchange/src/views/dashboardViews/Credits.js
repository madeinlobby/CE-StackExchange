import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "../../components/DashboardComponents/Chart";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

//sample reputation
const reputation = 69;

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: 50,
  },
  paper: {
    height: "100%",
    padding: 50,
    boxSizing: "border-box",
    display: 'flex',
    flexDirection : 'column',
    justifyContent : 'space-between'
  },
  innerPaper :{
    height: "80%",
    backgroundImage : 'linear-gradient(#00fff2,#68c0d9)',
    display: 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    marginTop : 10
  }
}));

export default function Credits() {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.grid}>
      <Grid item lg={9} xs={12}>
        <Paper className={classes.paper}>
          <Chart></Chart>
        </Paper>
      </Grid>
      <Grid item lg={3} xs={12}>
        <Paper className={classes.paper}>
          <Typography gutterBottom>
            <EmojiEventsIcon/> اعتبار کل 
          </Typography>
          <Paper className={classes.innerPaper}><Typography variant='h1' style={{color:'#454545'}} >{reputation}</Typography></Paper>
        </Paper>
      </Grid>
      <Grid item lg={12} xs={12}>
        <Paper className={classes.paper}>
          <Typography align={"left"}>گزارش ها</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
