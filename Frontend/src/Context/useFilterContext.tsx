import { createContext, useContext, useEffect, useReducer } from "react";
import { useProduct } from "./useProductContext";
import reducer from "../Components/Reducers/FilterReducer"


// @ts-ignore
const FilterContext = createContext();


// @ts-ignore
const FilterProvider = ({ children }) => {


    // @ts-ignore
    const { contentProduct, RefetchDataFun } = useProduct();
    const FilterInitialState = {
        Loading: false,
        Allproduct: [],
        FilterProduct: [],
        Filters: {
            type: "All"
        },
        isSidebarOpen: false
    }

    const [state, dispatch] = useReducer(reducer, FilterInitialState);

    useEffect(() => {
        dispatch({ type: "GET_ALL_PRODUCT", payload: contentProduct });
        dispatch({ type: "UPDATE_FILTER_CONTENT" });
    }, [contentProduct]);

    useEffect(() => {
        RefetchDataFun()
    }, [state.Filters.type])

    // @ts-ignore
    const updateFilterFun = (e) => {
        const name = e.currentTarget.dataset.name;
        const value = e.currentTarget.dataset.value;

        return dispatch({ type: "UPDATE_FILTER_STATE", payload: { name, value } })
    }

    const isSidebarOpenFun = () => {
        return dispatch({ type: "SIDEBAROPEN"})
    }

    const isSidebarCloseFun = () => {
        return dispatch({ type: "SIDEBARCLOSE"})
    }

    const LogOut = () => {
        return dispatch({ type: "LOG_OUT" });
    }

    return <FilterContext.Provider value={{ ...state, updateFilterFun, FilterInitialState, LogOut, isSidebarOpenFun ,isSidebarCloseFun}}>{children}</FilterContext.Provider>
}

const useFilter = () => {
    return useContext(FilterContext);
}

export { useFilter, FilterProvider, FilterContext }


