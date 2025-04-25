import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../Components/Reducers/ProductReducer"
import { BACKEND_URL } from "../config";

   // @ts-ignore
const ProductContext = createContext();

   // @ts-ignore
const AppProvider = ({ children }) => {
    const productInitialState = {
        Loading: false,
        contentProduct: [],
        RefetchData: false
    }

    const [state, dispatch] = useReducer(reducer, productInitialState);

    const getData = async () => {
        dispatch({ type: "SET_LOADING", payload: true })
        const response = await axios.get(`${BACKEND_URL}/content`, {
            headers: {
                token: localStorage.getItem("Token")
            }
        })
        dispatch({ type: "GET_ALL_CONTENT", payload: response.data.content })
        dispatch({ type: "SET_LOADING", payload: false })
    }

    const RefetchDataFun = () => {
        return dispatch({ type: "REFETCHDATA" })
    }

    useEffect(() => {
        getData();
    }, [state.RefetchData])

    return <ProductContext.Provider value={{ ...state, RefetchDataFun, productInitialState }}>{children}</ProductContext.Provider>
}


const useProduct = () => {
    return useContext(ProductContext)
}

export { ProductContext, AppProvider, useProduct }
