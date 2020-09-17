import React from 'react'
import { Container, ThemeProvider, Collapse, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Vazir from '../../Vazir.woff'
import { Grid } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { withStyles } from '@material-ui/core/styles';
import conversation from '../../resources/conversation.png'
import idea from '../../resources/idea.png'
import questionmark from '../../resources/questionmark.png'


const styles = theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        }
    },
    form: {
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: "50%"
        },
        width: "40%",
    },
    image: {
        [theme.breakpoints.down("sm")]: {
            width: 0
        },
        width: "70%",
        marginTop: 20,
        marginBottom: 20,
        filter: "blur(0.6px)",
        opacity: 0.5
    }
});

const vazir = {
    fontFamily: 'Vazir',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      url(${Vazir}) format('woff')
    `,
};

const theme = createMuiTheme({
    direction: "ltr",
    typography: {
        fontFamily: 'Vazir'
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [vazir],
            },
        },
    },
    palette: {
        primary: {
            main: "#ffb300",
        },
        secondary: {
            main: "#115293"
        }
    },
});

class LoginWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            usernameBorder: "outlined-required",
            isUsernameError: false,
            usernameHelper: "",
            passwordBorder: "outlined-password-input",
            isPasswordError: false,
            passwordHelper: "",
            successAlertOpen: false,
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    submitLogin = () => {
        let someError = false
        if (this.usernameIsInvalid()) {
            this.setState({ usernameBorder: "outlined-error-helper-text", isUsernameError: true, usernameHelper: "کاربری با این مشخصات وجود ندارد!" })
            someError = true
        } else {
            this.setState({ usernameBorder: "outlined-required", isUsernameError: false, usernameHelper: "" })
            if (this.passwordIsWrong()) {
                this.setState({ passwordBorder: "outlined-password-error-helper-text", isPasswordError: true, passwordHelper: "رمز عبور صحیح نیست!" })
                someError = true
            } else {
                this.setState({ passwordBorder: "outlined-password-input", isPasswordError: false, passwordHelper: "" })
            }
        }
        if (someError === false) {
            this.setState({
                successAlertOpen: true
                //TODO:
                //send login request
            })
        } else {
            this.setState({
                successAlertOpen: false
            })
        }
    }

    usernameIsInvalid = () => {
        return false
        //TODO:
        //check if it is username or email
        //then check if there is something or not
    }

    passwordIsWrong = () => {
        return false
        //TODO:
        //check if the password correct for the username or email
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ThemeProvider theme={theme}>
                    <div className={classes.form} style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                        <Container>
                            <Collapse in={this.state.successAlertOpen}>
                                <Alert style={{ margin: 20 }} severity="success">
                                    <CircularProgress color="inherit" size={20} style={{ marginLeft: 10 }} />
                                با موفقیت وارد شدید!
                            </Alert>
                            </Collapse>
                            <form className={classes.root} noValidate autoComplete="off">
                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                    <TextField
                                        autoComplete
                                        color="secondary"
                                        style={{ margin: 10 }}
                                        onChange={this.handleUsernameChange}
                                        required
                                        error={this.state.isUsernameError}
                                        id={this.state.usernameBorder}
                                        helperText={this.state.usernameHelper}
                                        className="username"
                                        label="نام کاربری یا ایمیل"
                                        variant="outlined"
                                    />
                                    <TextField
                                        autoComplete
                                        color="secondary"
                                        style={{ margin: 10 }}
                                        onChange={this.handlePasswordChange}
                                        required
                                        id={this.state.passwordBorder}
                                        error={this.state.isPasswordError}
                                        className="password"
                                        label="رمز عبور"
                                        type="password"
                                        helperText={this.state.passwordHelper}
                                        variant="outlined"
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.submitLogin}
                                        style={{ marginLeft: "30%", marginRight: "30%", marginTop: "5%" }}>
                                        ورود
                                    </Button>
                                    <div style={{ padding: "2em", display: "flex", justifyContent: "center" }}>
                                        <a href="#">حساب کاربری ندارید؟ ثبت نام کنید!</a>
                                    </div>
                                </div>
                            </form>
                        </Container>
                    </div>
                </ThemeProvider>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={idea} className={classes.image} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LoginWindow)