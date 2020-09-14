import React, { Children } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Chip, Grid } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

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
  doneIcon: {
    [theme.breakpoints.up("md")]: {
      fontSize: 60,
    },
  },
}));

export default function AListItem({ A }) {
  const classes = useStyles();

  const ACardInfo = (borderColor, color, children) => (
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
    >
      {children.map((child) => (
        <body1 style={{ color: color, fontWeight: 1000 }}>{child}</body1>
      ))}
    </Box>
  );

  const Tag = (label, href) => (
    <Chip clickable label={label} component="a" href={href} size="small" />
  );

  const ACommunityInfo = (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
      width={155}
      mr={2}
    >
      {ACardInfo("transparent", A.isAnswerApproved ? GREEN : GRAY, [
        <DoneIcon className={classes.doneIcon} />,
      ])}
      {ACardInfo(GRAY, DARK_GRAY, [
        A["number of upvotes"] - A["number of downvotes"],
        "vote",
      ])}
    </Box>
  );

  const AMainInfo = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      style={{ flexGrow: 1 }}
    >
      <Typography gutterBottom>{A["title"]}</Typography>
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item>
          {A["tags array"].map((tag) => Tag(tag.label, tag.href))}
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <div></div>
        </Grid>
        <Grid item>
          <Typography variant="overline">
            پرسیده شده در {A["date of issue"]}
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
      {ACommunityInfo}
      {AMainInfo}
    </Box>
  );
}
