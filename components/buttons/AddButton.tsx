const AddButton = ({ text }: { text: string }) => {
    return (
        <button
            className="bg-gray-800 text-gray-300 rounded-md py-1 px-3 ml-4 hover:bg-gray-200 hover:text-gray-800"
            type="submit"
        >
            Add {text}
        </button>
    );
};

export default AddButton;
