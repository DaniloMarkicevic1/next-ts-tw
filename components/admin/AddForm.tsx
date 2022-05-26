import { useState } from "react";
import AddButton from "../buttons/AddButton";
interface Props {
    inputName: string;
    buttonText: string;
    handleAdd: (value: string) => {};
}
const AddForm: React.FC<Props> = ({ handleAdd, inputName, buttonText }) => {
    const [value, setValue] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleAdd(value);
                setValue("");
            }}
            className="pb-7"
        >
            <label htmlFor={inputName}>Add New {buttonText}: </label>
            <input
                className="p-1 rounded-md border-transparent focus:border-gray-800 border-2 outline-none"
                type="text"
                name={inputName}
                id={inputName}
                value={value}
                onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    setValue(target.value);
                }}
            />
            <AddButton text={buttonText} />
        </form>
    );
};

export default AddForm;
