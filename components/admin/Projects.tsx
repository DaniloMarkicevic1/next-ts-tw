import useSWR from "swr";
import { ProjectType } from "../../models/Projects";
import { User } from "../../models/User";
import axiosInstance from "../../services/axiosInstance";
import { fetcher } from "../../services/fetcher";
import DeleteButton from "../buttons/DeleteButton";
import AddForm from "./AddForm";
import PageTitle from "../PageTitle";
import Link from "next/link";

interface AdminProjects extends ProjectType {
    projectManager: User;
}

const Projects = () => {
    const { data: projects, error, mutate } = useSWR(`/projects`, fetcher);

    if (!projects) return <p>Loading</p>;
    const handleAddProject = async (projectName: string) => {
        await axiosInstance.post(`/projects`, {
            project: { name: projectName },
        });
        mutate();
    };
    const handleDeleteProject = async ({ id }: { id: number }) => {
        await axiosInstance.delete(`/projects/${id}`);
        mutate();
    };
    if (!projects) return <p>Loading</p>;
    const projectsArray: AdminProjects[] = projects.projects;
    return (
        <>
            <PageTitle title="Projects:" />

            <AddForm
                buttonText="Project"
                inputName="addProject"
                handleAdd={handleAddProject}
            />

            {projects &&
                projectsArray.map(({ projectManager, name, id, employees }) => (
                    <section
                        key={id}
                        className="flex justify-between outline rounded-lg text-gray-300 bg-green-800 items-center p-2 mb-2 hover:outline-gray-800 hover:outline-2 hover:bg-opacity-75"
                    >
                        <Link href={`projects/edit/${id}`} passHref>
                            <a className="w-full h-full">
                                <p>Project Name: {name}</p>
                                <p>
                                    Project Manager: {projectManager?.firstName}{" "}
                                    {projectManager?.lastName}
                                </p>
                                <p>
                                    Number of people on project:{" "}
                                    {employees.length}
                                </p>
                            </a>
                        </Link>
                        <DeleteButton
                            handleDelete={handleDeleteProject}
                            id={id}
                        />
                    </section>
                ))}
        </>
    );
};

export default Projects;
