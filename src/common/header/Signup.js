//This is being built as part of Capstone project.
//Login.js contains all the functionailities with respect to the login
import React , {useState} from 'react';
import '../header/Signup.css';
import Header from './Header';
import { withStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
// import { dataActions } from '../dataSlice';
import { LOGINSHOW,LOGOUTSHOW,SIGNUPSHOW,HOMESHOW,SEARCHBARSHOW,ADDPRODUCTSHOW } from '../dataSlice';

const RedLockIcon = withStyles({
    root: {
      color: "white"
    }
  })(LockRoundedIcon);

  let theme = createTheme({
    spacing : 4,
  });
  
  theme = createTheme(theme,{
    typography: {
      body1 : {
        margin : theme.spacing(1),
      }
    },
  }); 
  
 
function Signup(props){
    const [emailId,setEmailId]                      =   useState("");
    const [loginPassword,setLoginPassword]          =   useState("");
    const [firstName,setFirstName]                  =   useState("");
    const [lastName,setLastName]                    =   useState("");
    const [loginCnfPassword,setLoginCnfPassword]    =   useState("");
    const [contactNo,setContactNo]                  =   useState("");

    const selector = useSelector(state => state.dataSliceReducer);
    const dispatch = useDispatch();

    //Below listed functions are for setting the different state variables
    const emailIdChangeHandler = (e) => {
        setEmailId(e.target.value);
    };

    const loginPasswordChangeHandler = (e) => {
        setLoginPassword(e.target.value);
    };

    const firstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    };

    const lastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    };

    const loginCnfPasswordChangeHandler = (e) => {
        setLoginCnfPassword(e.target.value);
    }

    const contactNoChangeHandler = (e) => {
        setContactNo(e.target.value);
    }

     //this code will make a database call to make a new sign up registration
     const invokeSignup = () => {
        document.getElementById("successMsg").innerText="";
        document.getElementById("errorMsg").innerText="";
        //check if password and Confirm password are the same before making the API call
        console.log(firstName,lastName,loginCnfPassword,loginPassword,emailId,contactNo);
        if(loginPassword != loginCnfPassword){
            document.getElementById("errorMsg").innerText = "Password and Confirm Password are not the same. Please correct!"
            return;
        }
        else {
            let invokeSignUpData = JSON.stringify({
                "first_name"        : firstName,
                "last_name"         : lastName,
                "password"          : loginPassword,
                "email"             : emailId,
                "contact_number"    : contactNo
            });
            console.log(invokeSignUpData);
            let xhrSignUp = new XMLHttpRequest();
            xhrSignUp.addEventListener("readystatechange", function () {
                if ((xhrSignUp.readyState === 4) && (xhrSignUp.status == 200) ) {
                    
                    //Disable the signup and login links and show the logout button and home button
                    dispatch(LOGINSHOW(true));
                    dispatch(LOGOUTSHOW(false));
                    dispatch(SIGNUPSHOW(false));
                    dispatch(HOMESHOW(false));
                    dispatch(SEARCHBARSHOW(false));
                    //redirect to the products page
                    document.getElementById("successMsg").innerText = "You have been successfully registered. Please login to continue!"
                }
                else {
                    //return the error message
                    console.log(xhrSignUp.responseText);
                    if (JSON.parse(xhrSignUp.responseText).message != undefined)
                        document.getElementById("errorMsg").innerText = JSON.parse(xhrSignUp.responseText).message;
                }
        });

        xhrSignUp.open("POST", props.baseUrl + "users",true);
        xhrSignUp.setRequestHeader('Content-type', 'application/json');
        xhrSignUp.send(invokeSignUpData);
    }
}
    return(
        <div>
           
            <header>
                <Header />
            </header>
            <br/><br/><br/><br/><br/>
            <div className = "signup">
            <br/>
                <Icon size="large" sx={{backgroundColor:"#EC3B83", border: "4px solid #EC3B83",borderRadius: 50}}>
                    <RedLockIcon>
                        <LockRoundedIcon/>
                    </RedLockIcon>
                </Icon>    
                <br /> <br />
                <InputLabel id="signInLabel">Sign Up</InputLabel>
                <br></br>
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField 
                                required
                                value={firstName}
                                id="outlined-required"
                                label="First Name"
                                sx={{width: { sm: 200, md: 300 }}}
                                onChange={firstNameChangeHandler}
                            />
                        </FormControl>
                    </Typography>
                </ThemeProvider>
            
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField 
                                required
                                value={lastName}
                                id="outlined-required"
                                label="Last Name"
                                sx={{width: { sm: 200, md: 300 }}}
                                onChange={lastNameChangeHandler}
                            />
                        </FormControl>
                    </Typography>
                </ThemeProvider>        
                
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField 
                                required
                                value={emailId}
                                id="outlined-required"
                                label="Email Address"
                                sx={{width: { sm: 200, md: 300 }}}
                                onChange={emailIdChangeHandler}
                            />
                        </FormControl>
                    </Typography>
                </ThemeProvider>
                
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField
                                required
                                value={loginPassword}
                                id="filled-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                sx={{width: { sm: 200, md: 300 }}}
                                onChange={loginPasswordChangeHandler}
                            />
                        </FormControl>
                    </Typography> 
                </ThemeProvider>       
                
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField
                                required
                                value={loginCnfPassword}
                                id="filled-password-input"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                                sx={{width: { sm: 200, md: 300 }}}
                                onChange={loginCnfPasswordChangeHandler}
                            />
                        </FormControl>
                    </Typography>
                </ThemeProvider>    
                
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl  required>
                            <TextField
                                required
                                value={contactNo}
                                id="filled-password-input"
                                label="Contact No"
                                sx={{width: { sm: 200, md: 300 }}}
                                onChange={contactNoChangeHandler}
                            />
                            
                            <Button onClick={() => invokeSignup()} variant="contained" sx={{width: { sm: 200, md: 300 }}}>SIGN UP</Button>
                            <a href='/login' id="signInLink">Already have an account? Sign In</a>
                        </FormControl>
                    </Typography>
                </ThemeProvider>    
                    <span id = "errorMsg"></span>
                    <br></br>
                    <span id ="successMsg"></span>
                </div> {/*end of div for the mid part*/}
               
            <footer id = "footer">
                <span>Copyright &copy; <a href="http://upgrad.com">upGrad</a> 2022</span>
            </footer>
        </div> //end of main div
    );
}

export default Signup;