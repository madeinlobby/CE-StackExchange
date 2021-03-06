import React from 'react'
import { Paper, Container, ThemeProvider, Collapse, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Vazir from '../../Vazir.woff'
import { Grid } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
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
        width: "100%",
    },
    image: {
        [theme.breakpoints.down("sm")]: {
            width: 0
        },
        maxWidth: "70%",
        maxHeight: '70%',
        marginTop: 20,
        marginBottom: 20,
        filter: "blur(0.6px)",
        opacity: 0.5
    },
    TextField: {
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: "45%",
        },
        width: "45%",
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

class SignUpWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
            email: "",
            usernameBorder: "outlined-required",
            isUsernameError: false,
            usernameHelper: "",
            emailBorder: "outlined-required",
            isEmailError: false,
            emailHelper: "",
            firstnameBorder: "outlined-required",
            isFirstnameError: false,
            firstnameHelper: "",
            lastnameBorder: "outlined-required",
            isLastnameError: false,
            lastnameHelper: "",
            passwordBorder: "outlined-password-input",
            isPasswordError: false,
            passwordHelper: "",
            confirmPasswordBorder: "outlined-password-input",
            isConfirmPasswordError: false,
            confirmPasswordHelper: "",
            successAlertOpen: false,
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleFirstnameChange = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }
    handleLastnameChange = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleConfirmPasswordChange = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    submitRegister = () => {
        //username must be at least 4 charachters
        //password must be at least 6 characters
        //password and confirm password must match
        //firstname and lastname each must be at least 2 characters
        //email must match email format

        //TODO:
        //username must be unique
        //email must be unique
        let someError = false
        if (this.state.username.length < 4) {
            this.setState({ usernameBorder: "outlined-error-helper-text", isUsernameError: true, usernameHelper: "طول نام کاربری باید حداقل ۴ کاراکتر باشد" })
            someError = true
        }
        else if (this.state.username.match(/^([A-Z]|[a-z]|[0-9])+$/g) == null) {
            this.setState({ usernameBorder: "outlined-error-helper-text", isUsernameError: true, usernameHelper: "تنها از حروف و اعداد انگلیسی استفاده کنید" })
            someError = true
        } else if (this.usernameIsUnique()) {
            this.setState({ usernameBorder: "outlined-required", isUsernameError: false, usernameHelper: "" })
        } else {
            this.setState({ usernameBorder: "outlined-error-helper-text", isUsernameError: true, usernameHelper: "این نام کاربری قبلا ثبت شده است" })
            someError = true
        }
        if (this.state.firstname.length < 2) {
            this.setState({ firstnameBorder: "outlined-error-helper-text", isFirstnameError: true, firstnameHelper: "طول نام باید حداقل ۲ کاراکتر باشد" })
            someError = true
        } else {
            this.setState({ firstnameBorder: "outlined-required", isFirstnameError: false, firstnameHelper: "" })
        }
        if (this.state.lastname.length < 2) {
            this.setState({ lastnameBorder: "outlined-error-helper-text", isLastnameError: true, lastnameHelper: "طول نام خانوادگی باید حداقل ۲ کاراکتر باشد" })
            someError = true
        } else {
            this.setState({ lastnameBorder: "outlined-required", isLastnameError: false, lastnameHelper: "" })
        }
        if (this.state.password.length < 6) {
            this.setState({ passwordBorder: "outlined-password-error-helper-text", isPasswordError: true, passwordHelper: "طول رمز عبور باید حداقل ۶ کاراکتر باشد" })
            someError = true
        } else if (this.state.password === this.state.confirmPassword) {
            this.setState({ passwordBorder: "outlined-password-input", isPasswordError: false, passwordHelper: "" })
            this.setState({ confirmPasswordBorder: "outlined-password-input", isConfirmPasswordError: false, confirmPasswordHelper: "" })
        } else {
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({ passwordBorder: "outlined-password-error-helper-text", isPasswordError: true, passwordHelper: "رمز عبور و تکرار مطابقت ندارند" })
                this.setState({ confirmPasswordBorder: "outlined-password-error-helper-text", isConfirmPasswordError: true, confirmPasswordHelper: "رمز عبور و تکرار مطابقت ندارند" })
                someError = true
            } else {
                this.setState({ passwordBorder: "outlined-password-input", isPasswordError: false, passwordHelper: "" })
                this.setState({ confirmPasswordBorder: "outlined-password-input", isConfirmPasswordError: false, confirmPasswordHelper: "" })
            }
        }
        if (this.state.email.match(/^([A-Z]|[a-z]|\.|\_|\_|[0-9])+@([A-Z]|[a-z])+\.([A-Z]|[a-z])+/g)) {
            this.setState({ emailBorder: "outlined-required", isEmailError: false, emailHelper: "" })
        } else if (this.emailIsUnique()) {
            this.setState({ emailBorder: "outlined-error-helper-text", isEmailError: true, emailHelper: "ایمیل نامعتبر است" })
            someError = true
        } else {
            this.setState({ emailBorder: "outlined-error-helper-text", isEmailError: true, emailHelper: "این ایمیل قبلا ثبت شده است" })
            someError = true
        }
        if (someError === false) {
            this.setState({
                successAlertOpen: true
            })
        } else {
            this.setState({
                successAlertOpen: false
            })
        }
    }

    emailIsUnique = () => {
        return true
    }

    usernameIsUnique = () => {
        return true
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "3em" }}>
                <ThemeProvider theme={theme}>
                    <div className={classes.form} style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                        <Container>
                            <Collapse in={this.state.successAlertOpen}>
                                {/* <Collapse in={this.state.successAlertOpen}> */}
                                <Alert style={{ marginBottom: 10, width: "95%" }} severity="success">
                                    <CircularProgress color="inherit" size={20} style={{ marginLeft: 10 }} />
                                ثبت نام با موفقیت انجام شد!
                            </Alert>
                            </Collapse>
                            <form className={classes.root} noValidate autoComplete="off">
                                <div>
                                    <Grid container spacing={5} alignContent="space-around">
                                        <Grid container item spacing={3} alignContent="space-around">
                                            <TextField
                                                autoComplete
                                                color="secondary"
                                                style={{ margin: 10 }}
                                                onChange={this.handleUsernameChange}
                                                required
                                                error={this.state.isUsernameError}
                                                id={this.state.usernameBorder}
                                                helperText={this.state.usernameHelper}
                                                className={classes.TextField}
                                                label="نام کاربری"
                                                variant="outlined"
                                            />
                                            <TextField
                                                autoComplete
                                                color="secondary"
                                                style={{ margin: 10 }}
                                                onChange={this.handleEmailChange}
                                                required
                                                id={this.state.emailBorder}
                                                error={this.state.isEmailError}
                                                helperText={this.state.emailHelper}
                                                className={classes.TextField}
                                                label="ایمیل"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid container item spacing={3} alignContent="space-around">
                                            <TextField
                                                autoComplete
                                                color="secondary"
                                                style={{ margin: 10 }}
                                                onChange={this.handleFirstnameChange}
                                                required
                                                id={this.state.firstnameBorder}
                                                error={this.state.isFirstnameError}
                                                helperText={this.state.firstnameHelper}
                                                className={classes.TextField}
                                                label="نام"
                                                variant="outlined"
                                            />
                                            <TextField
                                                autoComplete
                                                color="secondary"
                                                style={{ margin: 10 }}
                                                onChange={this.handleLastnameChange}
                                                required
                                                id={this.state.lastnameBorder}
                                                error={this.state.isLastnameError}
                                                helperText={this.state.lastnameHelper}
                                                className={classes.TextField}
                                                label="نام خانوادگی"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid container item spacing={3} alignContent="space-around">
                                            <TextField
                                                autoComplete
                                                color="secondary"
                                                style={{ margin: 10 }}
                                                onChange={this.handlePasswordChange}
                                                required
                                                id={this.state.passwordBorder}
                                                error={this.state.isPasswordError}
                                                className={classes.TextField}
                                                label="رمز عبور"
                                                type="password"
                                                helperText={this.state.passwordHelper}
                                                variant="outlined"
                                            />

                                            <TextField
                                                autoComplete
                                                color="secondary"
                                                style={{ margin: 10 }}
                                                onChange={this.handleConfirmPasswordChange}
                                                required
                                                id={this.state.confirmPasswordBorder}
                                                error={this.state.isConfirmPasswordError}
                                                helperText={this.state.confirmPasswordHelper}
                                                className={classes.TextField}
                                                label="تکرار رمز عبور"
                                                type="password"
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            item
                                            xs={10}
                                            spacing={0}
                                            // style={{ backgroundColor: "red" }}
                                            alignContent="space-between"
                                            alignItems="center"
                                            justify="space-between">
                                            <Button variant="contained" color="secondary" onClick={this.submitRegister}>
                                                ثبت نام
                                            </Button>
                                            <a href="#">ثبت نام کرده‌اید؟ وارد شوید!</a>
                                        </Grid>
                                    </Grid>
                                </div>
                            </form>
                        </Container>
                    </div>
                </ThemeProvider>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={conversation} className={classes.image} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SignUpWindow)