import { Reducer, useReducer } from "react";
import { ActionType, FormInterface, ReducerState } from "../../../models/Form";
import axiosInstance from "../../../services/axiosInstance";
import SelectInput from "./SelectInput";

const seniorities = [
    { name: "intern", id: 0 },
    { name: "junior", id: 1 },
    { name: "medior", id: 2 },
    { name: "senior", id: 3 },
];

const initialState = {
    city: "",
    project: "",
    technology: "",
    seniority: "",
};

type Submit = {
    userId: string | string[] | undefined;
    seniority: string;
    city: string;
    project: string;
    technology: string;
};

const reducer: Reducer<ReducerState, ActionType> = (state, action) => {
    switch (action.type) {
        case "update_input":
            return { ...state, [action.key]: action.payload };

        default:
            return state;
    }
};

const Forms: React.FC<FormInterface> = ({
    cities,
    technologies,
    projects,
    userId,
    mutate,
    userRole,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //    Submit Change City, Seniority and Project
    const handleSubmit = async ({
        userId,
        seniority,
        city,
        project,
    }: Submit) => {
        seniority !== "" &&
            (await axiosInstance.patch(`users/seniority/${userId}`, {
                seniority,
            }));

        city !== "" &&
            (await axiosInstance.post(`users/${userId}/city/${city}`));

        userRole !== "project_manager"
            ? project !== "" &&
              (await axiosInstance.post(`users/${userId}/project/${project}`))
            : await axiosInstance.post(
                  `projects/${project}/project_manager/${userId}`
              );

        mutate();
    };
    // Add Technology
    const handleSubmitTechnology = async (
        userId: string | string[] | undefined,
        technology: string
    ) => {
        await axiosInstance.post(`users/${userId}/technology/${technology}`);
        mutate();
    };
    console.log(state);
    return (
        <section className="grid grid-cols-6 gap-x-3">
            <form
                action=""
                className="bg-gray-800 mt-3 col-span-4 rounded-lg p-4 text-gray-300 grid grid-cols-3 gap-4 justify-center content-center "
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit({
                        userId: userId,
                        seniority: state.seniority,
                        city: state.city,
                        technology: state.technology,
                        project: state.project,
                    });
                }}
            >
                <SelectInput
                    label="userCity"
                    values={cities}
                    labelText="city"
                    dispatch={dispatch}
                />
                {/* <SelectInpost
                    label="userCountry"
                    values={countries}
                    labelText="country"
                    dispatch={dispatch}
                /> */}
                <SelectInput
                    label="userCity"
                    values={seniorities}
                    labelText="seniority"
                    dispatch={dispatch}
                />
                <SelectInput
                    label="userCity"
                    values={projects}
                    labelText="project"
                    dispatch={dispatch}
                />

                <button
                    className="hover:bg-opacity-75 col-start-2 col-end-2 bg-gray-300 text-gray-800 rounded-lg py-1 px-2 col-span-2"
                    type="submit"
                >
                    Submit Changes
                </button>
            </form>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitTechnology(userId, state.technology);
                }}
                className="bg-gray-800 mt-3 col-span-2 gap-4 rounded-lg p-4 text-gray-300 grid content-center"
            >
                <SelectInput
                    label="userTech"
                    values={technologies}
                    labelText="technology"
                    dispatch={dispatch}
                />
                <button
                    className="hover:bg-opacity-75 bg-gray-300 text-gray-800 rounded-lg py-1 px-2 justify-self-center"
                    type="submit"
                >
                    Add Tech
                </button>
            </form>
        </section>
    );
};

export default Forms;
