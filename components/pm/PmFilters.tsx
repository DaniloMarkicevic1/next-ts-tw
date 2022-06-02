import { Dispatch, SetStateAction } from 'react';
import useSWR from 'swr';
import { useFilterContextHook } from '../../context/filter-context';
import { fetcher } from '../../services/fetcher';
import Checkbox from './Checkbox';

const PmFilters: React.FC<{
    showFilters: boolean;
    setShowFilters: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowFilters, showFilters }) => {
    // Get Available data to filter by
    const { dispatch } = useFilterContextHook();
    const { data: technologies } = useSWR(`/technologies`, fetcher);
    const { data: cities } = useSWR(`/cities`, fetcher);
    const { data: countries } = useSWR(`/countries`, fetcher);
    const { data: projects } = useSWR(`/projects`, fetcher);
    const { data: projectManagers } = useSWR(`/users/pm`, fetcher);
    const seniorities = {
        seniorities: [
            { name: 'Intern' },
            { name: 'Junior' },
            { name: 'Medior' },
            { name: 'Senior' },
        ],
    };
    return (
        <section
            id="filterBackdrop"
            onClick={(e) => {
                const target = e.target as HTMLSelectElement;
                if (target.id === 'filterBackdrop') {
                    setShowFilters(false);
                }
            }}
            className={`backdrop z-50 rounded-lg absolute top-12 left-0 p-4 w-full h-10/12 text-gray-300 bg-black bg-opacity-80 ${
                showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-all duration-500`}
        >
            <div>
                {/* <p className="text-red-900">
                    You can have only one option selected, please don&apos;t
                    pick multiple options
                </p> */}
                <label>Filter By Name:</label>
                <input
                    type="text"
                    name="filterName"
                    id="filterName"
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        dispatch({
                            type: 'pick_filter',
                            payload: target.value,
                            key: 'name',
                        });
                    }}
                />
                {!technologies ||
                !cities ||
                !countries ||
                !projects ||
                !projectManagers ? (
                    <p>Loading</p>
                ) : (
                    <section>
                        <Checkbox
                            label="country"
                            name="Countries"
                            dataSet={countries.countries}
                        />
                        <hr className="border-white" />
                        <Checkbox
                            label="city"
                            name="Cities"
                            dataSet={cities.cities}
                        />
                        <hr className="border-white" />{' '}
                        <Checkbox
                            label="seniority"
                            name="Seniorities"
                            dataSet={seniorities.seniorities}
                        />
                        <hr className="border-white" />{' '}
                        <Checkbox
                            label="technology"
                            name="Technologies"
                            dataSet={technologies.technologies}
                        />
                        <hr className="border-white" />
                        <Checkbox
                            label="project"
                            name="Projects"
                            dataSet={projects.projects}
                        />
                        <hr className="border-white" />
                        <Checkbox
                            label="pm"
                            name="Project Managers"
                            dataSet={projectManagers.project_managers}
                        />
                        <button
                            className="bg-white rounded-lg p-2 hover:bg-opacity-50 text-gray-800"
                            onClick={() => {
                                dispatch({ type: 'reset' });
                            }}
                        >
                            Reset Filters
                        </button>
                    </section>
                )}
            </div>
        </section>
    );
};

export default PmFilters;
