import React from "react";
import { Box } from "@material-ui/core";
import NavBar from "../../components/DashboardComponents/NavigationBar/NavBar";
import Credits from "../../views/dashboardViews/Credits";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  a: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
}));


export default function DashboardPage() {
  const classes = useStyles();

  return (
    <Box>
      <NavBar></NavBar>
      <div
        className={classes.a}
      >
        <Credits></Credits>
      </div>
    </Box>
  );
}
