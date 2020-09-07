import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Box } from "@material-ui/core";

//some sample data
const username = "علی76";
const fullname = "علی علوی";
const bgColor = "AQUA";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        backgroundColor: bgColor,
        fontSize: 35,
        marginBottom : 20,
      }
}));

export default function Profile() {
  const classes = useStyles();

  const getAvatarText = (name) => {
    return username
      .split(" ")
      .map((str) => (str ? str[0] : ""))
      .join(" ");
  };

  return (
    <Box display="flex" alignItems="center"  p={2} flexDirection="column">
        <Avatar className={classes.avatar}>{getAvatarText()}</Avatar>
        <Typography variant="h5" gutterBottom >{username}</Typography>
        <Typography variant="body2" gutterBottom >{fullname}</Typography>
        </Box>
  );
}
