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
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  passwordField : {
    width : '50%',
    [theme.breakpoints.down('sm')] : {
      width : '100%'
    }
  },
  container : {
    padding : 40,
    [theme.breakpoints.down('sm')] : {
      padding : 15
    }
  }
}))

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
    visible1: false,
    value1visible1: "",
    visible2: false,
    value2visible2: "",
  });

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
      <FormControl variant="outlined" className={classes.passwordField}>
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
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
      </FormControl>
      {bottomSeparator}
    </>
  );

  return (
    <Paper style={{ marginBottom: 60 }}>
      <Box display="flex" flexDirection="column" alignItems="flex-start" className={classes.container}>
        {fields.map((field, index) =>
          passField(index, field.label, field.labelWidth, field.bottomSeparator)
        )}
        <br />
        <br />
        <Divider style={{ alignSelf: "stretch" }} />
        <br />
        <br />
        <Button style={{ alignSelf: "flex-end", fontSize: 18 }}>تایید</Button>
      </Box>
    </Paper>
  );
}
