import React, { useState } from "react";
import {
  Box,
  Grid,
  Hidden,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../resources/QBG.png";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: 25,
    marginLeft: 10,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
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
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

export default function AskQuestionPage() {
  const classes = useStyles();

  const [questionForm, setQuestionForm] = useState({
    title: "",
    body: "",
  });

  const [tags, setTags] = useState({
    tagsList: [],
  });

  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const handleChange = (fieldName) => (event) => {
    setQuestionForm({
      ...questionForm,
      [fieldName]: event.target.value,
    });
  };

  const handleTagsChange = (event, values) => {
    setTags({
      ...tags,
      tagsList: values.map((item) => item),
    });
  };

  const onOpen = () => {
    if (tags.tagsList.length === 0) {
      setAutoCompleteLoading(true);
    }
  };

  const onClose = () => {
    if (autoCompleteLoading) {
      setAutoCompleteLoading(false);
    }
  };

  const submit = () => {
    setPostLoading(true);
  };

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
                onChange={handleChange("title")}
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
                onChange={handleChange("body")}
                variant="outlined"
                multiline
                style={{ width: "100%", marginBottom: 20 }}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                onOpen={onOpen}
                onClose={onClose}
                loading={autoCompleteLoading}
                onChange={handleTagsChange}
                className={classes.tagSearch}
                options={tags.tagsList}
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
                    label="چند تا تگ هم در مورد این درس اضافه کن ..."
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {autoCompleteLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
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
      <Grid
        xs={12}
        md={9}
        item
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <div style={{ position: "relative" }}>
          <Button
            onClick={submit}
            variant="contained"
            color="secondary"
            disabled={postLoading}
            className={classes.submitButton}
          >
            ثبت پرسش
          </Button>
          {postLoading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </Grid>
    </Grid>
  );
}
