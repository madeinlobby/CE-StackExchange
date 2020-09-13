import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Divider, Typography } from "@material-ui/core";
import PersonalInfoPreview from "../PersonalInfoPreview";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: -15,
    marginBottom: 10,
  },
}));

export default function ProfilePreview({
  username,
  firstname,
  lastname,
  aboutMe,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <PersonalInfoPreview
          username={username}
          firstname={firstname}
          lastname={lastname}
        />
        <Divider />
        <Typography variant="overline" style={{ alignSelf: "center" }}>
          {aboutMe}
        </Typography>
      </CardContent>
    </Card>
  );
}
