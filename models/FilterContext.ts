import { Dispatch } from 'react';
import { Filter } from './Filter';

export interface FilterContextInferface extends Filter {
    dispatch: Dispatch<FilterActionType>;
}

export type FilterActionType =
    | { type: 'pick_filter'; payload: string; key: string }
    | { type: 'filter_value'; payload: string; key: string }
    | { type: 'reset' };
