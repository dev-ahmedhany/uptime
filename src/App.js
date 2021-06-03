import React from 'react';
import MultiAxisLine from './MultiAxisLine'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as CloadflareWorkers } from './cloadflareWorkers.svg';

import './App.css';

function App() {

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark'
        },
      }),
    [],
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <br />
        <Typography variant="h6" component="h1" style={{ textAlign: "center" }}>
          Uptime Monitor <br /> made with 💖 by <a
            style={{ color: "inherit" }} href="https://github.com/dev-ahmedhany"
          >Ahmed Hany</a> <br />
          <br /> Powered By:
        </Typography>
        <CloadflareWorkers style={{ height: "70px" }} />
        <br />
        <MultiAxisLine />
        <br />
        <Button variant="contained" color="primary"
          href="https://github.com/dev-ahmedhany/uptime"
          target="_blank" rel="noopener noreferrer">
          Github repo
        </Button>
        <br />
      </div>
    </ThemeProvider >
  );
}

export default App;
