import React from "react";
import cls from "classnames";
import "./ClientItem.css";

const ClientItem = ({
	item = "Default",
	selected = false,
	onSelect = () => {},
}) => {
	return (
		<div
			className={cls("ClientItem", selected && "ClientItem--selected")}
			onClick={onSelect}
		>
			{item}
		</div>
	);
};

export default ClientItem;
