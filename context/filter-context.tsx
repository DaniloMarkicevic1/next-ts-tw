import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Filter } from '../models/Filter';
import {
    FilterActionType,
    FilterContextInferface,
} from '../models/FilterContext';

const defaultValue = {
    dispatch: (value: FilterActionType) => {},
    city: '',
    cityValue: '',
    country: '',
    countryValue: '',
    seniority: '',
    seniorityValue: '',
    project: '',
    projectValue: '',
    projectManager: '',
    pmValue: '',
    technology: '',
    technologyValue: '',
    name: '',
};

const FilterContext = createContext<FilterContextInferface>(defaultValue);

// FilterBy:

const reducer = (state: Filter, action: FilterActionType) => {
    switch (action.type) {
        case 'pick_filter':
            return { ...state, [action.key]: action.payload };
        case 'filter_value':
            return { ...state, [action.key]: action.payload };
        case 'reset':
            return initialState;
        default:
            return state;
    }
};

const initialState = {
    city: '',
    cityValue: '',
    country: '',
    countryValue: '',
    name: '',
    seniority: '',
    seniorityValue: '',
    technology: '',
    technologyValue: '',
    project: '',
    projectValue: '',
    projectManager: '',
    pmValue: '',
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
