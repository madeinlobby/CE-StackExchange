import React from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import ProfilePreview from "../profile/ProfilePreview";

export default function EditPresonalInfo() {
  const [fields, setFields] = React.useState({
    //TODO : initial value fields
    fname: "",
    fnameHelper: "",
    fnameError: false,

    lname: "",
    lnameHelper: "",
    lnameError: false,

    username: "",
    usernameHelper: "",
    usernameError: false,

    email: "",
    emailHelper: "",
    emailError: false,

    about: "",
  });

  const clearErrors = () => {
    setFields({
      ...fields,
      fnameError: false,
      lnameError: false,
      emailError: false,
      usernameError: false,
      fnameHelper: "",
      lnameHelper: "",
      emailHelper: "",
      usernameHelper: "",
    });
  };

  const isEmailUnique = () => {
    //TODO
    return true;
  };

  const isUsernameUnique = () => {
    //TODO
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    //TODO
    clearErrors();

    if (fields.fname.length < 2) {
      setFields({
        ...fields,
        fnameHelper: "طول نام باید حداقل ۲ کاراکتر باشد",
        fnameError: true,
      });
      return;
    }

    if (fields.lname.length < 2) {
      setFields({
        ...fields,
        lnameHelper: "طول نام خانوادگی باید حداقل ۲ کاراکتر باشد",
        lnameError: true,
      });
      return;
    }

    if (fields.username.length < 4) {
      setFields({
        ...fields,
        usernameHelper: "طول نام کاربری باید حداقل ۴ کاراکتر باشد",
        usernameError: true,
      });
      return;
    }

    if (fields.username.match(/^([A-Z]|[a-z]|[0-9])+$/g) == null) {
      setFields({
        ...fields,
        usernameHelper: "تنها از حروف و اعداد انگلیسی استفاده کنید",
        usernameError: true,
      });
      return;
    }

    if (!isUsernameUnique()) {
      setFields({
        ...fields,
        usenameHelper: "این نام کاربری قبلا ثبت شده است",
        usernameError: true,
      });
      return;
    }

    if (
      !fields.email.match(
        /^([A-Z]|[a-z]|\.|\_|\_|[0-9])+@([A-Z]|[a-z])+\.([A-Z]|[a-z])+/g
      )
    ) {
      setFields({
        ...fields,
        emailHelper: "ایمیل نامعتبر است",
        emailError: true,
      });
      return;
    }

    if (!isEmailUnique()) {
      setFields({
        ...fields,
        emailHelper: "این ایمیل قبلا ثبت شده است",
        emailError: true,
      });
      return;
    }
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
        <ProfilePreview />
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
                  defaultValue="علی"
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
                  defaultValue="علوی"
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
                  defaultValue="علی76"
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
                  defaultValue="alialavi@gmail.com"
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
                  defaultValue=" ارشد 98 م از خیلی وقته عاشق AI بودم :)"
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
