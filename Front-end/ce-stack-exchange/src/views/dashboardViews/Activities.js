import React, { useState , useEffect} from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import QListItem from "../../components/question&answer/QListItem";
import AListItem from "../../components/question&answer/AListItem";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paper: {
    height: "100%",
    padding: 40,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justify: "space-between",
    alignItems: "center",
  },
}));

export default function Activities() {
  const classes = useStyles();

  const [qLoading, setQLoading] = useState(true);
  const [aLoading, setALoading] = useState(true);
  const questions = [];
  const answers = [];
  const numberOfQuestions = 0;
  const numberOfAnswers = 0;

  useEffect(() => {
    const fetchQuestions = async () => {
      var url = new URL("url"),
        params = {
          username: localStorage.getItem("current-username"),
          option: "q",
        };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      try {
        const qResponse = await fetch(url, {
          header: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + localStorage.getItem("token"),
          },
        });

        if (!qResponse.ok) {
          throw Error(qResponse.statusText);
        }
        const qData = await qResponse.json();

        numberOfQuestions = qData["an array of posts"].length;
        questions = qData["an array of posts"];
        setQLoading(false);

        //TODO : catch error message
      } catch (error) {
        //TODO : handle errors
      }
    };

    fetchQuestions();

    const fetchAnswers = async () => {
      var url = new URL("url"),
        params = {
          username: localStorage.getItem("current-username"),
          option: "a",
        };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      try {
        const aResponse = await fetch(url, {
          header: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + localStorage.getItem("token"),
          },
        });

        if (!aResponse.ok) {
          throw Error(aResponse.statusText);
        }
        const aData = await aResponse.json();

        numberOfAnswers = aData["an array of posts"].length;
        answers = aData["an array of posts"];
        setALoading(false);

        //TODO : catch error message
      } catch (error) {
        //TODO : handle errors
      }
    };

    fetchAnswers();
  }, []);

  return (
    <Grid container style={{ padding: 50 }} spacing={5}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper className={classes.paper}>
          <Typography style={{ marginBottom: 20 }}>
            <QuestionAnswerIcon /> سوالات
          </Typography>
          {qLoading?<CircularProgress/>:<Typography variant="h4">{numberOfQuestions}</Typography>}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper className={classes.paper}>
          <Typography style={{ marginBottom: 20 }}>
            <QuestionAnswerIcon /> پاسخ ها
          </Typography>
          {aLoading?<CircularProgress/>:<Typography variant="h4">{numberOfAnswers}</Typography>}
        </Paper>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <Paper style={{ padding: 40, width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            سوالات
          </Typography>
          {qLoading ? (
            <LinearProgress />
          ) : (
            <TableContainer style={{ width: "100%", maxHeight : 500 }}>
              <Table style={{ overflow: "hidden" }}>
                {questions.map((q) => (
                  <>
                    <TableRow>
                      <QListItem Q={q} isForOwn={false} />
                    </TableRow>
                    <Divider light />
                  </>
                ))}
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <Paper style={{ padding: 40 }}>
          <Typography variant="h6" gutterBottom>
            پاسخ ها
          </Typography>
          {aLoading ? (
            <LinearProgress />
          ) : (
            <TableContainer style={{ width: "100%" , maxHeight : 500}}>
              <Table style={{ overflow: "hidden" }}>
                {answers.map((a) => (
                  <>
                    <TableRow>
                      <AListItem A={a} />
                    </TableRow>
                    <Divider light />
                  </>
                ))}
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
