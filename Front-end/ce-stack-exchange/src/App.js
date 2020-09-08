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
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PrimarySearchAppBar />
      {/* all content in this div */}
      <Paper elevation={10} style={{ alignSelf: "center" }} style={{ width: "60%" }}>
        {/* TODO make this 60% responsive for small displays */}
        <Box minHeight={window.innerHeight - 300}>
          {/* //TODO you should change this minHeight responsively */}
          <QuestionPage />
        </Box>
      </Paper>
      <Footer />
    </div >
  );
}

export default App;
