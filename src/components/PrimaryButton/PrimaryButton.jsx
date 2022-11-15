import React from "react";
import "./PrimaryButton.css";
import cls from "classnames";

const PrimaryButton = ({
	variant = "default",
	label = "default",
	width = "fit-content",
	className,
	onClick = () => {},
}) => {
	return (
		<button
			className={cls(
				"PrimaryButton",
				variant === "disabled" && "PrimaryButton--disabled",
				className
			)}
			onClick={onClick}
			style={{ width }}
		>
			{label}
		</button>
	);
};

export default PrimaryButton;
