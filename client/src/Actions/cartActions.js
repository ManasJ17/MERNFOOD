export const deleteCartItem = (item) => (dispatch, getState) => {
    dispatch({ type: 'DELETE_CART_ITEM', payload: item });
    localStorage.setItem('cartItems', JSON.stringify(getState().CartReducer.cartItems));
};
export const addToCart = (pizza, quantity, varient) => (dispatch, getState) => {
    const cartItem = {
        name: pizza.name,
        _id: pizza._id,
        image: pizza.image,
        varient: varient,
        prices: pizza.prices,
        quantity: Number(quantity),
        price: pizza.prices[varient] * quantity
    }
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    localStorage.setItem('cartItems', JSON.stringify(getState().CartReducer.cartItems));
}

export const updateCartQuantity = (item, delta) => (dispatch, getState) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { ...item, delta } });
    localStorage.setItem('cartItems', JSON.stringify(getState().CartReducer.cartItems));
}