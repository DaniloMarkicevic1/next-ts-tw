import { Reducer, useEffect, useReducer } from "react";
import useSWR from "swr";
import { ReducerProjects } from "../../models/ProjectReducer";
import { Projects as ProjectsType } from "../../models/Projects";
import { ProjectType } from "../../models/Projects";

type Action =
    | { type: "filter"; searchTerm: string }
    | { type: "initialState"; payload: [ProjectType] };

const reducer: Reducer<ReducerProjects, Action> = (state, action) => {
    switch (action.type) {
        case "filter":
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
        case "initialState":
            return { ...state, projects: action.payload };
        default:
            return state;
    }
};

const initState: ReducerProjects = {
    projects: [
        {
            id: 0,
            name: "",
            createdAt: "",
            updatedAt: "",
            employees: [],
            employeesCount: 0,
        },
    ],
    filteredProjects: [
        {
            id: 0,
            name: "",
            createdAt: "",
            updatedAt: "",
            employees: [],
            employeesCount: 0,
        },
    ],
};

const Projects: React.FC<ProjectsType> = ({ projects }) => {
    useSWR(`/projects?`);
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        dispatch({ type: "initialState", payload: projects });
        dispatch({ type: "filter", searchTerm: "" });
    }, [projects]);

    return (
        <>
            <p className="text-gray-800 text-center font-bold text-3xl pb-5">
                All Projects
            </p>
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
                                type: "filter",
                                searchTerm: target.value,
                            });
                        }}
                    />
                </label>
            </div>
            {state.filteredProjects.map((project: ProjectType) => {
                return (
                    <section
                        key={project.id}
                        className="
                            rounded-lg
                            relative 
                            text-gray-300 
                            z-10 
                            py-6
                            pl-3 
                            mb-2
                            bg-green-700 
                            hover:text-gray-700
                            hover:cursor-pointer
                            after:origin-cursor
                            after:absolute 
                            after:rounded-full
                            after:top-0
                            after:left-0
                            after:w-full 
                            after:h-full 
                            after:-z-10 
                            after:scale-y-0
                            after:scale-x-0 
                            after:hover:rounded-lg
                            after:hover:scale-x-100 
                            after:hover:scale-y-100 
                            after:hover:bg-green-600
                            after:duration-300
                            active:opacity-90
                        "
                    >
                        <p>Name: {project.name}</p>
                        <p>
                            Number of People on Project:{" "}
                            {project.employeesCount}
                        </p>
                    </section>
                );
            })}
        </>
    );
};

export default Projects;
