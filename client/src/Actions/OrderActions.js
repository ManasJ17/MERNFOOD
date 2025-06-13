import axios from "axios"
export const placeOrder = (orderData) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });
    try {
        const response = await axios.post("/api/placeorder/placeorder", orderData);
        dispatch({ type: 'PLACE_ORDER_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'PLACE_ORDER_FAILED', payload: error.message });
    }
}