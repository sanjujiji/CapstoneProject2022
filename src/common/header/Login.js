//This is being built as part of Capstone project.
//Login.js contains all the functionailities with respect to the login
import React , {useState} from 'react';
import '../header/Login.css';
import Header from '../header/Header';
import { withStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RedLockIcon = withStyles({
    root: {
      color: "white"
    }
  })(LockRoundedIcon);

function Login(){
    const [emailId,setEmailId] = useState("");
    const [loginPassword,setLoginPassword] = useState("");

    const emailIdChangeHandler = (e) => {
        setEmailId(e.target.value);
    };

    const loginPasswordChangeHandler = (e) => {
        setLoginPassword(e.target.value);
    }

    return(
        <div>
            <header>
                <Header />
            </header>
            <div className = "login">
                <Icon size="large" sx={{backgroundColor:"#EC3B83", border: "4px solid #EC3B83",borderRadius: 50}}>
                    <RedLockIcon>
                        <LockRoundedIcon/>
                    </RedLockIcon>
                </Icon>    
                <br /> <br />
                <InputLabel id="signInLabel">Sign In</InputLabel>
                <br/><br/>
                <FormControl required>
                    <TextField 
                        required
                        id="outlined-required"
                        label="Email Address"
                        variant="filled"
                        sx={{width: { sm: 200, md: 300 },backgroundColor : '#dceef4'}}
                        onChange={emailIdChangeHandler}
                    />
                </FormControl>
                <br /><br />
                <FormControl required>
                    <TextField
                        required
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        sx={{width: { sm: 200, md: 300 },backgroundColor : '#dceef4'}}
                        onChange={loginPasswordChangeHandler}
                    />
                </FormControl>
                <br/><br/>
                <Button variant="contained" sx={{width: { sm: 200, md: 300 }}}>SIGN IN</Button>
                <br/><br/>
            </div> {/*end of div for the mid part*/}
            <a href='#' id="signUpLink">Don't have an account? Sign Up</a>
            <footer id = "footer">
                <span>Copyright &copy; <a href="http://upgrad.com">upGrad</a> 2021</span>
            </footer>
        </div> //end of main div
    );
}

export default Login;