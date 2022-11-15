import { faClock, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavItem from "../../components/NavItem/NavItem";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import UserIcon from "../../components/UserIcon/UserIcon";
import { getState, onLogout, setContent } from "../../store/reducer";
import "./Navigation.css";
import * as XLSX from "xlsx";

const Navigation = () => {
	const { content, entities } = useSelector(getState);
	const dispatch = useDispatch();

	const downloadExcel = () => {
		const testws = XLSX.utils.json_to_sheet(entities.timereports);
		const worksheetTimeReports = XLSX.utils.json_to_sheet(
			entities.timereports
		);
		const worksheetClients = XLSX.utils.json_to_sheet(entities.clients);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(
			workbook,
			worksheetTimeReports,
			"Time Reports"
		);
		XLSX.utils.book_append_sheet(workbook, testws, "Test");
		XLSX.utils.book_append_sheet(workbook, worksheetClients, "Clients");

		XLSX.writeFile(workbook, "TimeReports.xlsx");
	};

	return (
		<div className="Navigation">
			<UserIcon className="Navigation__user" />
			<div className="Navigation__NavItems">
				<NavItem
					selected={content === "clients" ? true : false}
					icon={faUsersLine}
					item="Clients"
					onNavigate={() => {
						setContent(dispatch)("Clients");
					}}
				/>
				<NavItem
					selected={content === "timereports" ? true : false}
					icon={faClock}
					item="Time Report"
					onNavigate={() => {
						setContent(dispatch)("Time Reports");
					}}
				/>
			</div>
			<div className="Navigation__logout-set">
				<PrimaryButton
					label="Save"
					width="80%"
					onClick={downloadExcel}
					className="Navigation__savetoexcel"
				/>
				<p
					className="Navigation__logout"
					onClick={() => {
						onLogout(dispatch);
					}}
				>
					Logout
				</p>
			</div>
		</div>
	);
};

export default Navigation;
