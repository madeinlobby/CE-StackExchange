import React from "react";
import {
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  Divider,
  Box,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from "@material-ui/icons/BarChart";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonalInfoPreview from "../PersonalInfoPreview";

const navItems = [
  { href: "dashboard/reputation", icon: <BarChartIcon />, title: "اعتبارات" },
  { href: "dashboard/activity", icon: <ListAltIcon />, title: "فعالیت ها" },
  { href: "dashboard/profile", icon: <PersonIcon />, title: "پروفایل" },
];

const useStyles = makeStyles((theme) => ({
  list: {
    alignItems: "center",
  },
  personalInfoPreview: {
    [theme.breakpoints.up("lg")]: {
      marginTop: 60,
    },
  },
}));

export default function NavBarContent() {
  const classes = useStyles();

  const navBarItems = (
    <List className={classes.list}>
      {navItems.map((navItem, index) => (
        <React.Fragment key={index}>
          <ListItem button key={index}>
            <ListItemIcon>{navItem.icon}</ListItemIcon>
            <ListItemText primary={navItem.title} />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <>
      <div className={classes.personalInfoPreview}>
        <PersonalInfoPreview />
      </div>
      <Divider />
      {navBarItems}
    </>
  );
}
