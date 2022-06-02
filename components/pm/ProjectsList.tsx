import { ProjectType } from '../../models/Projects';

interface Props {
    projects: ProjectType[];
}

const ProjectsList: React.FC<Props> = ({ projects }) => {
    return (
        <ul>
            {projects.map((project: ProjectType) => {
                return (
                    <li
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
                            Number of People on Project:{' '}
                            {project.employeesCount}
                        </p>
                    </li>
                );
            })}
        </ul>
    );
};

export default ProjectsList;
