import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Chip, Grid } from "@material-ui/core";

//sample tag list
const tags = [
  {
    label: "جاوا",
    href: "#java",
  },
  {
    label: "شیء گرایی",
    href: "#object-orientated",
  },
  {
    label: "ای پی",
    href: "#AP",
  },
];

const useStyles = makeStyles((theme) => ({
  container :{
    [theme.breakpoints.down('sm')]:{
        flexDirection:'column'
    }
  },
  card : {
    [theme.breakpoints.down('sm')]:{
        flexDirection :'row-reverse',
        height : 'auto'
    }
  }
}));

export default function QListItem() {
  const classes = useStyles();

  const QCardInfo = (color, bgColor, label, value) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      flexDirection="column"
      borderColor={color}
      border={2}
      borderRadius={3}
      width={70}
      height={70}
      className={classes.card}
    >
      <body1 style={{ color: color }}>{value}</body1>
      <body1 style={{ color: color }}>{label}</body1>
    </Box>
  );

  const Tag = (label, href) => (
    <Chip clickable label={label} component="a" href={href} size="small" />
  );

  const QInfo = (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
      width={225}
      mr={2}
    >
      {QCardInfo("#919993", "transparent", "vote", 0)}
      {QCardInfo("#32a852", "transparent", "answer", 6)}
      {QCardInfo("#919993", "transparent", "views", 23)}
    </Box>
  );

  const QContext = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      style={{ flexGrow: 1 }}
    >
      <Typography>"چرا جاوا امکان ارث بری از چند کلاس را نمیدهد؟"</Typography>
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item>{tags.map((tag) => Tag(tag.label, tag.href))}</Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <div></div>
        </Grid>
        <Grid item>
          <Typography variant="overline">علی علوی </Typography>
          <Typography variant="overline">_ پرسیده شده 2 ساعت پیش</Typography>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div style={{ margin: 100 }}>
      <Box
        bgcolor="white"
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="flex-start"
        height="80"
        className={classes.container}
      >
        {QInfo}
        {QContext}
      </Box>
    </div>
  );
}
