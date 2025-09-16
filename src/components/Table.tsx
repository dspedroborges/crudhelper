import { useState } from "react";
import type { FormMakerProps, TableProps } from "./Types";
import FormMaker from "./FormMaker";
import Modal from "./Modal";

export default function Table({ data, onUpdate, onDelete, tableClassName = "mx-auto my-5", thClassName = "p-2 bg-gray-900 text-white", tdClassName = "border p-2", updateButtonClassName = "border p-2 mr-2 cursor-pointer rounded-xl", deleteButtonClassName = "border p-2 mr-2 cursor-pointer rounded-xl", formStructure }: TableProps) {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentUpdate, setCurrentUpdate] = useState(formStructure);
    const [currentId, setCurrentId] = useState<number|string>(0);

    const handleUpdateValues = (object: Record<string, any>) => {
        const copy: FormMakerProps = JSON.parse(JSON.stringify(currentUpdate));
        for (let i = 0; i < copy.fields.length; i++) {
            let f = copy.fields[i];
            f.details.value = object[String(f.details.name)];
            copy.fields[i] = f;
        }
        setCurrentId(object.id || -1);
        setCurrentUpdate(copy);
        setIsUpdateModalOpen(true);
    }

    const handleDelete = (id: number|string) => {
        setCurrentId(id);
        setIsDeleteModalOpen(true);
    }

    return (
        <>
            <table className={tableClassName}>
                <thead>
                    <tr>
                        {
                            Object.keys(data[0]).map((k, i) => {
                                return <th key={i} className={thClassName}>{k}</th>
                            })
                        }

                        {
                            (onUpdate || onDelete) && (
                                <th className={thClassName}>Actions</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((r, i) => {
                            return <tr key={i}>
                                {
                                    Object.keys(r).map((d, j) => {
                                        return <td key={j} className={tdClassName}>{r[d]}</td>
                                    })
                                }

                                {
                                    (onUpdate || onDelete) && (
                                        <td className={tdClassName}>
                                            {
                                                onUpdate && (
                                                    <button
                                                        className={updateButtonClassName}
                                                        onClick={() => handleUpdateValues(r)}
                                                    >Update</button>
                                                )
                                            }

                                            {
                                                onDelete && (
                                                    <button
                                                        onClick={() => handleDelete(r.id)}
                                                        className={deleteButtonClassName}
                                                    >Delete</button>
                                                )
                                            }
                                        </td>
                                    )
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
            {
                currentUpdate && onUpdate && (
                    <Modal title="Update" isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
                        <FormMaker
                            {...currentUpdate}
                            onSubmit={(newObj: Record<string, any>) => {
                                setIsUpdateModalOpen(false);
                                onUpdate(currentId, newObj);
                            }}
                            buttonText="Update"
                        />
                    </Modal>
                )
            }

            {
                onDelete && (
                    <Modal title="Are you sure?" isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                        <div className="flex items-center justify-center gap-2 mt-10 px-10">
                            <button 
                                onClick={() => {
                                    onDelete(currentId);
                                    setIsDeleteModalOpen(false);
                                }}
                                className="w-full text-white cursor-pointer border rounded p-2 bg-red-800 hover:bg-red-700"
                            >
                                Yes
                            </button>
                            <button 
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full text-white cursor-pointer border rounded p-2 bg-gray-800 hover:bg-gray-700"
                            >
                                No
                            </button>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}