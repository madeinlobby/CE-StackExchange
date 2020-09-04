import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Hidden, Button, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    zIndex: theme.zIndex.drawer + 1,
    height: 50,
    dispaly: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    paddingRight: 30,
  },
}));

export default function DashboardPage({ setNavOpenState }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Hidden lgUp>
        <IconButton onClick={setNavOpenState(true)}>
          <MenuIcon />
        </IconButton>
      </Hidden>
      <IconButton>
        <NotificationsIcon />
      </IconButton>
    </AppBar>
  );
}
