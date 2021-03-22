import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { grey, lightBlue } from '@material-ui/core/colors';
import { App } from './components/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[400],
    },
    secondary: {
      main: lightBlue.A700,
    },
    text: {
      disabled: grey[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
