import React from "react";
import {
  Box,
  Grid,
  Hidden,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../resources/QBG.png";
import Autocomplete from "@material-ui/lab/Autocomplete";

//sample tag list
const primaryTags = [
  {
    label: "ای پی",
    href: "#AP",
  },
];

const secondaryTags = [
  {
    label: "جاوا",
    href: "#java",
  },
  {
    label: "شیء گرایی",
    href: "#object-orientated",
  },
];

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
  title: {
    marginLeft: 10,
    marginBottom: 50,
  },
  tagSearch: {
    width: "50%",
    [theme.breakpoints.down('md')]:{
      width : '100%'
    }
  },
}));

export default function AskQuestionPage() {
  const classes = useStyles();

  return (
    <Grid container style={{ padding: 50 }}>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.title}>
          سوالتو بپرس
        </Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper>
          <Grid container style={{ padding: 30 }} spacing={2}>
            <Grid item xs={12}>
              <Typography>
                <Box fontWeight="fontWeightBold">عنوان</Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                style={{ width: "100%", marginBottom: 20 }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <Box fontWeight="fontWeightBold">متن سوال</Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                rows={18}
                variant="outlined"
                multiline
                style={{ width: "100%", marginBottom: 20 }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                className={classes.tagSearch}
                options={primaryTags}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(option) => (
                  <React.Fragment>
                    {option.label} {option.href}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="کلا به چه درسی مربوطه ..."
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                className={classes.tagSearch}
                options={secondaryTags}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(option) => (
                  <React.Fragment>
                    {option.label} {option.href}
                  </React.Fragment>
                )}
                multiple
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="چند تا تگ دیگه هم در مورد این درس اضافه کن ..."
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Hidden smDown>
        <Grid item xs={3} className={classes.imageContainer}></Grid>
      </Hidden>
      <Grid xs={12} md={9} item style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 25, marginLeft: 10 }}
        >
          ثبت پرسش
        </Button>
      </Grid>
    </Grid>
  );
}
