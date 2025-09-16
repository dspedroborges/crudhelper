import type { ReactNode } from "react";

type ModalProps = {
    title: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
};

export default function Modal({ title, children, isOpen = true, onClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            onClick={() => { if (onClose) onClose() }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white border-2 py-10 rounded shadow-lg relative overflow-y-scroll max-h-[90%] min-w-1/2"
            >
                <h2 className="text-4xl font-bold text-center">{title}</h2>
                {children}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-black hover:text-gray-900 text-6xl cursor-pointer"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}
