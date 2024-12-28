import { createSlice } from '@reduxjs/toolkit';


const initialState={
    orderitems: 
    JSON.parse(localStorage.getItem('order')) ??
    [],
    favorites: JSON.parse(localStorage.getItem('favorites')) ??[],
  };

export const cartSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart : (state, action)=>{
        const item = action.payload;
        state.orderitems.push(item);
        localStorage.setItem('order',JSON.stringify(state.orderitems));
    },
    addToFavorites : (state, action)=>{
      const item = action.payload;
      const flag = state.favorites.find(element => element.id === item.id);
      if(!flag){
      state.favorites.push(item);
      localStorage.setItem('favorites',JSON.stringify(state.favorites));
    }else if(flag){
      state.favorites = state.favorites.filter((el) => el.id !== item.id);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
    
  },
  deleteCart : (state, action)=>{
    state.orderitems.length = 0;
    localStorage.setItem('order',JSON.stringify(state.orderitems));
},
  removeItem : (state, action)=>{
  const itemId = action.payload;
  state.orderitems = state.orderitems.filter((item) => item.product.id !== itemId);
  localStorage.setItem("order", JSON.stringify(state.orderitems));
  },
  },
})


export const {addToCart, addToFavorites, deleteCart, removeItem} = cartSlice.actions /*export the reducers */

export default cartSlice.reducer