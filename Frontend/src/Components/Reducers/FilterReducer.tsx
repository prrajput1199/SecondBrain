const FilterInitialState = {
    Loading: false,
    Allproduct: [],
    FilterProduct: [],
    Filters: {
        type: "All"
    }
}

// @ts-ignore
const FilterReducer = (state, action) => {

    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                Loading: action.payload
            }

        case "GET_ALL_PRODUCT":
            return {
                ...state,
                Allproduct: [...action.payload],
                FilterProduct: [...action.payload],
            }

        case "UPDATE_FILTER_STATE": {
            const { name, value} = action.payload;

            return {
                ...state,
                isSidebarOpen: false,
                Filters: {
                    [name]: value
                }
            }
        }

        case "UPDATE_FILTER_CONTENT": {
            const { Allproduct } = state;
            const { type } = state.Filters;
            let tempFilterContent = [...Allproduct];

            if (type !== "All") {
                tempFilterContent = tempFilterContent.filter((curEl) => {
                    return curEl.type === type;
                })
            }

            return {
                ...state,
                Loading: action.payload,
                FilterProduct: tempFilterContent
            }
        }

        case "SIDEBAROPEN":
            return {
                ...state,
                isSidebarOpen: true
            }

        case "SIDEBARCLOSE":
            return {
                ...state,
                isSidebarOpen: false
            }

        case "LOG_OUT":
            return FilterInitialState;

        default:
            return {
                ...state,
            }
    }
}

export default FilterReducer;