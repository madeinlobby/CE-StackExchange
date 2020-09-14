import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Chip, Grid } from "@material-ui/core";
const GREEN = "#5eba7d";
const DARK_GRAY = "#919993";
const GRAY = "#f0f0f0";

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

export default function QListItem({ Q, isForOwn }) {
  const classes = useStyles();

  const QCardInfo = (borderColor, color, bgColor, children) => (
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
      {children.map((child) => (
        <body1
          style={{
            color: bgColor === GREEN ? "white" : color,
            fontWeight: 1000,
          }}
        >
          {child}
        </body1>
      ))}
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
      width={155}
      mr={2}
    >
      {QCardInfo(
        Q["number of answers"] !== 0 ? GREEN : GRAY,
        Q["number of answers"] !== 0 ? GREEN : DARK_GRAY,
        Q["isAnswerApproved"] ? GREEN : "transparent",
        [Q["number of answers"], "answer"]
      )}
      {QCardInfo(GRAY, DARK_GRAY, "transparent", [
        Q["number of upvotes"] - Q["number of downvotes"],
        "vote",
      ])}
    </Box>
  );

  const QMainInfo = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      style={{ flexGrow: 1 }}
    >
      <Typography gutterBottom>{Q["title"]}</Typography>
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item>
          {Q["tags array"].map((tag) => Tag(tag.label, tag.href))}
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <div></div>
        </Grid>
        <Grid item>
          {isForOwn ? (
            <Typography variant="overline">
              {Q["asker name"] + " _ "}
            </Typography>
          ) : null}
          <Typography variant="overline">
            پرسیده شده در {Q["date of issue"]}
          </Typography>
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
