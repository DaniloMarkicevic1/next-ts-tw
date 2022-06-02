import { Reducer, useEffect, useReducer } from 'react';
import { Action, ReducerProjects } from '../../models/ProjectReducer';
import { Projects, ProjectType } from '../../models/Projects';
import PageTitle from '../PageTitle';
import ProjectsFilter from './ProjectsFilter';
import ProjectsList from './ProjectsList';

const reducer: Reducer<ReducerProjects, Action> = (state, action) => {
    switch (action.type) {
        case 'filter':
            return {
                ...state,
                filteredProjects: state.projects.filter(
                    (project: ProjectType) => {
                        const filter = project.name
                            .toLowerCase()
                            .trim()
                            .includes(action.searchTerm.toLowerCase().trim());
                        return filter;
                    }
                ),
            };
        case 'initialState':
            return { ...state, projects: action.payload };
        default:
            return state;
    }
};

const initState: ReducerProjects = {
    projects: [
        {
            id: 0,
            name: '',
            createdAt: '',
            updatedAt: '',
            employees: [
                {
                    id: 0,
                    firstName: '',
                    lastName: '',
                    email: '',
                    googleId: '',
                    role: '',
                    seniority: '',
                    plan: '',
                },
            ],
            employeesCount: 0,
        },
    ],
    filteredProjects: [
        {
            id: 0,
            name: '',
            createdAt: '',
            updatedAt: '',
            employees: [
                {
                    id: 0,
                    firstName: '',
                    lastName: '',
                    email: '',
                    googleId: '',
                    role: '',
                    seniority: '',
                    plan: '',
                },
            ],
            employeesCount: 0,
        },
    ],
};

const Projects: React.FC<Projects> = ({ projects }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        dispatch({ type: 'initialState', payload: projects });
        dispatch({ type: 'filter', searchTerm: '' });
    }, [projects]);

    return (
        <>
            <PageTitle title="All Projects:" />
            <ProjectsFilter dispatch={dispatch} />
            <ProjectsList projects={state.filteredProjects} />
        </>
    );
};

export default Projects;
