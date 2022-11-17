import React , {useState,useEffect} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import '../components/products/Products.css';
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { dataActions } from '../common/dataSlice';

  
function ProductCategories(props){
    //The below state variable is setup for the toggle button
    // const [categorySelected, setCategorySelected]   = useState(() => 'all');
    const [productCategories,setProductCategories]  = useState([]);

    // const selector = useSelector(state => state.dataSliceReducer);
    const dispatch = useDispatch();
    const selector = useSelector(state => state.dataSliceReducer);

    const handleChange = (event) => {
        dispatch(dataActions.PRODUCTCATEGORYSELECTED(event.target.value));
        console.log('store value',selector.categorySelected);
        if (window.location.href != "http://localhost:3000/products" ){
            window.location.href = '/products/';
        }
      };

        //This code is to load the product categories
        useEffect(() => {
            loadCategories();
        },[]);       

        //function to bring the product categories from the database
        const loadCategories = () =>{
            const data = null;

            let xhrloadCategories = new XMLHttpRequest();
            let prodCat ;
            xhrloadCategories.addEventListener("readystatechange", function () {
                if ((xhrloadCategories.readyState === 4) && (xhrloadCategories.status === 200) ) {
                    prodCat = JSON.parse(xhrloadCategories.responseText);
                    setProductCategories(prodCat);   
                    // dispatch(dataActions.PRODUCTCATEGORIES(prodCat));
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

    
    return(
        <div> 
            <div id = "toggle">
                <ToggleButtonGroup 
                    color="primary"
                    value={selector.categorySelected}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    >
                        <ToggleButton value="all">All</ToggleButton>
                        {/*The below code is for dynamically populating the categories */}
                            {productCategories.map((category) => (
                                <ToggleButton value={category}>{category}</ToggleButton> 
                         ))}        
                </ToggleButtonGroup>
            </div> {/* end of div id toggle */}     
        </div>//main div ending
    );
};

export default ProductCategories;