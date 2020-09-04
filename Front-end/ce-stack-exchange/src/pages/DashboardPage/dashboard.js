import React from "react";
import { Box, AppBar } from "@material-ui/core";
import NavBar from "../../components/DashboardComponents/NavigationBar/NavBar";
import Credits from "../../views/dashboardViews/Credits";
import { makeStyles } from "@material-ui/core/styles";
import DashboardHeader from "../../components/DashboardComponents/DashboardHeader";

const useStyles = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
      overflow: "hidden",
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
    <Box>
      <DashboardHeader setNavOpenState={setNavOpenState} />
      <NavBar openState={navOpen} setNavOpenState={setNavOpenState} />
      <div className={classes.content}>
        <Credits></Credits>
      </div>
    </Box>
  );
}
