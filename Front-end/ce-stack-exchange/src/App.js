import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";

import HomePage from "./pages/HomePage";
import QuestionsPage from "./pages/QuestionsPage";
import AskQuestion from "./pages/AskQuestion";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/errors/PageNotFound";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "90%",
    },
    width: "65%",
  },
}));

function App() {
  const classes = useStyles();
  return (
    //   <div className={classes.root}>
    //   <Header />
    //   <Paper elevation={10} style={{ alignSelf: "center", minHeight: window.innerHeight - 288 }} className={classes.paper}>

    //     {/* <QuestionPage /> */}

    //     {/* <SignUpWindow /> */}

    //     {/* <CommunityPage /> */}

    //     {/* <LoginWindow /> */}

    //   </Paper>
    //   <Footer />
    // </div >
    <div className={classes.root}>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/questions" component={QuestionsPage} />
        <Route path="/ask" component={AskQuestion} />
        <Route path="/users" component={Dashboard} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

//TODO
//<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//the line above should be copied somewhere visible to attribute icons author

export default App;
