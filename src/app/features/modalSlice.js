import { createSlice } from '@reduxjs/toolkit';


const initialState={
    modalState: 
    JSON.parse(localStorage.getItem('modal')) ??
    false,
    modalProduct: JSON.parse(localStorage.getItem('productDetails')) ??
    {},
  };

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    swipeState : (state, action)=>{
        const stato = action.payload;
        state.modalState=!state.modalState;
        localStorage.setItem('modal',JSON.stringify(state.modalState));
    },
    productDetails : (state, action)=>{
        const producto = action.payload;
        state.modalProduct = producto;
        localStorage.setItem('productDetails',JSON.stringify(state.modalProduct));
    },
  },
})


export const {swipeState, productDetails} = modalSlice.actions /*export the reducers */

export default modalSlice.reducer