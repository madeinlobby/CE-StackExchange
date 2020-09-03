import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Hidden, Button } from "@material-ui/core";
import NavBarContent from "./NavBarContent";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const [navOpen, setNavOpen] = React.useState(false);

  const setNavOpenState = (openState) => () => {
    setNavOpen(openState);
  };

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
      <Button onClick={setNavOpenState(true)}>☰</Button>
        <Drawer
          onClose={setNavOpenState(false)}
          open={navOpen}
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
