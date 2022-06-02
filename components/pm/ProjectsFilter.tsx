import React, { Dispatch } from 'react';
import { Action } from '../../models/ProjectReducer';

type Props = {
    dispatch: Dispatch<Action>;
};

const ProjectsFilter: React.FC<Props> = ({ dispatch }) => {
    return (
        <div className="mb-3 text-gray-800">
            <label>
                Search by Name:
                <input
                    placeholder="Name of Project"
                    className="ml-3 p-2 outline-none focus:border-gray-900 border-2 rounded-lg text-gray-800"
                    type="text"
                    name="searchProject"
                    id="searchProject"
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        dispatch({
                            type: 'filter',
                            searchTerm: target.value,
                        });
                    }}
                />
            </label>
        </div>
    );
};

export default ProjectsFilter;
