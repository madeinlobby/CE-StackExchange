import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Box } from "@material-ui/core";

const BG_COLOR = "AQUA";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: BG_COLOR,
    fontSize: 35,
    marginBottom: 20,
  },
}));

export default function PersonalInfoPreview({ username, firstname, lastname }) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" p={2} flexDirection="column">
      <Avatar className={classes.avatar}>
        {firstname[0] + " " + lastname[0]}
      </Avatar>
      <Typography variant="h5" gutterBottom>
        {username}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {firstname + " " + lastname}
      </Typography>
    </Box>
  );
}
