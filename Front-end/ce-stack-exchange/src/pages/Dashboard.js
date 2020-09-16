import React from "react";
import { Box } from "@material-ui/core";
import NavBar from "../components/DashboardComponents/NavigationBar/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import DashboardHeader from "../components/DashboardComponents/DashboardHeader";
import { Route, Switch } from "react-router-dom";
import Profile from "../views/dashboardViews/Profile";
import Activities from "../views/dashboardViews/Activities";
import Credits from "../views/dashboardViews/Credits";
import PageNotFound from "../pages/errors/PageNotFound";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
      overflow: "hidden",
      marginTop: 30,
    },
  },
}));

export default function DashboardPage() {
  const [navOpen, setNavOpen] = React.useState(false);

  const setNavOpenState = (openState) => () => {
    setNavOpen(openState);
  };

  const classes = useStyles();

  return (
    <Box style={{ width: "100%" }}>
      <DashboardHeader setNavOpenState={setNavOpenState} />
      <NavBar openState={navOpen} setNavOpenState={setNavOpenState} />
      <div className={classes.content}>
        <Switch>
          <Route path="/users/" component={Credits} exact />
          <Route path="/users/profile" component={Profile} />
          <Route path="/users/activities" component={Activities} />
          <Route path="/users/credits" component={Credits} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Box>
  );
}
