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
  },
  {
    labelWidth: 60,
    label: "رمز جدید",
    bottomSeparator: <br />,
  },
  {
    labelWidth: 90,
    label: "تکرار رمز جدید",
    bottomSeparator: <br />,
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

  const submitForm = (e) => {
    e.preventDefault();
    if (!isPasswordCorrect) {
      setPassFields({
        ...passFields,
        error0: true,
        helper0: "رمز عبور صحیح نیست",
      });
      return;
    }

    if (passFields.value1 !== passFields.value2) {
      setPassFields({
        ...passFields,
        error2: true,
        error1: true,
        helper2: "رمز عبور و تکرار آن مطابقت ندارند",
      });
      return;
    }

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

  const passField = (index, label, labelWidth, bottomSeparator) => (
    <>
      <FormControl
        variant="outlined"
        className={classes.passwordField}
        error={passFields["error" + index]}
      >
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          required
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
      <form onSubmit={submitForm} noValidate>
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
              field.bottomSeparator
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
