import React, { useState } from "react";
import "./InputSet.css";
import cls from "classnames";
import TimePicker from "react-time-picker";

const InputSet = ({
	value = "",
	setValue = () => {},
	label = "default",
	placeholder = "placeholder",
	width = "15rem",
	className,
	variant = "text",
	options = [],
	disabled = false,
}) => {
	const renderInput = () => {
		switch (variant) {
			case "text":
				return (
					<input
						type="text"
						className="InputSet__input"
						placeholder={placeholder}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						disabled={disabled}
					/>
				);
			case "textarea":
				return (
					<textarea
						className={cls("InputSet__input", "InputSet__textarea")}
						rows={3}
						placeholder={placeholder}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						disabled={disabled}
					/>
				);
			case "select":
				return (
					<select
						className={cls("InputSet__input", "InputSet__select")}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						disabled={disabled}
					>
						{options.map((item, index) => (
							<option key={index}>{item}</option>
						))}
					</select>
				);
			case "timepicker":
				return (
					<TimePicker
						value={value}
						onChange={setValue}
						format="hh:mm a"
						className={cls(
							"InputSet__input",
							"InputSet__timepicker"
						)}
						disabled={disabled}
					/>
				);
			default:
				return (
					<input
						type="text"
						className="InputSet__input"
						placeholder={placeholder}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						disabled={disabled}
					/>
				);
		}
	};
	return (
		<div className={cls("InputSet", className)} style={{ width }}>
			<div className="InputSet__label">{label}</div>
			{renderInput()}
		</div>
	);
};

export default InputSet;
