export function decimals(num) {
	return (Math.round(num*100)/100).toFixed(2)
}

export function updateCart(state) {
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
		Number(state.itemPrice) +
		Number(state.shippingPrice) +
		Number(state.taxPrice)
	).toFixed(2);

	localStorage.setItem('cart', JSON.stringify(state))

	return state
}
