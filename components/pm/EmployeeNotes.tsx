import { PlusIcon } from '@heroicons/react/outline';
import React, { Dispatch, FormEvent } from 'react';

type Props = {
    handleSubmit: () => {};
    text: string;
    notes: [
        {
            text: string;
            createdAt: string;
            updatedAt: string;
            id: number;
            createdBy: string;
            employee: {};
        }
    ];
    dispatch: Dispatch<any>;
};

const EmployeeNotes: React.FC<Props> = ({
    handleSubmit,
    text,
    notes,
    dispatch,
}) => {
    return (
        <div className="col-span-3 overflow-auto relative w-full">
            <form
                className="sticky top-0 bg-green-700"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <textarea
                    name="text"
                    placeholder="Note text"
                    rows={4}
                    value={text}
                    className="rounded-md text-gray-800 w-full p-1 outline-none focus:border-gray-800 border"
                    onInput={(event: FormEvent) => {
                        const target = event.target as HTMLTextAreaElement;
                        dispatch({
                            type: 'update_input',
                            payload: target.value,
                            key: target.name,
                        });
                    }}
                />
                <button className="flex items-center bg-gray-400 rounded-xl p-2 hover:bg-opacity-80">
                    Add Note <PlusIcon className="ml-1 w-4 h-4" />
                </button>
                <p>Notes:</p>
            </form>
            <div className="divide-green-800 divide-y-2 rounded-lg">
                {notes?.map((note) => (
                    <div
                        key={note.id}
                        className="rounded-lg p-2 bg-gray-300 text-gray-800 grid"
                    >
                        <p className="text-md" key={note.id}>
                            {note.createdBy}:
                        </p>
                        <p className="first-letter:capitalize border border-gray-800 rounded-lg p-1">
                            {note.text}
                        </p>
                        <p className="text-xs">Created At: {note.createdAt}</p>
                        <p className="text-xs">Updated At: {note.updatedAt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeNotes;
