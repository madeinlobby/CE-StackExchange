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

function App() {
  const classes = useStyles();
  return (
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
    </div>
  );
}

export default App;
