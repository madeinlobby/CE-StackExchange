import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: 80,
    width: 10,
    opacity: 0,
  },
  subIcon: {
    fontSize: 80,
    width: 10,
    marginLeft: 2,
    opacity: 0,
  },
  wrapper: {
    transform: "rotate(-90deg)",
    cursor: "pointer",
  },
}));

export default function ScrollDownIcon({ scrollTraget }) {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        width={100}
        alignItems="center"
        className={classes.wrapper}
        onClick={() => {
          scrollTraget.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div id="icon1" className={classes.icon}>
          ❬
        </div>
        <div id="icon2" className={classes.subIcon}>
          ❬
        </div>
        <div id="icon3" className={classes.subIcon}>
          ❬
        </div>
        <div id="icon4" className={classes.subIcon}>
          ❬
        </div>
      </Box>
    </Box>
  );
}
