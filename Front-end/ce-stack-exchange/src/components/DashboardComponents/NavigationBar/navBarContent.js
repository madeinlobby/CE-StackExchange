import React from "react";
import {
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  Divider,
  Avatar,
  Box,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from "@material-ui/icons/BarChart";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";

//some sample data
const username = "علی علوی";
const description = "ارشد هوش مصنوعی";
const bgColor = "AQUA";

const navItems = [
  { href: "dashboard/reputation", icon: <BarChartIcon />, title: "اعتبارات" },
  { href: "dashboard/activity", icon: <ListAltIcon />, title: "فعالیت ها" },
  { href: "dashboard/profile", icon: <PersonIcon />, title: "پروفایل" },
];

const useStyles = makeStyles((theme) => ({
  list: {
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: bgColor,
    fontSize: 35,
    marginBottom : 20
  },
}));

export default function NavBarContent() {
  const classes = useStyles();

  const getAvatarText = (name) => {
    return username
      .split(" ")
      .map((str) => (str ? str[0] : ""))
      .join(" ");
  };

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
      <Box display="flex" alignItems="center"  p={2} flexDirection="column">
        <Avatar className={classes.avatar}>{getAvatarText()}</Avatar>
        <Typography variant="h5" gutterBottom >{username}</Typography>
        <Typography variant="body2" gutterBottom >{description}</Typography>
      </Box>
      <Divider />
      {navBarItems}
    </>
  );
}
