import React from 'react'
import { Container, ThemeProvider, Collapse, CircularProgress } from '@material-ui/core';
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

class LoginWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: useStyles,
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
    submitRegister = () => {
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
        return (
            <ThemeProvider theme={theme}>
                <div style={{ width: "80%" }}>
                    <Container>
                        <Collapse in={this.state.successAlertOpen}>
                            <Alert style={{ margin: 20 }} severity="success">
                                <CircularProgress color="inherit" size={20} style={{ marginLeft: 10 }} />
                                با موفقیت وارد شدید!
                            </Alert>
                        </Collapse>
                        <form className={this.state.classes.root} noValidate autoComplete="off">
                            <div>
                                <Grid container spacing={5}>
                                    <Grid container item xs={12} spacing={3}>
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
                                    </Grid>
                                    <Grid container item xs={12} spacing={0}>
                                        <Button variant="contained" color="secondary" onClick={this.submitRegister}>
                                            ورود
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

export default LoginWindow