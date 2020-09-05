import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Chip, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function QListItem() {
  const classes = useStyles();

  return (
    <div style={{ margin: 100 }}>
      <Box
        bgcolor="white"
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="flex-start"
        height="80"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          width={"20%"}
          mr={2}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexDirection="column"
            borderColor="#919993"
            border={2}
            borderRadius={3}
            width={70}
            height={70}
          >
            <body1 style={{ color: "#919993" }}>0</body1>
            <body1 style={{ color: "#919993" }}>votes</body1>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexDirection="column"
            borderColor="#32a852"
            border={2}
            borderRadius={3}
            width={70}
            height={70}
          >
            <body1 style={{ color: "#32a852" }}>6</body1>
            <body1 style={{ color: "#32a852" }}>answers</body1>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexDirection="column"
            borderColor="#919993"
            border={2}
            borderRadius={3}
            width={70}
            height={70}
          >
            <body1 style={{ color: "#919993" }}>23</body1>
            <body1 style={{ color: "#919993" }}>views</body1>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          style={{ width: "80%" }}
        >
          <Typography>
            "چرا جاوا امکان ارث بری از چند کلاس را نمیدهد؟"
          </Typography>

          <Grid container spacing={2} style={{ width: "100%" }}>
            <Grid item>
              <Chip
                clickable
                label="ای پی"
                component="a"
                href="#AP"
                size="small"
              />
              <Chip
                clickable
                label="جاوا"
                component="a"
                href="#AP"
                size="small"
              />
              <Chip
                clickable
                label="شیء گرایی"
                component="a"
                href="#AP"
                size="small"
              />
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              <div></div>
            </Grid>
            <Grid item>
              <Typography variant="overline">علی علوی </Typography>
              <Typography variant="overline">
                _ پرسیده شده 2 ساعت پیش
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
