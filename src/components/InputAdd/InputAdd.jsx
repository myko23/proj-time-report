import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import cls from "classnames";
import "./InputAdd.css";

const InputAdd = ({
	placeholder = "Default",
	value = "",
	setValue = () => {},
	onAdd = () => {},
}) => {
	const [focus, setFocus] = useState("");
	return (
		<div className="InputAdd">
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type="text"
				className="InputAdd__add-input"
				placeholder={placeholder}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
			<FontAwesomeIcon
				icon={faCirclePlus}
				className={cls(
					"InputAdd__add-button",
					focus && "InputAdd__add-button--focused"
				)}
				onClick={onAdd}
			/>
		</div>
	);
};

export default InputAdd;
