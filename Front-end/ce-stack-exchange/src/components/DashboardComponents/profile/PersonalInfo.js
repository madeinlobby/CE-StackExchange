import React from "react";
import { Grid, Paper, TextField } from "@material-ui/core";
import ProfilePreview from "../profile/ProfilePreview";

export default function PersonalInfo({
  username,
  firstname,
  lastname,
  aboutMe,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item lg={4} xs={12}>
        <ProfilePreview
          username={username}
          firstname={firstname}
          lastname={lastname}
          aboutMe={aboutMe}
        />
      </Grid>
      <Grid item lg={8} xs={12}>
        <Paper style={{ marginBottom: 60 }}>
          <Grid
            container
            style={{ padding: 60 }}
            alignItems="center"
            spacing={4}
          >
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                label="نام"
                defaultValue={firstname}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                label="نام خانوادگی"
                defaultValue={lastname}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <TextField
                style={{ width: "100%" }}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                label="نام کاربری"
                defaultValue={username}
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <TextField
                style={{ width: "100%" }}
                multiline
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                label="دیگه چه خبر ؟"
                defaultValue={aboutMe}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
