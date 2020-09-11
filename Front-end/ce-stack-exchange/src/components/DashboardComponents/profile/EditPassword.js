import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  Paper,
  Divider,
  Box,
  Button,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  passwordField: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  container: {
    padding: 40,
    [theme.breakpoints.down("sm")]: {
      padding: 15,
    },
  },
}));

const fields = [
  {
    labelWidth: 60,
    label: "رمز فعلی",
    bottomSeparator: (
      <>
        <br />
        <br />
        <br />
      </>
    ),
    autoComplete: "current-password",
  },
  {
    labelWidth: 60,
    label: "رمز جدید",
    bottomSeparator: <br />,
    autoComplete: "new-password",
  },
  {
    labelWidth: 90,
    label: "تکرار رمز جدید",
    bottomSeparator: <br />,
    autoComplete: "",
  },
];

export default function InputAdornments() {
  const classes = useStyles();

  const [passFields, setPassFields] = React.useState({
    visible0: false,
    value0: "",
    helper0: "",
    error0: false,

    visible1: false,
    value1: "",
    helper1: "",
    error1: false,

    visible2: false,
    value2: "",
    helper2: "",
    error2: false,
  });

  const isPasswordCorrect = () => {
    //TODO
    return true;
  };

  const clearErrors = () => {
    passFields.error0 = false;
    passFields.error1 = false;
    passFields.error2 = false;
    passFields.helper0 = "";
    passFields.helper1 = "";
    passFields.helper2 = "";
  };

  const submitForm = (e) => {
    e.preventDefault();

    clearErrors();

    if (!isPasswordCorrect) {
      passFields.error0 = true;
      passFields.helper0 = "رمز عبور صحیح نیست";
    }

    if (passFields.value1 !== passFields.value2) {
      passFields.error2 = true;
      passFields.error1 = true;
      passFields.helper2 = "رمز عبور و تکرار آن مطابقت ندارند";
    }

    if (passFields.value1.length < 6) {
      passFields.error2 = true;
      passFields.error1 = true;
      passFields.helper1 = "طول رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    setPassFields({
      ...passFields,
    });

    //TODO
  };

  const handleChange = (fieldName) => (event) => {
    setPassFields({
      ...passFields,
      [fieldName]: event.target.value,
    });
  };

  const toggleVisibility = (fieldName) => () => {
    setPassFields({
      ...passFields,
      [fieldName]: !passFields[fieldName],
    });
  };

  const passField = (
    index,
    label,
    labelWidth,
    bottomSeparator,
    autoComplete
  ) => (
    <>
      <FormControl
        variant="outlined"
        className={classes.passwordField}
        error={passFields["error" + index]}
      >
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          required
          autoComplete={autoComplete}
          name={"password" + index}
          value={passFields["value" + index]}
          onChange={handleChange("value" + index)}
          type={passFields["visible" + index] ? "text" : "password"}
          endAdornment={
            <IconButton
              edge="end"
              onClick={toggleVisibility("visible" + index)}
            >
              {passFields["visible" + index] ? (
                <Visibility />
              ) : (
                <VisibilityOff />
              )}
            </IconButton>
          }
          labelWidth={labelWidth}
        ></OutlinedInput>
        <FormHelperText>{passFields["helper" + index]}</FormHelperText>
      </FormControl>
      {bottomSeparator}
    </>
  );

  return (
    <Paper style={{ marginBottom: 60 }}>
      <form onSubmit={submitForm}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          className={classes.container}
        >
          {fields.map((field, index) =>
            passField(
              index,
              field.label,
              field.labelWidth,
              field.bottomSeparator,
              field.autoComplete
            )
          )}
          <br />
          <br />
          <Divider style={{ alignSelf: "stretch" }} />
          <br />
          <br />
          <Button type="submit" style={{ alignSelf: "flex-end", fontSize: 18 }}>
            تایید
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
