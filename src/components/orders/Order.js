//This is being built as part of Capstone project.
//AddOrders.js contains all the functionailities with respect to the product order

import React , {useState,useEffect} from 'react';
import Header from '../../common/header/Header';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './Order.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from '../../common/dataSlice';

//Below styling is for the grid
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
  
const steps = ["Items","Select Address","Confirm Order"];


 
function Order(props){
    const [activeStep, setActiveStep]       =   useState(0);
    const [selectedAddr, setSelectedAddr]   =   useState('');
    const [street,setStreet]                =   useState("");
    const [city,setCity]                    =   useState("");
    const [firstName,setFirstName]          =   useState("");
    const [lastName,setLastName]            =   useState("");
    const [state,setState]                  =   useState("");
    const [landmark,setLandmark]            =   useState(""); 
    const [zipCode,setZipCode]              =   useState("");
    const [contactNo, setContactNo]         =   useState("");
    const [prodDetails,setProdDetails]      =   useState({});
   // const [skipped, setSkipped] = React.useState(new Set());
    // const isStepOptional = (step) => {
    //     return step === 1;
    //   };
    
    //   const isStepSkipped = (step) => {
    //     return skipped.has(step);
    //   };
    
      const handleNext = () => {
        // let newSkipped = skipped;
        // if (isStepSkipped(activeStep)) {
        //   newSkipped = new Set(newSkipped.values());
        //   newSkipped.delete(activeStep);
        // }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setSkipped(newSkipped);
      };
      const selector = useSelector(state => state.dataSliceReducer);
      const dispatch = useDispatch();

      useEffect(() => {
        var dtls = JSON.parse(sessionStorage.prodDetails);
        setProdDetails(dtls);
    },[]);
      
      
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

      const handleAddrChange = (event) => {
        setSelectedAddr(event.target.value);
      }

      //Below listed functions are for setting the different state variables
    const streetChangeHandler = (e) => {
        setStreet(e.target.value);
    };

    const cityChangeHandler = (e) => {
        setCity(e.target.value);
    };

    const firstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    };

    const lastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    };

    const stateChangeHandler = (e) => {
        setState(e.target.value);
    }

    const landmarkChangeHandler = (e) => {
        setLandmark(e.target.value);
    }
    
    const zipCodeChangeHandler = (e) => {
        setZipCode(e.target.value);
    }

    const contactNoChangeHandler = (e) => {
        setContactNo(e.target.value);
    }
    
    
      const handleReset = () => {
        setActiveStep(0);
      };
    return(
        <div>
            <header>
                <Header />
            </header>    
            {/*The below piece of code is for setting up of stepper */}
            <div id="stepper">
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                        {/* if (isStepOptional(index)) {
                            labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    } */}
                        {/* if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        } */}
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                        })}
                    </Stepper>      
                </Box>
            </div>{/*ending div for stepper */}
            
            {/* Below code is for dividing the web page into grids for product display */}
            <div className = "gridMui">
                <Box sx={{ width: '100%' ,margin:'5%'}}>
                    <Grid container sx={{mr:10,ml:10}}>
                        <Grid item >
                            <Card sx={{ width: 500 , height : 500}}>
                                <CardContent>
                                    <img src={prodDetails.imageURL} alt = "image" width = "375" height = "375"></img>
                                </CardContent>
                            </Card> 
                        </Grid>
                        <Grid item>
                            <Card sx={{ width: 500 , height : 500}}>
                                <CardContent>
                                    <div >
                                    <div id="firstPart">
                                        <Typography style={{wordWrap : "false"}} sx={{ fontSize: 24 }} gutterBottom>
                                            <b>{prodDetails.name} </b> 
                                        </Typography>
                                        {/* <Box component="span" sx={{ p:0.3,textAlign: 'center',width:180 ,height:22, fontSize:12, border: '1px solid blue',backgroundColor: 'blue' ,color : 'white',borderRadius: 8}}>
                                            Available Quantity : {selector.prodDetails.availableItems}
                                        </Box> */}
                                    </div>
                                        <Typography style={{wordWrap : "false"}} sx={{ fontSize: 16 }} gutterBottom>
                                            Category: <b>{prodDetails.category}</b>
                                        </Typography>
                                        <br></br>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {prodDetails.description}
                                        </Typography>
                                        <br></br>
                                        <Typography sx={{ fontSize: 24 }} color="red" gutterBottom>
                                            <span>&#8377;</span>{prodDetails.price}
                                        </Typography>
                                        <br></br> <br></br>
                                        {/* <Button variant="contained" href="/order">
                                            Place Order
                                        </Button>    */}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div> {/* Grid ending */}
            
                <br></br><br></br>
                {/*Below pieces of code are for adding / selecting shipping address */}
                <div className='outerDiv'>
                    <div className = "innerDiv">
                        
                            <FormControl sx={{minWidth: 800 }}>
                            <InputLabel id="addressSelect">Select Address</InputLabel>
                            <br></br><br></br>
                                <Select
                                    labelId="addressSelect"
                                    value={selectedAddr}
                                    onChange={handleAddrChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    className="selectAddr"
                                >
                                    <MenuItem value="">
                                        <i>Select...</i>
                                    </MenuItem>
                                    <MenuItem value={10}>Default</MenuItem>
                                </Select> 
                            </FormControl> 
                    </div>{/* end of div select */}
                    <br></br><br></br>
                    <div className = "innerDiv">
                        <InputLabel>- OR -</InputLabel>        
                    </div>{/* end of div InputLabel */}
                    <br></br><br></br>
                    <div className = "innerDiv">
                        <InputLabel id="addAddress">Add Address</InputLabel>
                    </div>{/* end of div InputLabel for address*/}
                        
                    <div className = "innerDiv">
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
                                        value={contactNo}
                                        id="outlined-required"
                                        label="Contact Number"
                                        sx={{width: { sm: 200, md: 300 }}}
                                        onChange={contactNoChangeHandler}
                                    />
                                </FormControl>
                            </Typography>
                        </ThemeProvider>
                
                        <ThemeProvider theme={theme}>
                            <Typography variant="body1" gutterBottom>
                                <FormControl required>
                                    <TextField
                                        required
                                        value={street}
                                        id="outlined-required"
                                        label="Street"
                                        sx={{width: { sm: 200, md: 300 }}}
                                        onChange={streetChangeHandler}
                                    />
                                </FormControl>
                            </Typography> 
                        </ThemeProvider>       
                
                        <ThemeProvider theme={theme}>
                            <Typography variant="body1" gutterBottom>
                                <FormControl required>
                                    <TextField
                                        required
                                        value={city}
                                        id="outlined-required"
                                        label="City"
                                        sx={{width: { sm: 200, md: 300 }}}
                                        onChange={cityChangeHandler}
                                    />
                                </FormControl>
                            </Typography>
                        </ThemeProvider>    
                
                        <ThemeProvider theme={theme}>
                            <Typography variant="body1" gutterBottom>
                                <FormControl  required>
                                    <TextField
                                        required
                                        value={state}
                                        id="outlined-required"
                                        label="State"
                                        sx={{width: { sm: 200, md: 300 }}}
                                        onChange={stateChangeHandler}
                                    />
                                </FormControl>
                            </Typography>
                        </ThemeProvider>    
                
                        <ThemeProvider theme={theme}>
                            <Typography variant="body1" gutterBottom>
                                <FormControl  >
                                    <TextField
                                        value={landmark}
                                        id="outlined"
                                        label="Landmark"
                                        sx={{width: { sm: 200, md: 300 }}}
                                        onChange={landmarkChangeHandler}
                                    />
                                </FormControl>
                            </Typography>
                        </ThemeProvider>

                        <ThemeProvider theme={theme}>
                            <Typography variant="body1" gutterBottom>
                                <FormControl  >
                                    <TextField
                                        required
                                        value={zipCode}
                                        id="outlined-required"
                                        label="Zip Code"
                                        sx={{width: { sm: 200, md: 300 }}}
                                        onChange={zipCodeChangeHandler}
                                    />
                                </FormControl>
                            </Typography>
                        </ThemeProvider>
                        <Button variant="contained" sx={{width: { sm: 200, md: 300 }}}>SAVE ADDRESS</Button>
                        <br/><br/>
                    </div>{/*End of inner div */}
                </div>{/*End of outer div */}
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent : 'center', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                variant = "contained"
                            >
                                Back
                            </Button>
                            {/*<Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                            )}*/}
                            <Button color = "primary" variant = "contained" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
                {/*Below piece of code is for the Order confirmation */}
                {/* Below code is for dividing the web page into grids for product display */}
            <div className = "gridMui">
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Item>1</Item>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        benevoent
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                 </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>2</Item>
                        </Grid>
                    </Grid>
                </Box>
            </div> {/* Grid ending */}
        </div> //end of main div
    );
}

export default Order;