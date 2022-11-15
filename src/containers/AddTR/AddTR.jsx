import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSet from "../../components/InputSet/InputSet";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { convertTime } from "../../lib/utils/convertTime";
import { addReport, getState } from "../../store/reducer";
import "./AddTR.css";

const AddTR = ({
	onCloseModal = () => {
		console.log("Close Modal");
	},
}) => {
	const dispatch = useDispatch();

	const { entities, selected } = useSelector(getState);

	const [timeIn, setTimeIn] = useState("22:00");
	const [clientIn, setClientIn] = useState(
		entities.clients[0]?.company ?? ""
	);
	const [remarksIn, setRemarksIn] = useState("");

	useEffect(() => {
		setTimeIn(convertTime(DateTime.now()));
	}, []);

	return (
		<div className="AddTR">
			<div className="AddTR__header-container">
				<div className="AddTR__header">Time Report</div>
				<FontAwesomeIcon
					icon={faCircleXmark}
					className="AddTR__icon"
					onClick={onCloseModal}
				/>
			</div>
			<div className="AddTR__input-container">
				<InputSet
					label="Time in"
					variant="timepicker"
					value={timeIn}
					setValue={setTimeIn}
				/>
				<InputSet
					label="Clients"
					variant="select"
					options={entities.clients.map((item) => item.company)}
					value={clientIn}
					setValue={setClientIn}
				/>
				<InputSet
					label="Remarks"
					placeholder="Add remarks here"
					variant="textarea"
					value={remarksIn}
					setValue={setRemarksIn}
				/>
			</div>
			<PrimaryButton
				className="AddTR__add-button"
				label="Add Time Report"
				width="100%"
				onClick={() => {
					const reportObj = {
						timeIn,
						timeOut: "NA",
						duration: "NA",
						client: clientIn,
						remarks: remarksIn,
						date: selected.currentdate,
					};
					addReport(dispatch)(reportObj);
					onCloseModal();
				}}
			/>
		</div>
	);
};

export default AddTR;
