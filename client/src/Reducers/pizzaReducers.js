export const getAllPizzasReducers = (state = { pizzas: [] }, action) => {
    switch(action.type){
        case 'GET_PIZZAS_REQUEST':
            return { loading: true, pizzas: [] }
        case 'GET_PIZZAS_SUCESS':
            return { loading: false, pizzas: action.payload }
        case 'GET_PIZZAS_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}