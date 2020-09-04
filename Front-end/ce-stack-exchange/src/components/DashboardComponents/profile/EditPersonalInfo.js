import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  TextField
} from "@material-ui/core";
import ProfilePreview from "../profile/ProfilePreview";

const useStyles = makeStyles((theme) => ({}));

export default function EditPresonalInfo() {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item lg={4} xs={12}>
        <ProfilePreview/>
      </Grid>
      <Grid item lg={8} xs={12}>
        <Paper>
          <Grid container style={{ padding: 60 }} spacing={4}>
            <Grid item lg={6}>
              <TextField
                style={{ width: "100%" }}
                required
                variant="outlined"
                label="نام"
                defaultValue="علی"
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                style={{ width: "100%" }}
                required
                variant="outlined"
                label="نام خانوادگی"
                defaultValue="علوی"
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                label="چیکاره ای ؟"
                defaultValue="ارشد هوش مصنوعی"
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                style={{ width: "100%" }}
                required
                variant="outlined"
                label="ایمیل"
                defaultValue="alialavi@gmail.com"
              />
            </Grid>
            <Grid item lg={12}>
              <TextField
                style={{ width: "100%" }}
                multiline
                variant="outlined"
                label="دیگه چه خبر ؟"
                defaultValue=" ارشد 98 م از خیلی وقته عاشق AI بودم :)"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
