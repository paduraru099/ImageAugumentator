import React from "react";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    fontSize: 24,
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    padding: 15,
    backgroundColor: "transparent",
    boxShadow: "none",
  },

  link: {
    textDecoration: "none",
    color: "white",
  },
}));

// Razvan:: adaugare tema la navbar, 
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeightRegular: "bolder",
    fontSize: 20,
  },
});

export const NavbarNotLogged: React.FunctionComponent<{}> = () => {
  //incarca CSS-ul
  const classes = useStyles(theme);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Button color="inherit" className={classes.menuButton}>
            <Link className={classes.link} to="/account/login">
              Login
            </Link>
          </Button>
          <Button color="inherit" className={classes.menuButton}>
            <Link className={classes.link} to="/account/register">
              Register
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
