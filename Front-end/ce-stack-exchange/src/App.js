import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Footer from "./components/general/website_footer"
import PrimarySearchAppBar from "./components/general/website_header"
import { Paper, Box } from '@material-ui/core';
import SignUpWindow from "./components/login_and_signup/signup-window"
import LoginWindow from './components/login_and_signup/login-window';
import QuestionPage from './components/question_page/question-page';
import CommunityPage from './components/communities_page/commiunities-page';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    [theme.breakpoints.down("md")]: {
      width: "100%"
    },
    width: "70%"
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PrimarySearchAppBar />
      {/* all content in this div */}
      <Paper elevation={10} style={{ alignSelf: "center" }} className={classes.paper}>
        <Box minHeight={window.innerHeight - 300}>
          {/* //TODO you should change this minHeight responsively */}
          {/* <QuestionPage /> */}
          {/* <SignUpWindow /> */}
          <CommunityPage />
        </Box>
      </Paper>
      <Footer />
    </div >
  );
}

//TODO
//<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//the line above should be copied somewhere visible to attribute icons author

export default App;
