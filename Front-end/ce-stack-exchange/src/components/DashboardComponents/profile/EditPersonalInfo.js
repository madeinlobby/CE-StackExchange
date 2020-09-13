import React from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import ProfilePreview from "../profile/ProfilePreview";

export default function EditPresonalInfo({
  username,
  firstname,
  lastname,
  email,
  aboutMe,
}) {
  const [fields, setFields] = React.useState({
    fname: firstname,
    fnameHelper: "",
    fnameError: false,

    lname: lastname,
    lnameHelper: "",
    lnameError: false,

    username: username,
    usernameHelper: "",
    usernameError: false,

    email: email,
    emailHelper: "",
    emailError: false,

    about: aboutMe,
  });

  const isEmailUnique = () => {
    //TODO
    return true;
  };

  const isUsernameUnique = () => {
    //TODO
    return true;
  };

  const clearErrors = () => {
    fields.fnameError = false;
    fields.lnameError = false;
    fields.emailError = false;
    fields.usernameError = false;
    fields.fnameHelper = "";
    fields.lnameHelper = "";
    fields.emailHelper = "";
    fields.usernameHelper = "";
  };

  const submitForm = (e) => {
    e.preventDefault();

    clearErrors();

    if (fields.fname.length < 2) {
      fields.fnameHelper = "طول نام باید حداقل ۲ کاراکتر باشد";
      fields.fnameError = true;
    }

    if (fields.lname.length < 2) {
      fields.lnameHelper = "طول نام خانوادگی باید حداقل ۲ کاراکتر باشد";
      fields.lnameError = true;
    }

    if (fields.username.length < 4) {
      fields.usernameHelper = "طول نام کاربری باید حداقل 4 کاراکتر باشد";
      fields.usernameError = true;
    }

    if (fields.username.match(/^([A-Z]|[a-z]|[0-9])+$/g) == null) {
      fields.usernameHelper = "تنها از حروف و اعداد انگلیسی استفاده کنید";
      fields.usernameError = true;
    }

    if (!isUsernameUnique()) {
      fields.usernameHelper = "این نام کاربری قبلا ثبت شده است";
      fields.usernameError = true;
    }

    if (
      !fields.email.match(
        /^([A-Z]|[a-z]|\.|\_|\_|[0-9])+@([A-Z]|[a-z])+\.([A-Z]|[a-z])+/g
      )
    ) {
      fields.emailHelper = "ایمیل نامعتبر است";
      fields.emailError = true;
    }

    if (!isEmailUnique()) {
      fields.emailHelper = "این ایمیل قبلا ثبت شده است";
      fields.emailError = true;
    }

    setFields({
      ...fields,
    });
  };

  const handleChange = (fieldName) => (event) => {
    setFields({
      ...fields,
      [fieldName]: event.target.value,
    });
  };

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
          <form onSubmit={submitForm}>
            <Grid
              container
              style={{ padding: 60 }}
              alignItems="center"
              spacing={4}
            >
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  type="text"
                  required
                  variant="outlined"
                  label="نام"
                  autoComplete="given-name"
                  name="firstName"
                  onChange={handleChange("fname")}
                  value={fields.fname}
                  error={fields.fnameError}
                  helperText={fields.fnameHelper}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  required
                  variant="outlined"
                  label="نام خانوادگی"
                  autoComplete="family-name"
                  name="lastName"
                  onChange={handleChange("lname")}
                  error={fields.lnameError}
                  value={fields.lname}
                  helperText={fields.lnameHelper}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  variant="outlined"
                  required
                  label="نام کاربری "
                  name="username"
                  autoComplete="username"
                  onChange={handleChange("username")}
                  error={fields.usernameError}
                  value={fields.username}
                  helperText={fields.usernameHelper}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  required
                  variant="outlined"
                  label="ایمیل"
                  autoComplete="email"
                  name="email"
                  onChange={handleChange("email")}
                  error={fields.emailError}
                  value={fields.email}
                  helperText={fields.emailHelper}
                />
              </Grid>
              <Grid item lg={12} md={12} xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  multiline
                  variant="outlined"
                  label="دیگه چه خبر ؟"
                  onChange={handleChange("about")}
                  value={fields.about}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button type="submit">ثبت تغییرات</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
