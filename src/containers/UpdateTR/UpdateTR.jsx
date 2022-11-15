import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSet from "../../components/InputSet/InputSet";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import useReportSelected from "../../lib/hooks/useReportSelected";
import { convertTime } from "../../lib/utils/convertTime";
import { getDateDiff } from "../../lib/utils/getDateDiff";
import {
	addClient,
	addReport,
	getState,
	updateReport,
} from "../../store/reducer";
import "./UpdateTR.css";

const UpdateTR = ({
	onCloseModal = () => {
		console.log("Close Modal");
	},
}) => {
	const dispatch = useDispatch();

	const { selectedReport } = useReportSelected();

	const { entities } = useSelector(getState);

	const [timeIn, setTimeIn] = useState("22:00");
	const [timeOut, setTimeOut] = useState("22:00");
	const [duration, setDuration] = useState("");
	const [clientIn, setClientIn] = useState(
		entities.clients[0]?.company ?? ""
	);
	const [remarksIn, setRemarksIn] = useState("");

	useEffect(() => {
		setTimeIn(selectedReport.timeIn);
		setTimeOut(
			selectedReport.timeOut === "NA"
				? convertTime(DateTime.now())
				: selectedReport.timeOut
		);
		setDuration(
			selectedReport.timeOut === "NA"
				? "NA"
				: getDateDiff(timeIn, timeOut)
		);

		if (
			_.find(
				entities.clients,
				(item) => selectedReport.client === item.company
			) === undefined
		)
			addClient(dispatch)(selectedReport.client);

		setClientIn(selectedReport.client);
		setRemarksIn(selectedReport.remarks);
	}, [entities.clients]);

	useEffect(() => {
		if (timeIn !== null && timeOut !== null)
			setDuration(getDateDiff(timeIn, timeOut));
		else setDuration("NA");
	}, [timeIn, timeOut]);

	return (
		<div className="UpdateTR">
			<div className="UpdateTR__header-container">
				<div className="UpdateTR__header">Time Report</div>
				<FontAwesomeIcon
					icon={faCircleXmark}
					className="UpdateTR__icon"
					onClick={onCloseModal}
				/>
			</div>
			<div className="UpdateTR__input-container">
				<InputSet
					label="Time in"
					variant="timepicker"
					value={timeIn}
					setValue={setTimeIn}
				/>
				<InputSet
					label="Time Out"
					variant="timepicker"
					value={timeOut}
					setValue={setTimeOut}
				/>
				<InputSet
					label="Duration"
					value={duration}
					setValue={setDuration}
					disabled={true}
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
				className="UpdateTR__add-button"
				label="Update Time Report"
				width="100%"
				onClick={() => {
					updateReport(dispatch)(selectedReport.id, {
						timeIn,
						timeOut,
						duration,
						client: clientIn,
						remarks: remarksIn,
					});
					onCloseModal();
				}}
			/>
		</div>
	);
};

export default UpdateTR;
