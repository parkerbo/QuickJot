import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	return (
		<ModalContext.Provider
			value={{
				showModal,
				setShowModal,
				showEditModal,
				setShowEditModal
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}
