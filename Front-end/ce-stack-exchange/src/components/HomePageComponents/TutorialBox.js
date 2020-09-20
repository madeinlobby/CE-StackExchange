import { Paper, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "./animations.css";

const useStyles = makeStyles((theme) => ({
  tutorialBox: {
    borderRadius: 10,
    padding: 20,
  },
  tutorialImg: {
    width: "auto",
    height: 200,
    margin: 50,
  },
  tutuorialTxt: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: "90%",
  },
}));

export default function TutoriaBox(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <ScrollAnimation animateIn="bounceInUp">
        <Paper elevation={5} className={classes.tutorialBox}>
          <Grid container direction={props.right ? "row-reverse" : "row"}>
            <Grid item>
              <img src={props.img} className={classes.tutorialImg} />
            </Grid>
            <Grid item className={classes.tutuorialTxt}>
              <Typography
                variant="h4"
                style={{ marginBottom: 20 }}
                align={props.right ? "right" : "left"}
              >
                {props.title}
              </Typography>
              <Typography variant="h6" align={props.right ? "right" : "left"}>
                {props.body}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </ScrollAnimation>
    </Grid>
  );
}
