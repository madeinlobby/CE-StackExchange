import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Hidden } from "@material-ui/core";
import NavBarContent from "./NavBarContent";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
  },
}));

export default function NavBar({openState, setNavOpenState}) {
  const classes = useStyles();

  return (
    <>
      <Hidden mdDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <NavBarContent />
        </Drawer>
      </Hidden>
      <Hidden lgUp>
        <Drawer
          onClose={setNavOpenState(false)}
          open={openState}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <NavBarContent />
        </Drawer>
      </Hidden>
    </>
  );
}
