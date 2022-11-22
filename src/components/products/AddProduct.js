import React , {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import Header from '../../common/header/Header';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareCaretDown,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DeleteIcon from '@mui/icons-material/Delete';
const filter = createFilterOptions();

function AddProduct(props){

    const [productName,setProductName]              =   useState("");
    const [category,setCategory]                    =   useState("");
    const [manufacturer,setManufacturer]            =   useState("");
    const [availableItems,setAvailableItems]        =   useState();
    const [price,setPrice]                          =   useState();
    const [imageURL,setImageURL]                    =   useState("");
    const [prodDesc,setProdDesc]                    =   useState("");
    const [value, setValue]                         =   useState(null);
    const [productCategories,setProductCategories]  =   useState([{}]);
    const [prodAdded,setProdAdded]                  =   useState(false);
    const [addProdState, setAddProdState] = useState({
        openAddProd: false,
        verticalAdd: 'top',
        horizontalAdd: 'right'
      });
    const {openAddProd,verticalAdd,horizontalAdd} = addProdState;

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
      const dispatch = useDispatch();

      useEffect(() => {
        loadCategories();
    },[]);

    const handleAddProdOpen = () => {
        setAddProdState({ ...addProdState , openAddProd: true });
    };

    const handleAddProdClose = () => {
        setAddProdState({ ...addProdState , openAddProd: false });
        setProdAdded(false);
    };

    const actionAddProd = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleAddProdClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

      //Below listed functions are for setting the different state variables in the form
    const productNameChangeHandler = (e) => {
        setProductName(e.target.value);
    };

    const manufacturerChangeHandler = (e) => {
        setManufacturer(e.target.value);
    };

    const availItemsChangeHandler = (e) => {
        setAvailableItems(e.target.value);
    };

    const priceChangeHandler = (e) => {
        setPrice(e.target.value);
    };

    const imageURLChangeHandler = (e) => {
        setImageURL(e.target.value);
    };

    const prodDescChangeHandler = (e) => {
        setProdDesc(e.target.value);
    };

    //function to bring the product categories from the database
    const loadCategories = () =>{
        const data = null;
        document.getElementById("errorMsg").innerHTML = "";

        let xhrloadCategories = new XMLHttpRequest();
        let prodCat ;
        xhrloadCategories.addEventListener("readystatechange", function () {
            if ((xhrloadCategories.readyState === 4) && (xhrloadCategories.status === 200) ) {
                prodCat = JSON.parse(xhrloadCategories.responseText);
                
                // dispatch(dataActions.PRODUCTCATEGORIES(prodCat));
                var newArr = [];
                for (var i =0 ; i<prodCat.length;i++){
                    var obj = {};
                    obj["category"] = prodCat[i];
                    newArr.push(obj);
                }
                setProductCategories(newArr);   

            }
            else if (xhrloadCategories.status !== 200) {
                setProductCategories([]);
                // dispatch(dataActions.PRODUCTCATEGORIES([]));
            }
    });
    xhrloadCategories.open("GET", props.baseUrl + "products/categories",true);
    xhrloadCategories.setRequestHeader('Content-type', 'application/json');
    xhrloadCategories.send(data);
  }

    //function to modify the details of the product 
    const addProdDetails = () =>{
        const data = JSON.stringify({
            "name"              : productName,
            "category"          : category,
            "manufacturer"      : manufacturer,
            "availableItems"    : availableItems,
            "price"             : price,
            "imageURL"          : imageURL,
            "description"       : prodDesc
        });
        let xhrAddProdDetails = new XMLHttpRequest();
        xhrAddProdDetails.addEventListener("readystatechange", function () {
            console.log(xhrAddProdDetails.readyState,xhrAddProdDetails.status ,xhrAddProdDetails.responseText)
            if ((xhrAddProdDetails.readyState === 4) && (xhrAddProdDetails.status === 200) ) {
                setProdAdded(true);
                handleAddProdOpen({
                    verticalAdd     : 'top',
                    horizontalAdd   : 'right'
                  });
            }
            else if ((xhrAddProdDetails.readyState === 4) && (xhrAddProdDetails.status !== 200) && (JSON.parse(xhrAddProdDetails.responseText).message != undefined)) {
                // setProdDetails([]);  
                console.log(xhrAddProdDetails.responseText);
                document.getElementById("errorMsg").innerHTML = JSON.parse(xhrAddProdDetails.responseText).message;
            }
    });
    console.log(data);
    xhrAddProdDetails.open("POST", props.baseUrl + "products",true);
    xhrAddProdDetails.setRequestHeader("Authorization",sessionStorage.getItem('x-auth-token'));
    xhrAddProdDetails.setRequestHeader('Content-type', 'application/json');
    xhrAddProdDetails.send(data);
  }

    return(
        <div>
            <header>
                <Header />
            </header>
            <br/><br/><br/><br/><br/>
            <div className = "modify">
                <InputLabel id="modifyLabel">Add Product</InputLabel>
                <br></br>
                
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField 
                                required
                                value={productName}
                                id="outlined-required"
                                label="Name"
                                sx={{width: { sm: 200, md: 300 }}}
                                InputLabelProps={{ shrink: true }}
                                onChange={productNameChangeHandler}
                                autoComplete="off"
                            />
                        </FormControl>
                    </Typography>
                </ThemeProvider>
            
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                        {/**Createable Select */}
                            <Autocomplete
                            
                                value={value}
                                onChange={(event, newValue) => {
                                    console.log("newValue",newValue);
                                if (typeof newValue === 'string') {
                                    setValue({
                                        category: newValue,
                                    })
                                    setCategory(newValue.category);
                                } else if (newValue && newValue.inputValue) {
                                    // Create a new value from the user input
                                    setValue({
                                        category: newValue.inputValue,
                                    });
                                    setCategory(newValue.inputValue);
                                    
                                } else {
                                setValue(newValue);
                                setCategory(newValue.category);
                                }
                               
                                }}
                                filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some((option) => inputValue === option.category);
                                if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    category: `Add "${inputValue}"`,
                                });
                                }
                                return filtered;
                                }}
                                
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="combo-box-demo"
                                options={productCategories}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                    return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                    return option.inputValue;
                                    }
                                    // Regular option
                                    return option.category;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.category}</li>}
                                sx={{ width: 300 }}
                                freeSolo
                                renderInput={(params) => (
                                    <div>
                                    <TextField {...params} label="Category">
                                    <i className="fa-solid fa-caret-down"></i>
                                    </TextField>
                                    
                                    
                                    {/* <FontAwesomeIcon icon="faTrashCan" /> */}
                                                    </div>
                                    
                                )}
                                
                                />
                                
                            {/**End of Createable Select */}
                        </FormControl>
                    </Typography>
                </ThemeProvider>        
                
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField 
                                required
                                value={manufacturer}
                                id="outlined-required"
                                label="Manufacturer"
                                sx={{width: { sm: 200, md: 300 }}}
                                InputLabelProps={{ shrink: true }}
                                onChange={manufacturerChangeHandler}
                            />
                        </FormControl>
                    </Typography>
                </ThemeProvider>
                
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField
                                required
                                value={availableItems}
                                id="outlined-required"
                                label="Available Items"
                                sx={{width: { sm: 200, md: 300 }}}
                                InputLabelProps={{ shrink: true }}
                                onChange={availItemsChangeHandler}
                            />
                        </FormControl>
                    </Typography> 
                </ThemeProvider>       
                
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField
                                required
                                value={price}
                                id="outlined-required"
                                label="Price"
                                sx={{width: { sm: 200, md: 300 }}}
                                InputLabelProps={{ shrink: true }}
                                onChange={priceChangeHandler}
                            />
                        </FormControl>
                    </Typography>
                </ThemeProvider>   

                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl required>
                            <TextField
                                required
                                value={imageURL}
                                id="outlined-required"
                                label="Image URL"
                                sx={{width: { sm: 200, md: 300 }}}
                                InputLabelProps={{ shrink: true }}
                                onChange={imageURLChangeHandler}
                            />
                        </FormControl>
                    </Typography>
                </ThemeProvider> 
                
                <ThemeProvider theme={theme}>
                    <Typography variant="body1" gutterBottom>
                        <FormControl  required>
                            <TextField
                                required
                                value={prodDesc}
                                id="outlined-required"
                                label="Product Description"
                                sx={{width: { sm: 200, md: 300 }}}
                                InputLabelProps={{ shrink: true }}
                                onChange={prodDescChangeHandler}
                            />
                            <br></br>
                            <Button onClick={() => addProdDetails()} variant="contained" sx={{width: { sm: 200, md: 300 }}}>SAVE PRODUCT</Button>
                        </FormControl>
                    </Typography>
                </ThemeProvider>    
                    <span id = "errorMsg"></span>
                    <br></br>
                    <span id ="successMsg"></span>
                </div> {/*end of div for the mid part*/}
                {/*Snackbar for product addition */}
            {prodAdded ?
            <div>
                <Snackbar sx={{width : '10'}}
                    anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                    }}
                    open={openAddProd}
                    onClose={handleAddProdClose}
                    key={verticalAdd + horizontalAdd}
                    autoHideDuration={6000}
                >
                    <SnackbarContent sx={{ backgroundColor: "green", color : "white"}}
                        message={"Product "+productName+" added successfully!"}
                        action = {actionAddProd} >
                    </SnackbarContent>
                    
                </Snackbar>
            </div>
             : null
            }
            </div>
    )
}

export default AddProduct;