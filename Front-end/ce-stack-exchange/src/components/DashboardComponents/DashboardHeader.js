import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from '@material-ui/icons/Inbox';
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Hidden, IconButton, Tooltip, Badge } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: 50,
    dispaly: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    paddingRight: 30,
  },
}));

export default function DashboardHeader({ setNavOpenState }) {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Hidden lgUp>
        <IconButton onClick={setNavOpenState(true)}>
          <MenuIcon />
        </IconButton>
      </Hidden>
      <Tooltip title='Inbox'>
      <IconButton>
      <Badge color='secondary' max={10} badgeContent={9}>
        <InboxIcon />
        </Badge>
      </IconButton>
      </Tooltip>
    </AppBar>
  );
}
