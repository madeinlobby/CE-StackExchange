import React from 'react'
import { Paper, Container, ThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Vazir from '../../Vazir.woff'
import { Grid } from "@material-ui/core"
import { Alert } from "@material-ui/lab"


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        }
    }
}));

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
            classes: useStyles,
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
            alert("success")
        }
    }

    emailIsUnique = () => {
        return true
    }

    usernameIsUnique = () => {
        return true
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div style={{ width: "80%" }}>
                    <Container>
                        <Alert style={{ margin: 20 }} severity="success">ثبت نام با موفقیت انجام شد!</Alert>
                        <form className={this.state.classes.root} noValidate autoComplete="off">
                            <div>
                                <Grid container spacing={5}>
                                    <Grid container item xs={12} spacing={3}>
                                        <TextField
                                            color="secondary"
                                            style={{ margin: 10 }}
                                            onChange={this.handleUsernameChange}
                                            required
                                            error={this.state.isUsernameError}
                                            id={this.state.usernameBorder}
                                            helperText={this.state.usernameHelper}
                                            className="username"
                                            label="نام کاربری"
                                            variant="outlined"
                                        />
                                        <TextField
                                            color="secondary"
                                            style={{ margin: 10 }}
                                            onChange={this.handleEmailChange}
                                            required
                                            id={this.state.emailBorder}
                                            error={this.state.isEmailError}
                                            helperText={this.state.emailHelper}
                                            className="email"
                                            label="ایمیل"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid container item xs={12} spacing={3}>
                                        <TextField
                                            color="secondary"
                                            style={{ margin: 10 }}
                                            onChange={this.handleFirstnameChange}
                                            required
                                            id={this.state.firstnameBorder}
                                            error={this.state.isFirstnameError}
                                            helperText={this.state.firstnameHelper}
                                            className="firstName"
                                            label="نام"
                                            variant="outlined"
                                        />
                                        <TextField
                                            color="secondary"
                                            style={{ margin: 10 }}
                                            onChange={this.handleLastnameChange}
                                            required
                                            id={this.state.lastnameBorder}
                                            error={this.state.isLastnameError}
                                            helperText={this.state.lastnameHelper}
                                            className="lastName"
                                            label="نام خانوادگی"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid container item xs={12} spacing={3}>
                                        <TextField
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

                                        <TextField
                                            color="secondary"
                                            style={{ margin: 10 }}
                                            onChange={this.handleConfirmPasswordChange}
                                            required
                                            id={this.state.confirmPasswordBorder}
                                            error={this.state.isConfirmPasswordError}
                                            helperText={this.state.confirmPasswordHelper}
                                            className="confirmPassword"
                                            label="تکرار رمز عبور"
                                            type="password"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid container item xs={12} spacing={0}>

                                        <Button variant="contained" color="secondary" onClick={this.submitRegister}>
                                            ثبت نام
                                            </Button>

                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </Container>
                </div>
            </ThemeProvider>
        );
    }
}

export default SignUpWindow