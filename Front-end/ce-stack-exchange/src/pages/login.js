import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../components/general/website_footer"
import Header from "../components/general/website_header"
import { Paper } from '@material-ui/core';
import loginWindow from '../components/login_and_signup/login-window';

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

export default function Login() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Header />
                <Paper
                    elevation={10}
                    style={{
                        alignSelf: "center",
                        minHeight: window.innerHeight - 288,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    }}
                    className={classes.paper}
                >

                    <loginWindow />

                </Paper>
                <Footer />
            </div >
            {/* <div className={classes.root}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/questions" component={QuestionsPage} />
          <Route path="/ask" component={AskQuestion} />
          <Route path="/users" component={Dashboard} />
          <Route component={PageNotFound} />
        </Switch>
      </div> */}
        </div>
    );
}
