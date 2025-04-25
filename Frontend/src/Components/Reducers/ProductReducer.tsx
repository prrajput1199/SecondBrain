// @ts-ignore
const ProductReducer = (state, action) => {
    switch (action.type) {

        case "REFETCHDATA":
            return {
                ...state,
                RefetchData: !state.RefetchData
            }

        case "SET_LOADING":
            return {
                ...state,
                Loading: action.payload
            }

        case "GET_ALL_CONTENT":
            return {
                ...state,
                contentProduct: action.payload,
            }

        default:
            return {
                ...state
            }
    }
}

export default ProductReducer;