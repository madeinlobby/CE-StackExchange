import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import Vazir from './Vazir.woff'
import { CssBaseline } from "@material-ui/core";

//configure jss
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

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
  direction: "rtl",
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
  },
});

ReactDOM.render(
  <StylesProvider jss={jss}>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {
        <React.StrictMode>
          <App />
        </React.StrictMode>
      }
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
