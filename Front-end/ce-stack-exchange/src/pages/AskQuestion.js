import React, { useEffect, useState } from "react";
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
import Header from "../components/general/website_header";
import Footer from "../components/general/website_footer";
import RichTextEditor from "../components/question&answer/RichTextEditor";
import { convertFromRaw } from "draft-js";

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
  bodyWrapper: {
    width: "100%",
    marginBottom: 20,
  },
}));

export default function AskQuestionPage() {
  const classes = useStyles();
  let allTags = [];

  const [errors, setErrors] = useState({
    titleHelper: "",
    titleError: false,
    tagsHelper: "",
    tagsError: false,
    bodyHelper: "",
    bodyError: false,
  });

  const [tags, setTags] = useState([]);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setPostLoading(true);
  };

  const validateForm = () => {
    let valid = true;
    if (!window.localStorage.getItem("title")) {
      errors.titleHelper = "عنوان نمیشه خالی باشه";
      errors.titleError = true;
      valid = false;
    }
    if (
      !convertFromRaw(
        JSON.parse(window.localStorage.getItem("content"))
      ).hasText()
    ) {
      errors.bodyHelper = "متن سوال نمیشه خالی باشه";
      errors.bodyError = true;
      valid = false;
    }
    if (tags.length === 0) {
      errors.tagsHelper = "حداقل یه تگ باید وارد کنی";
      errors.tagsError = true;
      valid = false;
    }

    setErrors({
      ...errors,
    });

    return valid;
  };

  //TODO : save tags to local storage??
  const handleChange = (event) => {
    window.localStorage.setItem("title", event.target.value);
  };

  const onOpen = () => {
    if (allTags.length === 0) {
      setAutoCompleteLoading(true);
    }
  };

  const onClose = () => {
    if (autoCompleteLoading) {
      setAutoCompleteLoading(false);
    }
  };

  useEffect(() => {
    if (autoCompleteLoading) {
      const fetchData = async () => {
        try {
          const response = await fetch("url" + "/tags", {
            header: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
          });
          if (!response.ok) {
            throw Error(response.statusText);
          }
          const data = await response.json();
          allTags = data["tag array"];
          setAutoCompleteLoading(false);

          //TODO : catch error message
        } catch (error) {
          //TODO : handle errors
        }
      };

      fetchData();
    }
  }, [autoCompleteLoading]);

  useEffect(() => {
    if (postLoading) {
      const fetchData = async () => {
        try {
          const response = await fetch("url" + "/user/actions/ask", {
            method: "POST",
            header: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              community: localStorage.getItem("community"),
              title: window.localStorage.getItem("title"),
              ["question body"]: window.localStorage.getItem("content"),
              ["tags array"]: tags,
            }),
          });
          if (!response.ok) {
            throw Error(response.statusText);
          }
          const data = await response.json();
          //TODO : redirect to new question page
          //TODO : catch error message
        } catch (error) {
          //TODO : handle errors
        }

        fetchData();
      };
    }
  }, [postLoading]);

  return (
    <>
      <Header />
      <form onSubmit={submitForm} noValidate>
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
                    required
                    helperText={errors.titleHelper}
                    error={errors.titleError}
                    onChange={handleChange}
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
                  <Paper
                    variant="outlined"
                    className={classes.bodyWrapper}
                    style={{ borderColor: errors.bodyError ? "red" : null }}
                  >
                    <RichTextEditor />
                  </Paper>
                  <div
                    style={{
                      color: "RED",
                      marginTop: -18,
                      marginRight: 20,
                      fontSize: 12,
                    }}
                  >
                    {errors.bodyHelper}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    onOpen={onOpen}
                    onClose={onClose}
                    loading={autoCompleteLoading}
                    onChange={(event, values) =>
                      setTags(values.map((item) => item))
                    }
                    className={classes.tagSearch}
                    options={allTags}
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
                        error={errors.tagsError}
                        helperText={errors.tagsHelper}
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
                type="submit"
                variant="contained"
                color="secondary"
                disabled={postLoading}
                className={classes.submitButton}
              >
                ثبت پرسش
              </Button>
              {postLoading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </form>
      <Footer />
    </>
  );
}
