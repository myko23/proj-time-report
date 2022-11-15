import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import useClientSelected from "../../lib/hooks/useClientSelected";
import "./ContentHeader.css";
import cls from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteClient,
	deleteReport,
	getState,
	setCurrentDate,
	showAddReportModal,
} from "../../store/reducer";
import useReportSelected from "../../lib/hooks/useReportSelected";
import { DateTime } from "luxon";
import { getFullDate } from "../../lib/utils/getFullDate";

const ContentHeader = ({ label }) => {
	const { selected, content } = useSelector(getState);
	const { clientSelected } = useClientSelected();
	const { reportSelected } = useReportSelected();

	const dispatch = useDispatch();

	const renderActions = () => {
		let separator = false;

		if (clientSelected === true) separator = true;
		if (content === "timereports") separator = true;

		if (separator)
			return (
				<>
					<div className="ContentHeader__separator"></div>
					<div className="ContentHeader__actions">
						{label === "timereports" ? (
							<>
								<ReactDatePicker
									className="ContentHeader__date"
									selected={DateTime.fromFormat(
										selected.currentdate,
										"MM/dd/yyyy"
									).toJSDate()}
									onChange={(date) => {
										setCurrentDate(dispatch)(
											getFullDate(date)
										);
									}}
								/>
								<FontAwesomeIcon
									icon={faCirclePlus}
									className={cls(
										"ContentHeader__client-icon",
										"ContentHeader__client-icon--client-add"
									)}
									onClick={() =>
										showAddReportModal(dispatch)(true)
									}
								/>
								{reportSelected && (
									<FontAwesomeIcon
										icon={faCircleXmark}
										className={cls(
											"ContentHeader__client-icon",
											"ContentHeader__client-icon--client-delete"
										)}
										onClick={() => {
											deleteReport(dispatch)(
												selected.timereportid
											);
										}}
									/>
								)}
							</>
						) : (
							<FontAwesomeIcon
								icon={faCircleXmark}
								className={cls(
									"ContentHeader__client-icon",
									"ContentHeader__client-icon--client-delete"
								)}
								onClick={() => {
									deleteClient(dispatch)(selected.clientid);
								}}
							/>
						)}
					</div>
				</>
			);
	};

	return (
		<div className="ContentHeader">
			<p className="ContentHeader__label">
				{label === "timereports" ? "Time Report" : "Clients"}
			</p>
			{renderActions()}
		</div>
	);
};

export default ContentHeader;
