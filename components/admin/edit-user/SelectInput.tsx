import React, { Dispatch } from "react";
import { ActionType } from "../../../models/Form";
import { Tech } from "../../../models/Technologies";

type Props = {
    labelText: string;
    label: string;
    values: Tech[];
    dispatch: Dispatch<ActionType>;
};

const SelectInput: React.FC<Props> = ({
    values,
    label,
    labelText,
    dispatch,
}) => {
    return (
        <label htmlFor={label} className="first-letter:capitalize">
            {labelText}:{" "}
            <select
                aria-label={label}
                name={labelText}
                id={label}
                className="bg-white text-gray-800 capitalize"
                onInput={(e) => {
                    const target = e.target as HTMLSelectElement;
                    dispatch({
                        type: "update_input",
                        payload: target.value,
                        key: target.name,
                    });
                }}
            >
                <option value=""></option>
                {values.map((value) => (
                    <option
                        key={value.id}
                        value={
                            labelText === "seniority" ? value.name : value.id
                        }
                    >
                        {value.name}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SelectInput;
