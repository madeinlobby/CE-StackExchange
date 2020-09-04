import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Divider, Typography } from "@material-ui/core";
import PersonalInfoPreview from "../PersonalInfoPreview";

//sample description
const description = "ورودی ارشد 98 م از خیلی وقته عاشق AI بودم :)";

const useStyles = makeStyles((theme) => ({
  card : {
    marginTop: -15,
  }
}));

export default function ProfilePreview() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <PersonalInfoPreview />
        <Divider />
        <Typography variant="overline">{description}</Typography>
      </CardContent>
    </Card>
  );
}
