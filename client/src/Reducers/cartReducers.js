export const CartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload;
            const existItem = state.cartItems.find(
                x => x._id === item._id && x.varient === item.varient
            );
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x._id === item._id && x.varient === item.varient
                            ? { ...x, quantity: x.quantity + item.quantity, price: x.prices[x.varient] * (x.quantity + item.quantity) }
                            : x
                    )
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...item }]
                };
            }
        case 'UPDATE_CART_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems
                    .map(x =>
                        x._id === action.payload._id && x.varient === action.payload.varient
                            ? {
                                ...x,
                                quantity: Math.max(1, x.quantity + action.payload.delta),
                                price: x.prices[x.varient] * Math.max(1, x.quantity + action.payload.delta)
                            }
                            : x
                    )
                    .filter(x => x.quantity > 0)
            };
        case 'DELETE_CART_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    x => !(x._id === action.payload._id && x.varient === action.payload.varient)
                )
            };
        default:
            return state;
    }
}