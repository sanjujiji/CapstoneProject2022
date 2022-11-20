//This is being built as part of Capstone project.
//ProductDetails.js contains all the functionailities with respect to the display of products details

import React , {useState,useEffect} from 'react';
import Header from '../../common/header/Header';
import './Products.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
// import { dataActions } from '../../common/dataSlice';
import ProductCategories from '../../common/ProductCategories';
import { QUANTITY } from '../../common/dataSlice';


function ProductDetails(props){
    //The below state variable is setup for the toggle button
    const [prodDetails,setProdDetails]  = useState([]);
    // const [quantity, setQuantity]       = useState(0);

    // const selector = useSelector(state => state.dataSliceReducer);
    const dispatch = useDispatch();
    const quantityCheck = useSelector((state) => state.orderQuantity);
    console.log("product details",quantityCheck);

    const handleQuantityChange = (event) => {
        // setQuantity(event.target.value);
        dispatch(QUANTITY(event.target.value));
    }

    
    //This code is to load the product details
    useEffect(() => {
        loadProdDetails();
    },[]);

    //function to bring the product details from the database
    const loadProdDetails = () =>{
        const data = null;
        const prodId = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
        let xhrloadProdDetails = new XMLHttpRequest();
        let prodDetailsNew ;
        xhrloadProdDetails.addEventListener("readystatechange", function () {
            if ((xhrloadProdDetails.readyState === 4) && (xhrloadProdDetails.status === 200) ) {
                prodDetailsNew = JSON.parse(xhrloadProdDetails.responseText);
                setProdDetails(prodDetailsNew);   
                sessionStorage.setItem("prodDetails",JSON.stringify(prodDetailsNew));
                // dispatch(dataActions.PRODDETAILS(prodDetailsNew));
                // console.log(selector.prodDetails,"after setting");
            }
            else if (xhrloadProdDetails.status !== 200) {
                setProdDetails([]);  
                // dispatch(dataActions.PRODDETAILS([]));
            }
    });
    console.log(props.baseUrl);
    xhrloadProdDetails.open("GET", props.baseUrl + "products/"+prodId,true);
    xhrloadProdDetails.setRequestHeader('Content-type', 'application/json');
    xhrloadProdDetails.send(data);
  }
    return(
        <div>
            <header>
                <Header />
            </header>
            <br></br>
                <ProductCategories baseUrl={props.baseUrl}/>
            <br></br>
            {/* Below code is for dividing the web page into grids for product display */}
            <div className = "gridMui">
                <Box sx={{ width: '100%' ,margin:'5%'}}>
                    <Grid container sx={{mr:10,ml:10}}>
                        <Grid item >
                            <Card sx={{ width: 500 , height : 500}}>
                                <CardContent>
                                    <img src={prodDetails.imageURL} alt = {prodDetails.imageURL} width = "375" height = "375"></img>
                                </CardContent>
                            </Card> 
                        </Grid>
                        <Grid item>
                            <Card sx={{ width: 500 , height : 500}}>
                                <CardContent>
                                    <div>
                                    <div id="firstPart">
                                        <Typography style={{wordWrap : "false"}} sx={{ fontSize: 24 }} gutterBottom>
                                            <b>{prodDetails.name} </b> 
                                        </Typography>
                                        <Box component="span" sx={{ p:0.3,textAlign: 'center',width:180 ,height:22, fontSize:12, border: '1px solid blue',backgroundColor: 'blue' ,color : 'white',borderRadius: 8}}>
                                            Available Quantity : {prodDetails.availableItems}
                                        </Box>
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
                                        <br></br>
                                        <TextField
                                            required
                                            id="outlined-multiline-flexible"
                                            label="Enter Quantity"
                                            value={quantityCheck}
                                            onChange={handleQuantityChange}
                                            />
                                        <br></br> <br></br>
                                        <Button variant="contained" href="/order">
                                            Place Order
                                        </Button>   
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div> {/* Grid ending */}
        </div> //end of main div
    );
}

export default ProductDetails;