import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/general/website_footer";
import Header from "../components/general/website_header";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  TableContainer,
  Table,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import QListItem from "../components/question&answer/QListItem";
import { Link } from "react-router-dom";

//sample tag list
const tags = [
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
  {
    label: "ساختمان گسسته",
    href: "#discrete-structure",
  },
  {
    label: "مدار منطقی",
    href: "#logic-circuits",
  },
  {
    label: "سیستم عامل",
    href: "#OS",
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    marginBottom: 50,
    backgroundColor: "white",
    padding: 50,
  },
  tagSearch: {
    width: 300,
    marginTop: 30,
    marginBottom: 30,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 30,
  },
}));

export default function QuestionsPage() {
  const classes = useStyles();

  const [questions, setQuestions] = useState({
    startIndex: 0,
    endIndex: 12,
    loading: true,
    list: [],
  });

  return (
    <>
      <Header />
      <Container className={classes.container} maxWidth="md">
        <Box display="flex" justifyContent="space-evenly">
          <Typography variant="h5">آخرین پرسش ها</Typography>
          <div style={{ flexGrow: 1 }} />
          <Link to="/ask" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              سوال بپرس
            </Button>
          </Link>
        </Box>
        <Autocomplete
          className={classes.tagSearch}
          options={tags}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(option) => (
            <React.Fragment>
              {option.label} {option.href}
            </React.Fragment>
          )}
          multiple
          renderInput={(params) => (
            <TextField {...params} label="جستجو ..." variant="outlined" />
          )}
        />
        {questions.loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 80,
            }}
          >
            <CircularProgress
              color="secondary"
              size={80}
              value="progress"
            ></CircularProgress>
          </div>
        ) : (
          <TableContainer style={{ width: "100%" }}>
            <Table style={{ overflow: "hidden" }}>
              {questions.list.map((q) => (
                <>
                  <Divider light />
                  <TableRow>
                    <QListItem Q={q} />
                  </TableRow>
                </>
              ))}
            </Table>
          </TableContainer>
        )}
        <div className={classes.paginationContainer}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
      </Container>
      <Footer />
    </>
  );
}
