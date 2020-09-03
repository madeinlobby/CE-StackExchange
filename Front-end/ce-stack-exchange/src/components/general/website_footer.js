import React from "react";
// import "./website_footer.css"
import { Container, AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: "auto",

        bottom: 0,
        width: "99%",
    },
}));

const goToCe = () => {
    window.location.href = "http://ce.sharif.edu"
}

const goToAbout = () => {
    window.location.href = "#"
}

const goToGuide = () => {
    window.location.href = "#"
}

export default function Footer() {
    const classes = useStyles();
    return (
        <AppBar position="static" color="primary" className={classes.appBar}>
            <Container maxWidth={0}>
                <Toolbar>
                    <Typography variant="body1" color="inherit" align="center" style={{ fontSize: 15, align: "center" }}>
                        &copy; ۱۳۹۹ |<a onClick={goToCe} style={{ cursor: "pointer" }}> دانشکده مهندسی کامپیوتر دانشگاه صنعتی شریف</a> | <a onClick={goToGuide} style={{ cursor: "pointer" }}>راهنما</a> | <a onClick={goToAbout} style={{ cursor: "pointer" }}>درباره</a>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar >
    )
}




// /*eslint-disable*/
// import React from "react";
// // nodejs library to set properties for components
// import PropTypes from "prop-types";
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // material-ui core components
// import { List, ListItem } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// // @material-ui/icons
// import Favorite from "@material-ui/icons/Favorite";

// import styles from "./footerStyle.js";

// const useStyles = makeStyles(styles);

// export default function Footer(props) {
//     const classes = useStyles();
//     const { whiteFont } = props;
//     const footerClasses = classNames({
//         [classes.footer]: true,
//         [classes.footerWhiteFont]: whiteFont
//     });
//     const aClasses = classNames({
//         [classes.a]: true,
//         [classes.footerWhiteFont]: whiteFont
//     });
//     return (
//         <footer className={footerClasses}>
//             <div className={classes.container}>
//                 <div className={classes.left}>
//                     <List className={classes.list}>
//                         <ListItem className={classes.inlineBlock}>
//                             <a
//                                 href="https://www.creative-tim.com/?ref=mkr-footer"
//                                 className={classes.block}
//                                 target="_blank"
//                             >
//                                 Creative Tim
//               </a>
//                         </ListItem>
//                         <ListItem className={classes.inlineBlock}>
//                             <a
//                                 href="https://www.creative-tim.com/presentation?ref=mkr-footer"
//                                 className={classes.block}
//                                 target="_blank"
//                             >
//                                 About us
//               </a>
//                         </ListItem>
//                         <ListItem className={classes.inlineBlock}>
//                             <a
//                                 href="http://blog.creative-tim.com/?ref=mkr-footer"
//                                 className={classes.block}
//                                 target="_blank"
//                             >
//                                 Blog
//               </a>
//                         </ListItem>
//                         <ListItem className={classes.inlineBlock}>
//                             <a
//                                 href="https://www.creative-tim.com/license?ref=mkr-footer"
//                                 className={classes.block}
//                                 target="_blank"
//                             >
//                                 Licenses
//               </a>
//                         </ListItem>
//                     </List>
//                 </div>
//                 <div className={classes.right}>
//                     &copy; {1900 + new Date().getYear()} , made with{" "}
//                     <Favorite className={classes.icon} /> by{" "}
//                     <a
//                         href="https://www.creative-tim.com?ref=mkr-footer"
//                         className={aClasses}
//                         target="_blank"
//                     >
//                         Creative Tim
//           </a>{" "}
//           for a better web.
//         </div>
//             </div>
//         </footer>
//     );
// }

// Footer.propTypes = {
//     whiteFont: PropTypes.bool
// };
