import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
    name: 'menuDisplay',
    initialState: {
        loginShow           : true,
        logoutShow          : false,
        signUpShow          : true,
        homeShow            : false,
        addProductShow      : false,
        searchBarShow       : true,
        searchBarValue      : "",
        // prodDetails         : {},
        categorySelected    : 'all',
        orderQuantity       : 0
    },
    reducers: {
        LOGINSHOW : (state , action) => {
            state.loginShow = action.payload;
        },
        LOGOUTSHOW : (state,action) => {
            state.logoutShow = action.payload;
        },
        SIGNUPSHOW : (state,action) => {
            state.signUpShow = action.payload;
        },
        HOMESHOW : (state,action) => {
            state.homeShow = action.payload;
        },
        ADDPRODUCTSHOW : (state,action) => {
            state.addProductShow = action.payload;
        },
        SEARCHBARSHOW : (state,action)  => {
            state.searchBarShow = action.payload;
        }, 
        SEARCHBARVALUE : (state,action)  => {
            state.searchBarValue = action.payload;
        },
        // PRODDETAILS :  (state,action)  => {
        //     state.prodDetails = action.payload;
        // },
        PRODUCTCATEGORYSELECTED : (state,action)  => {
            state.categorySelected = action.payload;
        },
        QUANTITY : (state,action) =>{
            state.orderQuantity = action.payload;
        }

    }
})  
export const dataActions = dataSlice.actions