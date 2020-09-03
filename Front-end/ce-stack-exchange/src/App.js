<<<<<<< HEAD
import React from "react";
import "./App.css";
import DashboardPage from "./pages/DashboardPage/dashboard";
=======
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Footer from "./components/general/website_footer"
import PrimarySearchAppBar from "./components/general/website_header"
import { Paper, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
>>>>>>> da1e4137fffc613f0a241aa300be6b3e9c10a299

function App() {
  const classes = useStyles();
  return (
<<<<<<< HEAD
    <div className="App">
      <DashboardPage></DashboardPage>
=======
    <div className={classes.root}>
      <PrimarySearchAppBar />
      {/* all content in this div */}
      <div>
        {/* <Paper> */}
        <Box minHeight={window.innerHeight - 300}>
          {/* //TODO you should change this minHeight responsively */}
          <center>
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
            content is here<br />
          </center>
        </Box>
        {/* </Paper> */}
      </div>
      <Footer />
>>>>>>> da1e4137fffc613f0a241aa300be6b3e9c10a299
    </div>
  );
}

export default App;
