import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  Typography,
  Grid,
} from "@material-ui/core";
import QListItem from "../../components/question/QListItem";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { makeStyles } from '@material-ui/core/styles'

//sample qs
const Qs = [
  {
    title: "چرا جاوا امکان ارث بری از چند کلاس را نمیدهد؟",
    answered: true,
    approved: false,
    tags: [
      {
        label: "جاوا",
        href: "#java",
      },
      {
        label: "شیء گرایی",
        href: "#object-orientated",
      },
      {
        label: "ای پی",
        href: "#AP",
      },
    ],
    questioner: "علوی علوی",
    time: "1398/12/12 09:30",
    votes: 0,
    bounty: 25,
    answers: 5,
  },
  {
    title: "کسی میتونه این سوالو حل کنه لطفا :) ؟",
    answered: false,
    approved: false,
    tags: [
      {
        label: "ریاضیات گسسته",
        href: "#Discrete-Mathematics",
      },
      {
        label: "نظریه اعداد",
        href: "#number-theory",
      },
    ],
    questioner: "علوی علوی",
    time: "1399/03/30 19:22",
    votes: -1,
    bounty: 40,
    answers: 0,
  },
  {
    title: "چجوری میشه تو ریکت با اسم یه فیلد از آبجکت بهش دسترسی داشت؟",
    answered: true,
    approved: true,
    tags: [
      {
        label: "فرانت اند",
        href: "#Front-end",
      },
      {
        label: "ریکت",
        href: "#Reactjs",
      },
    ],
    questioner: "علوی علوی",
    time: "1398/06/16 02:00",
    votes: 8,
    bounty: 30,
    answers: 2,
  },
];

const useStyles = makeStyles(() => ({
  paper: {
    height: "100%",
    padding: 40,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justify: "space-between",
    alignItems : 'center'
  },
}));

export default function Activities() {
  const classes = useStyles();
  return (
    <Grid container style={{ padding: 50 }} spacing={5}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper className={classes.paper}>
          <Typography style={{marginBottom : 20}}>
            <QuestionAnswerIcon /> سوالات
          </Typography>
          <Typography variant='h4'>
            {Qs.length}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper className={classes.paper}>
          <Typography style={{marginBottom : 20}}>
            <QuestionAnswerIcon /> پاسخ ها
          </Typography>
          <Typography variant='h4'>
            {Qs.length}
          </Typography>
        </Paper>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <Paper style={{ padding: 40, width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            سوالات
          </Typography>
          <TableContainer style={{ width: "100%" }}>
            <Table style={{ overflow: "hidden" }}>
              {Qs.map((q) => (
                <TableRow style={{ height: "auto" }}>
                  <QListItem Q={q} />
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <Paper style={{ padding: 40 }}>
          <Typography variant="h6" gutterBottom>
            پاسخ ها
          </Typography>
          <TableContainer style={{ width: "100%" }}>
            <Table style={{ overflow: "hidden" }}>
              {Qs.map((q) => (
                <TableRow style={{ height: "auto" }}>
                  <QListItem Q={q} />
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
