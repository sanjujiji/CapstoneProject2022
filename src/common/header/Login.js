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
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from '../dataSlice';
import jwt from 'jwt-decode';

const RedLockIcon = withStyles({
    root: {
      color: "white"
    }
  })(LockRoundedIcon);



function Login(props){
    const [emailId,setEmailId] = useState("");
    const [loginPassword,setLoginPassword] = useState("");

     
  const selector = useSelector(state => state.dataSliceReducer);
  const dispatch = useDispatch();

    const emailIdChangeHandler = (e) => {
        setEmailId(e.target.value);
    };

    const loginPasswordChangeHandler = (e) => {
        setLoginPassword(e.target.value);
    }
    //this code will make a database call to check if the user is a valid user
    const invokeLogin = () => {
        
        let invokeLoginData = JSON.stringify({
            "email" : emailId,
            "password" : loginPassword
        });
        
        let xhrLogin = new XMLHttpRequest();
        xhrLogin.addEventListener("readystatechange", function () {
            if ((xhrLogin.readyState === 4) && (xhrLogin.status == 200) ) {
                
                //save the x-auth-token to local storage for future use
                sessionStorage.setItem("x-auth-token",xhrLogin.getResponseHeader('x-auth-token'));
                console.log("decoded token",jwt(xhrLogin.getResponseHeader('x-auth-token')).role);
                if (jwt(xhrLogin.getResponseHeader('x-auth-token')).role === "admin"){
                //Disable the signup and login links and show the logout button and home button
                    dispatch(dataActions.ADDPRODUCTSHOW(true));
                
                }
                    dispatch(dataActions.LOGINSHOW(false));
                    dispatch(dataActions.LOGOUTSHOW(true));
                    dispatch(dataActions.SIGNUPSHOW(false));
                    dispatch(dataActions.HOMESHOW(true));
                    dispatch(dataActions.SEARCHBARSHOW(true));
                    //redirect to the products page
                    console.log("login",selector.loginShow);
                    window.location.href = '/products';
            }
                else if (xhrLogin.status !== 200){
                //return the error message
                if ((xhrLogin.responseText) != undefined)
                    document.getElementById("errorMsg").innerText = xhrLogin.responseText;
            }
        });

        xhrLogin.open("POST", props.baseUrl + "auth",true);
        // xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.setRequestHeader('Content-type', 'application/json');
        xhrLogin.send(invokeLoginData);
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
                        value={emailId}
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
                        value={loginPassword}
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        sx={{width: { sm: 200, md: 300 },backgroundColor : '#dceef4'}}
                        onChange={loginPasswordChangeHandler}
                    />
                    <br></br>
                    <Button onClick={() => invokeLogin()} variant="contained" sx={{width: { sm: 200, md: 300 }}}>SIGN IN</Button>
                    <br></br>
                    <a href='/signup' id="signUpLink">Don't have an account? Sign Up</a>
                    <br></br><br></br>
                    <p id = "errorMsg"></p>
                </FormControl>
                
            </div> {/*end of div for the mid part*/}
            
            <br></br><br></br>
            
            <footer id = "footer">
                <span>Copyright &copy; <a href="http://upgrad.com">upGrad</a> 2022</span>
            </footer>
        </div> //end of main div
    );
}

export default Login;