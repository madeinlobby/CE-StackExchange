import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/Inbox";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Hidden,
  IconButton,
  Tooltip,
  Badge,
  Button,
  ClickAwayListener,
  Typography,
  Zoom
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#ccefff",
      color: "rgba(0, 0, 0, 0.87)",
      width: 400,
      height: 450,
      fontSize: theme.typography.pxToRem(12),
      borderRadius: 10,
      border: "2px solid #dadde9",
    },
  }))(Tooltip);

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const showAllNotifications = () => {
    alert("لیست کامل پیام ها");
    //TODO:
    //go to all notifications page
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Hidden lgUp>
        <IconButton onClick={setNavOpenState(true)}>
          <MenuIcon />
        </IconButton>
      </Hidden>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <HtmlTooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="bottom-end"
            arrow
            interactive
            TransitionComponent={Zoom}
            title={
              <React.Fragment>
                <div style={{ padding: 10 }}>
                  <Typography color="inherit" align="center">
                    پیام‌های شما
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={showAllNotifications}
                  >
                    لیست کامل پیام ها
                  </Button>
                </div>
              </React.Fragment>
            }
          >
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleTooltipOpen}
            >
              <Badge color="secondary" max={10} badgeContent={9}>
                <InboxIcon />
              </Badge>
            </IconButton>
          </HtmlTooltip>
        </div>
      </ClickAwayListener>
    </AppBar>
  );
}
