import React from "react";
import "./UserIcon.css";
import defaultUser from "../../assets/images/User Default.jpg";
import cls from "classnames";
import { useSelector } from "react-redux";
import { getState } from "../../store/reducer";

const UserIcon = ({ className }) => {
	const { user } = useSelector(getState);

	return (
		<div className={cls("UserIcon", className)}>
			<img className="UserIcon__image" src={defaultUser} alt="User" />
			<div className="UserIcon__name-set">
				<p className="UserIcon__name">{user ?? "Default"}</p>
				<p className="UserIcon__title">Accountant</p>
			</div>
		</div>
	);
};

export default UserIcon;
