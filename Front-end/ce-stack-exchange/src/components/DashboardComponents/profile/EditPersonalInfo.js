import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Button
} from "@material-ui/core";
import ProfilePreview from "../profile/ProfilePreview";

export default function EditPresonalInfo() {

  return (
    <Grid container spacing={2}>
      <Grid item lg={4} xs={12}>
        <ProfilePreview/>
      </Grid>
      <Grid item lg={8} xs={12}>
        <Paper style={{marginBottom:60}}>
          <Grid container style={{ padding: 60}} alignItems='center' spacing={4}>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                required
                variant="outlined"
                label="نام"
                defaultValue="علی"
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                required
                variant="outlined"
                label="نام خانوادگی"
                defaultValue="علوی"
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                label="چیکاره ای ؟"
                defaultValue="ارشد هوش مصنوعی"
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                required
                variant="outlined"
                label="ایمیل"
                defaultValue="alialavi@gmail.com"
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <TextField
                style={{ width: "100%" }}
                multiline
                variant="outlined"
                label="دیگه چه خبر ؟"
                defaultValue=" ارشد 98 م از خیلی وقته عاشق AI بودم :)"
              />
            </Grid>
            <Grid item xs={12} style={{display:'flex', justifyContent : 'flex-end'}}>
              <Button>
                ثبت تغییرات
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
