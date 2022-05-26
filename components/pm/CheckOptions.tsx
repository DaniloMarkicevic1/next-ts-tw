import { useFilterContextHook } from "../../context/filter-context";

type Props = {
    dataSet: { name: string }[];
    see: boolean;
    name: string;
};

const CheckOptions: React.FC<Props> = ({ dataSet, see, name }) => {
    const { dispatch } = useFilterContextHook();

    const handleInput = (value: string, name: string) => {
        switch (name) {
            case "Cities":
                dispatch({
                    type: "filter_value",
                    payload: value,
                    key: "cityValue",
                });
                break;
            case "Countries":
                dispatch({
                    type: "filter_value",
                    payload: value,
                    key: "countryValue",
                });
                break;

            case "Seniorities":
                dispatch({
                    type: "filter_value",
                    payload: value,
                    key: "seniorityValue",
                });
                break;
            case "Technologies":
                dispatch({
                    type: "filter_value",
                    payload: value,
                    key: "technologyValue",
                });
                break;
            case "Projects":
                dispatch({
                    type: "filter_value",
                    payload: value,
                    key: "projectValue",
                });
                break;
            case "Project Managers":
                dispatch({
                    type: "filter_value",
                    payload: value,
                    key: "pmValue",
                });
                break;
            default:
                break;
        }
    };
    return (
        <form action="">
            {dataSet.map((data: any, i: number) => {
                return (
                    <span key={`${data.name}+${i}`}>
                        <label htmlFor={data.name} className="m-2">
                            {name !== "Project Managers"
                                ? `${data.name}`
                                : `${data.firstName} ${data.lastName}`}
                            <input
                                value={data.name || `${data.id}`}
                                className="ml-2"
                                type="radio"
                                name={name}
                                id={`${data.name}`}
                                onChange={(e) => {
                                    handleInput(e.target.value, name);
                                }}
                            />
                        </label>
                        |
                    </span>
                );
            })}
        </form>
    );
};

export default CheckOptions;
