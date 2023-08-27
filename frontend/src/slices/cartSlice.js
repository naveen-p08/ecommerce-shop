import { createSlice } from "@reduxjs/toolkit";

function decimals(num) {
  return (Math.round(num*100)/100).toFixed(2)
}

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((el) =>
          el._id === existItem._id ? item : el,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //item price
      state.itemPrice = decimals(state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0,
      ))

      //shipping price
      state.shippingPrice = decimals(state.itemPrice > 100 ? 0 : 10)

      //tax
      state.taxPrice = decimals(Number(0.15 * state.itemPrice).toFixed(2))

      //total
      state.totalPrice = (
          Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
      ).toFixed(2)

      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
});

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer;