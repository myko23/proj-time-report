import React from "react";
import "./NavItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import cls from "classnames";

const NavItem = ({
	icon = faUser,
	item = "Default",
	onNavigate = () => {},
	selected = false,
}) => {
	return (
		<div
			className={cls("NavItem", selected && "NavItem--selected")}
			onClick={onNavigate}
		>
			<FontAwesomeIcon icon={icon} className="NavItem__icon" />
			<p className="NavItem__item">{item}</p>
		</div>
	);
};

export default NavItem;
