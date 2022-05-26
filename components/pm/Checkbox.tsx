import { useState } from "react";
import { useFilterContextHook } from "../../context/filter-context";
import CheckOptions from "./CheckOptions";

interface Props {
    dataSet: { name: string }[];
    label: string;
    name: string;
}
// FilterBy:
const Checkbox: React.FC<Props> = ({ dataSet, label, name }) => {
    const [see, setSee] = useState(false);
    const { dispatch } = useFilterContextHook();

    return (
        <span className="max-w-fit">
            <label htmlFor={label} className="flex items-center">
                <p className="mr-2">{name}:</p>
                <input
                    value={label}
                    type="checkbox"
                    name={label}
                    id={label}
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement;

                        switch (target.checked) {
                            case true:
                                dispatch({
                                    type: "pick_filter",
                                    payload: target.value,
                                    key: target.name,
                                });
                                break;
                            case false:
                                dispatch({
                                    type: "pick_filter",
                                    payload: "",
                                    key: target.name,
                                });
                        }
                    }}
                />
            </label>
            <CheckOptions dataSet={dataSet} see={see} name={name} />
        </span>
    );
};

export default Checkbox;
