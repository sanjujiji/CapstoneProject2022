//This is being built as part of Capstone project.
//Products.js contains all the functionailities with respect to the display of products for different users


import React , {useState,useEffect} from 'react';
import Header from '../../common/header/Header';
import './Products.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
// import { dataActions } from '../../common/dataSlice';
import ProductCategories from '../../common/ProductCategories';

  
function Products(props){
    
    const [sortBy, setSortBy]                       = useState('');
    const [products,setProducts]                    = useState([]);

    const selector = useSelector(state => state.dataSliceReducer);
    // const dispatch = useDispatch();

      const handleSortChange = (event) => {
        setSortBy(event.target.value);
      }

        //This code is to load the products
        useEffect(() => {
            loadProducts();
        },[selector.categorySelected,sortBy,selector.searchBarValue]);

        //function to sort the products array by price
        const sortByPriceAsc = (arr) => {
            arr.sort((a, b) => {
                return parseInt(a.price) - parseInt(b.price);
            });
        }

        const sortByPriceDesc = (arr) => {
            arr.sort((a, b) => {
                return parseInt(b.price) - parseInt(a.price);
            });
        }

        //function to sort the products by dates
        const sortByDates = (arr) => {
            arr.sort((a, b) => {
                let da = new Date(a.updatedAt),
                    db = new Date(b.updatedAt);
                return db - da;
            });
        }


        //function to bring the products from the database
        const loadProducts = () =>{
            console.log("loadProducts");
            const data = null;
            let xhrloadProducts = new XMLHttpRequest();
            let prods ;
            xhrloadProducts.addEventListener("readystatechange", function () {
                if ((xhrloadProducts.readyState === 4) && (xhrloadProducts.status === 200) ) {
                    prods = JSON.parse(xhrloadProducts.responseText);
                    console.log("category",selector.categorySelected);
                    console.log("prods",prods);
                    //the below piece of code is to check if there are any specific categories selected
                    if (selector.categorySelected !== "all"){
                        var newArray = prods.content.filter((element) => {
                            return (element.category === selector.categorySelected);
                        });
                    }
                    else {
                            console.log("in else");
                            newArray = prods.content;
                          
                    };
                    console.log("new",newArray);
                    var newArray1;
                    if (selector.searchBarValue){
                        newArray1 = newArray.filter((element) => {
                            return (element.name.toUpperCase().search(selector.searchBarValue.toUpperCase())>=0);
                        });
                    }
                    else {
                        newArray1 = newArray;
                    }
                    

                    //sort the array based on selection
                    if (sortBy === 20){
                        sortByPriceDesc(newArray1);
                    }
                    else if (sortBy === 30){
                        sortByPriceAsc(newArray1);
                    }
                    else if (sortBy === 40){
                        sortByDates(newArray1);
                    }
                    
                    setProducts(newArray1);
                    
                }
                else if (xhrloadProducts.status !== 200) {
                    setProducts([]);
                }
        });
        console.log(props.baseUrl);
        xhrloadProducts.open("GET", props.baseUrl + "products",true);
        xhrloadProducts.setRequestHeader('Content-type', 'application/json');
        xhrloadProducts.send(data);
      }

      //call product details
      const callProdDetails = (productId) => {
        window.location.href = '/products/'+productId;
      }
    
    return(
        <div> 
            <header>
                <Header />
            </header>
            <br></br>
                <ProductCategories  baseUrl={props.baseUrl}/>
            <br></br>
            
            {/* Sort by dropdown */}
            <div className = "select">
                <InputLabel id="sortByLabel">Sort By:</InputLabel>
                <FormControl sx={{minWidth: 200 }}>
                    <Select
                        value={sortBy}
                        onChange={handleSortChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <i>Select...</i>
                            </MenuItem>
                            <MenuItem value={10}>Default</MenuItem>
                            <MenuItem value={20}>Price: High to Low</MenuItem>
                            <MenuItem value={30}>Price: Low to High</MenuItem>
                            <MenuItem value={40}>Newest</MenuItem>
                    </Select> 
                </FormControl>
            </div>{/* end of div select */}
            <br></br><br></br>
            {/* Below code is for dividing the web page into grids for product display */}
            <div className = "gridMui">
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 4, md: 4 }} >
                            {/*The below code is for dynamically populating the products */}
                            {products.map((product) => (
                                <Grid item xs={4} > 
                                    {/* <Item><img src={product.imageURL} alt = {product.imageURL} width = "100" height = "100"></img></Item> */}
                                    <Card sx={{ width: 325 , height : 400}}>
                                        <CardContent>
                                        <img src={product.imageURL} alt = {product.imageURL} width = "275" height = "200"></img>
                                        <div id="prodTitle">
                                            <Typography style={{wordWrap : "true"}} sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                                <b>{product.name}</b>
                                            </Typography>
                                            
                                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                            <b><span>&#8377;</span>{product.price}</b>
                                            </Typography>
                                        </div>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        
                                            {product.description}
                                            </Typography>
                                        </CardContent>
                                        <div id="cardFooter">
                                            <CardActions id="cardButton">
                                                <Button size="small" variant="contained" onClick = {() => callProdDetails(product.productId)}>Buy</Button>
                                            </CardActions>
                                        </div>
                                    </Card>
                               
                                </Grid>
                            ))}   
                    </Grid>
                </Box>
            </div> {/* Grid ending */}
        </div>//main div ending
    );
};

export default Products;