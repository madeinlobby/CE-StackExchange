import { Button, makeStyles, Typography, Grid } from "@material-ui/core";
import React, { useState } from "react";
import Image from "../resources/HomePage.gif";
import question from "../resources/question.jpg";
import answer from "../resources/answer.png";
import reputation from "../resources/reputation.png";
import bounty from "../resources/bounty.png";
import Footer from "../components/general/website_footer";
import { Link } from "react-router-dom";
import TutorialBox from "../components/HomePageComponents/TutorialBox";
import ScrollDownIcon from "../components/HomePageComponents/ScrollDownIcon";

const tutorialBoxes = [
  {
    title: "سوال داری ؟!",
    body:
      " تو سه سوت یه سوال پست کن و متخصصین اون امر ! سریعا به کمکت میان =)))",
    right: false,
    img: question,
  },
  {
    title: "جواب سوالیو میدونی ؟",
    body: " زیر همون سوال پستش کن و اعتبار کسب کن =)))))",
    right: true,
    img: answer,
  },
  {
    title: "اعتبار کسب کردی ؟!",
    body: " بیشتر B)عتبار اعتبار میاره :) هر چی بیشتر دسترسی ها و قدرت شما هم",
    right: false,
    img: reputation,
  },
  {
    title: " شب امتحان ؟ :) سریع جواب میخوای ؟",
    body: "  میتونی برای بهترین پاسخ اعتبار جایزه بذاری !",
    right: true,
    img: bounty,
  },
];

const useStyles = makeStyles((theme) => ({
  wrapper: {
    overflow: "hidden",
  },
  container: {
    overflow: "hidden",
  },
  header: {
    position: "relative",
    minWidth: window.innerWidth,
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 600,
  },
  title: {
    color: "white",
    fontSize: 100,
    [theme.breakpoints.down("sm")]: {
      fontSize: 70,
    },
  },
  subTitle: {
    color: "white",
  },
  buttonContainer: {
    position: "absolute",
    top: "90%",
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const [firstBox, setFirstBox] = useState();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography className={classes.title}>سیعی اورفلو</Typography>
          <Typography variant="h6" className={classes.subTitle}>
            پرسش و پاسخ دروس دانشکده ی کامپیوتر دانشگاه صنعتی شریف
          </Typography>
          <Grid
            container
            direction="row"
            spacing={1}
            className={classes.buttonContainer}
            justify="center"
          >
            <Grid item>
              <Link
                to="login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button variant="contained">ورود / عضویت</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="questions"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button
                  variant="outlined"
                  style={{ color: "white", borderColor: "white" }}
                >
                  دیدن سایت
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
        <ScrollDownIcon scrollTraget={firstBox} />
        <Grid
          container
          spacing={4}
          style={{
            paddingTop: 100,
            paddingRight: 30,
            paddingLeft: 30,
            paddingBottom: 80,
          }}
        >
          <div
            ref={(e) => {
              setFirstBox(e);
            }}
          />
          {tutorialBoxes.map((tb) => (
            <TutorialBox
              title={tb.title}
              body={tb.body}
              right={tb.right}
              img={tb.img}
            />
          ))}
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
