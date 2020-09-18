import React from "react";
import {
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  Divider,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from "@material-ui/icons/BarChart";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonalInfoPreview from "../PersonalInfoPreview";
import { Link } from "react-router-dom";

const navItems = [
  { path: "users/credits", icon: <BarChartIcon />, title: "اعتبارات" },
  { path: "users/activities", icon: <ListAltIcon />, title: "فعالیت ها" },
  { path: "users/profile", icon: <PersonIcon />, title: "پروفایل" },
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
          <Link to={navItem.path} style={{ textDecoration: "none" }}>
            <ListItem button key={index}>
              <ListItemIcon>{navItem.icon}</ListItemIcon>
              <ListItemText primary={navItem.title} />
            </ListItem>
          </Link>
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
