import React from "react";
import "./Modal.css";

const Modal = ({
	children,
	onCloseModal = () => {
		console.log("Close modal");
	},
}) => {
	return (
		<div className="Modal">
			<div className="Modal__children">{children}</div>
			<div className="Modal__overlay" onClick={onCloseModal}></div>
		</div>
	);
};

export default Modal;
