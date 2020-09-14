import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import QListItem from "../../components/question&answer/QListItem";
import AListItem from "../../components/question&answer/AListItem";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { makeStyles } from '@material-ui/core/styles'

//sample qs
const Qs = [
  {
    'title': "چرا جاوا امکان ارث بری از چند کلاس را نمیدهد؟",
    'number of answers': 2,
    'isAnswerApproved': false,
    'tags array': [
      {
        'label': "جاوا",
        'href': "#java",
      },
      {
        'label': "شیء گرایی",
        'href': "#object-orientated",
      },
      {
        'label': "ای پی",
        'href': "#AP",
      },
    ],
    'number of downvotes' : 0,
    "date of issue": "1398/12/12 09:30",
    'number of upvotes': 2,
  },
  {
    'title': "کسی میتونه این سوالو حل کنه لطفا :) ؟",
    'number of answers': 0,
    'isAnswerApproved': false,
    'tags array': [
      {
        'label': "ریاضیات گسسته",
        'href': "#Discrete-Mathematics",
      },
      {
        'label': "نظریه اعداد",
        'href': "#number-theory",
      },
    ],
    'number of downvotes' : 5,
    'date of issue': "1399/03/30 19:22",
    'number of upvotes': 1,
  },
  {
    'title': "چجوری میشه تو ریکت با اسم یه فیلد از آبجکت بهش دسترسی داشت؟",
    'number of answers': 5,
    'isAnswerApproved': true,
    'tags array': [
      {
        'label': "فرانت اند",
        'href': "#Front-end",
      },
      {
        'label': "ریکت",
        'href': "#Reactjs",
      },
    ],
    'number of downvotes' : 5,
    'date of issue': "1398/06/16 02:00",
    'number of upvotes': 8,
  },
];

//sample As
const As = [
  {
    'title': "چرا جاوا امکان ارث بری از چند کلاس را نمیدهد؟",
    'isAnswerApproved': false,
    'tags array': [
      {
        'label': "جاوا",
        'href': "#java",
      },
      {
        'label': "شیء گرایی",
        'href': "#object-orientated",
      },
      {
        'label': "ای پی",
        'href': "#AP",
      },
    ],
    'number of downvotes' : 0,
    "date of issue": "1398/12/12 09:30",
    'number of upvotes': 2,
  },
  {
    'title': "کسی میتونه این سوالو حل کنه لطفا :) ؟",
    'isAnswerApproved': false,
    'tags array': [
      {
        'label': "ریاضیات گسسته",
        'href': "#Discrete-Mathematics",
      },
      {
        'label': "نظریه اعداد",
        'href': "#number-theory",
      },
    ],
    'number of downvotes' : 5,
    'date of issue': "1399/03/30 19:22",
    'number of upvotes': 1,
  },
  {
    'title': "چجوری میشه تو ریکت با اسم یه فیلد از آبجکت بهش دسترسی داشت؟",
    'isAnswerApproved': true,
    'tags array': [
      {
        'label': "فرانت اند",
        'href': "#Front-end",
      },
      {
        'label': "ریکت",
        'href': "#Reactjs",
      },
    ],
    'number of downvotes' : 5,
    'date of issue': "1398/06/16 02:00",
    'number of upvotes': 8,
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
            <QuestionAnswerIcon/> سوالات
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
                <>
                <TableRow>
                  <QListItem Q={q} isForOwn={false}/>
                </TableRow>
                <Divider light/>
                </>
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
              {As.map((a) => (
                <>
                <TableRow>
                  <AListItem A={a}/>
                </TableRow>
                <Divider light/>
                </>
              ))}
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
