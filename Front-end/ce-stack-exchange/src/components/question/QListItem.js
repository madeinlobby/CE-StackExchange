import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Chip, Grid } from "@material-ui/core";
const GREEN = "#32a852";
const DARK_GRAY = "#919993";
const GRAY = "#f0f0f0"

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  cardsContainer: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row-reverse",
      height: "auto",
      marginBottom: 5,
    },
  },
}));

export default function QListItem({Q}) {
  const classes = useStyles();

  const QCardInfo = (borderColor, color, bgColor, label, value) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      flexDirection="column"
      borderColor={borderColor}
      border={2}
      borderRadius={3}
      width={70}
      height={70}
      className={classes.cardsContainer}
      bgcolor={bgColor}
    >
      <body1 style={{color:(bgColor===GREEN?'white':color)}}>{value}</body1>
      <body1 style={{color:(bgColor===GREEN?'white':color)}}>{label}</body1>
    </Box>
  );

  const Tag = (label, href) => (
    <Chip clickable label={label} component="a" href={href} size="small" />
  );

  const QCommunityInfo = (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
      width={225}
      mr={2}
    >
      {QCardInfo(GRAY, DARK_GRAY, "transparent", "vote", Q.votes)}
      {QCardInfo(
        Q.answered ? GREEN : GRAY,
        Q.answered ? GREEN : DARK_GRAY,
        Q.approved ? GREEN : "transparent",
        "answer",
        Q.answers
      )}
      {QCardInfo(GRAY,DARK_GRAY, "transparent", "bounty", Q.bounty)}
    </Box>
  );

  const QMainInfo = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      style={{ flexGrow: 1 }}
    >
      <Typography gutterBottom>{Q.title}</Typography>
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item>{Q.tags.map((tag) => Tag(tag.label, tag.href))}</Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <div></div>
        </Grid>
        <Grid item>
          <Typography variant="overline">{Q.questioner}</Typography>
          <Typography variant="overline"> _ پرسیده شده در {Q.time}</Typography>
        </Grid>
      </Grid>
    </Box>
  );

  return (
      <Box
        bgcolor="white"
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="flex-start"
        height="80"
        className={classes.container}
        px={2}
        my={1}
      >
        {QCommunityInfo}
        {QMainInfo}
      </Box>
  );
}
