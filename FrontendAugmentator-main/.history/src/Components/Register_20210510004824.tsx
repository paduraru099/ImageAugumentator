import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import AccountService, { LoginInterface } from "../Services/AccountService";

//Creez un obiect CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  //100% inaltimea paginii
  gridItem: {
    height: "100vh",
  },
  //adauga niste spatiu si centreaza-le
  form: {
    margin: theme.spacing(4),
    verticalAlign: "middle",
    marginTop: "35%",
  },
}));

export interface RegisterInterface {
  username: string;
  password: string;
  email: string;
}

export const Register: React.FunctionComponent<any> = () => {
  //instantiez obiectul
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (event: any) => {
    if (password === confirmPassword) {
      const data: RegisterInterface = {
        username: username,
        password: password,
        email: email,
      };
      //trimite request la server
      AccountService.register(data)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else{
       //MESSAGEBOX
       console.log("NU UITA MESSAGEBOX CA NU II BUNA PAROLA")
    }
  };
  return (
    //impart ecranul in 2 coloane
    <div className={classes.root + classes.gridItem}>
      <Grid container className={classes.gridItem}>
        <Grid item xs={12} sm={9} style={{ backgroundColor: "black" }}></Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Email"
              name="email"
              value={email}
              autoFocus
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Username"
              name="username"
              value={username}
              autoFocus
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Password"
              name="password"
              value={password}
              autoFocus
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Confirm password"
              name="confirmPassword"
              value={confirmPassword}
              autoFocus
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Salut
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
