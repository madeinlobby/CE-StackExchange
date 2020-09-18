import {
  Button,
  Paper,
  Grid,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";
import React from "react";
import Image from "../resources/HomePage.gif";
// import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import "./animation.css";
import question from "../resources/question.jpg";
import answer from "../resources/answer.png";
import reputation from "../resources/reputation.png";
import bounty from "../resources/bounty.png";
import Footer from "../components/general/website_footer";

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
}));

export default function HomePage() {
  const classes = useStyles();

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
            style={{
              position: "absolute",
              top: "90%",
            }}
            justify="center"
          >
            <Grid item>
              <Button variant="contained">ورود / عضویت</Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                style={{ color: "white", borderColor: "white" }}
              >
                دیدن سایت
              </Button>
            </Grid>
          </Grid>
        </div>
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
          <Grid item xs={12}>
            <ScrollAnimation animateIn="bounceInUp">
              <Paper
                elevation={5}
                style={{
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <Grid container>
                  <Grid item>
                    <img
                      src={question}
                      style={{ width: 200, height: 200, margin: 50 }}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h4" style={{ marginBottom: 20 }}>
                      سوال داری ؟!
                    </Typography>
                    <Typography variant="h6">
                      تو سه سوت یه سوال پست کن و متخصصین اون امر ! سریعا به کمکت
                      میان =)))
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </ScrollAnimation>
          </Grid>
          <Grid item xs={12}>
            <ScrollAnimation animateIn="bounceInUp">
              <Paper
                elevation={5}
                style={{
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <Grid container justify="flex-end">
                  <Grid
                    item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{ marginBottom: 20 }}
                      align="right"
                    >
                      جواب سوالیو میدونی ؟
                    </Typography>
                    <Typography variant="h6" align="right">
                      زیر همون سوال پستش کن و اعتبار کسب کن =)))))
                    </Typography>
                  </Grid>
                  <Grid item>
                    <img
                      src={answer}
                      style={{ width: "auto", height: 200, margin: 50 }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </ScrollAnimation>
          </Grid>
          <Grid item xs={12}>
            <ScrollAnimation animateIn="bounceInUp">
              <Paper
                elevation={5}
                style={{
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <Grid container>
                  <Grid item>
                    <img
                      src={reputation}
                      style={{ width: "auto", height: 200, margin: 50 }}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h4" style={{ marginBottom: 20 }}>
                      اعتبار کسب کردی ؟!
                    </Typography>
                    <Typography variant="h6">
                      اعتبار اعتبار میاره :) هر چی بیشتر دسترسی ها و قدرت شما هم
                      بیشتر B)
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </ScrollAnimation>
          </Grid>
          <Grid item xs={12}>
            <ScrollAnimation animateIn="bounceInUp">
              <Paper
                elevation={5}
                style={{
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <Grid container justify="flex-end">
                  <Grid
                    item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{ marginBottom: 20 }}
                      align="right"
                    >
                      شب امتحان ؟ :) سریع جواب میخوای ؟
                    </Typography>
                    <Typography variant="h6" align="right">
                      میتونی برای بهترین پاسخ اعتبار جایزه بذاری !
                    </Typography>
                  </Grid>
                  <Grid item>
                    <img
                      src={bounty}
                      style={{ width: "auto", height: 200, margin: 50 }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </ScrollAnimation>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
