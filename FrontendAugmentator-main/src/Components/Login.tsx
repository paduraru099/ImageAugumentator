import { Button, Grid, makeStyles, TextField,LinearProgress, InputAdornment, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { LoginInterface } from "../Models/Interfaces";
import AccountService from "../Services/AccountService";
import {useHistory} from "react-router"
import { Visibility, VisibilityOff } from "@material-ui/icons";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ViewErrorInfo } from "./ViewErrorInfo";
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
     verticalAlign:"middle",
     marginTop:"35%"
  },
  linearProgress: {
    marginTop:15,
    marginBottom:15
  },
  textFieldInputProps: {
    color: "white !important",
    width: "100%",
    background: "none",
    border: "none",
    textTransform: "uppercase",
    outline: "none",
    transition: "border-color .2s",
    borderColor: "green",
    borderBottomColor: "white",
  },
  textField: {
    color: "white !important",
    textTransform: "uppercase",
    "& .MuiFormLabel-root": {
      color: "#666",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white",
    },

    fontFamily: "Montserrat",
  },
}));

export const Login: React.FunctionComponent<any> = () => {
  //instantiez obiectul
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //pentru loading bar
  const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

 //verifica daca trebuie afisat loading bar
 const LinearFeedback = () => {
    if (isFeedbackLoading) {
        return (
            <div className={classes.linearProgress}>
                <LinearProgress/>
            </div>
        );
    }
  }
  const onSubmit = async (event:any) =>{
    //setam ca inca asteptam raspunsul pentru loading bar
    setIsFeedbackLoading(true) 
    
    const data : LoginInterface = {
        username: username,
        password: password
     }
     //trimite request la server
     AccountService.login(data)
         .then(resp => {
           window.localStorage.setItem("AccessToken",resp.data.AccessToken)
           window.localStorage.setItem("RefreshToken",resp.data.RefreshToken)
            history.push("/app")
         })
         .catch(err => {

            setHasError(true);
            setErrorMessage(err.message)
            console.log(err)
         })
         .finally( () =>{
           //am primit raspunsul
           setIsFeedbackLoading(false)
         })
         
  }

  useEffect(() => {
      let token = localStorage.getItem('AccessToken')
      if(token != "" && token != null && token != undefined)
        history.push("/app") 
  })



  const Alert = (props: AlertProps) =>{
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    //impart ecranul in 2 coloane
    <div className={classes.root + classes.gridItem}>

        
          <div className = {classes.form}>
            <ViewErrorInfo 
              hasError = {hasError}
              errorMessage = {errorMessage}
            />
            <TextField
              className = {classes.textField}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              label="Username"
              name="username"
              value={username}
              autoFocus
              disabled={isFeedbackLoading}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              className = {classes.textField}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              disabled={isFeedbackLoading}
              label="Password"
              name="password"
              value={password}
              autoFocus
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}

              // Razvan :: adaugare button de show password
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div style={{"textAlign":"center",marginTop: 10, marginBottom: 10}} >
              <a href="/account/forgotpass">Forgot password? Click here!</a>
            </div>
            {LinearFeedback()}
            <Button fullWidth type="submit" variant="contained" color="primary"  onClick={onSubmit}>
               Sign in
            </Button>
          </div>
    </div>
  );
};
