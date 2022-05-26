import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from "react";
import { Filter } from "../models/Filter";

interface ContextInferface extends Filter {
    dispatch: Dispatch<ActionType>;
}

const defaultValue = {
    dispatch: (value: ActionType) => {},
    city: "",
    cityValue: "",
    country: "",
    countryValue: "",
    seniority: "",
    seniorityValue: "",
    project: "",
    projectValue: "",
    projectManager: "",
    pmValue: "",
    technology: "",
    technologyValue: "",
    name: "",
};

const FilterContext = createContext<ContextInferface>(defaultValue);

// FilterBy:
type ActionType =
    | { type: "pick_filter"; payload: string; key: string }
    | { type: "filter_value"; payload: string; key: string }
    | { type: "reset" };

const reducer = (state: Filter, action: ActionType) => {
    switch (action.type) {
        case "pick_filter":
            return { ...state, [action.key]: action.payload };
        case "filter_value":
            return { ...state, [action.key]: action.payload };
        case "reset":
            return initialState;
        default:
            return state;
    }
};

const initialState = {
    city: "",
    cityValue: "",
    country: "",
    countryValue: "",
    name: "",
    seniority: "",
    seniorityValue: "",
    technology: "",
    technologyValue: "",
    project: "",
    projectValue: "",
    projectManager: "",
    pmValue: "",
};
// ********

export const FilterContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FilterContext.Provider
            value={{
                dispatch,
                city: state.city,
                cityValue: state.cityValue,
                country: state.country,
                countryValue: state.countryValue,
                seniority: state.seniority,
                seniorityValue: state.seniorityValue,
                project: state.project,
                projectValue: state.projectValue,
                projectManager: state.projectManager,
                pmValue: state.pmValue,
                technology: state.technology,
                technologyValue: state.technologyValue,
                name: state.name,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContextHook = () => {
    return useContext(FilterContext);
};
