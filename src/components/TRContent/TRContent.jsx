import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTR from "../../containers/AddTR/AddTR";
import UpdateTR from "../../containers/UpdateTR/UpdateTR";
import useReportSelected from "../../lib/hooks/useReportSelected";
import useTableSettings from "../../lib/hooks/useTableSettings";
import { filterList } from "../../lib/utils/filterList";
import {
	getState,
	setSelectedReport,
	showAddReportModal,
	showUpdateReportModal,
} from "../../store/reducer";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";
import "./TRContent.css";

const TRContent = () => {
	const { entities, selected, modal } = useSelector(getState);
	const dispatch = useDispatch();

	const timeListConfigs = useTableSettings(
		filterList(entities.timereports, "date", selected.currentdate),
		{
			timeIn: "Time in",
			timeOut: "Time out",
			duration: "Duration",
			client: "Clients",
			remarks: "Remarks",
		},
		{}
	);
	return (
		<>
			<div className="TRContent">
				<Table
					onSelect={(id) => setSelectedReport(dispatch)(id)}
					onDoubleClick={() => showUpdateReportModal(dispatch)(true)}
					selected={selected.timereportid}
					data={timeListConfigs.data}
					header={timeListConfigs.headers}
					emptyMessage="Add time reports here"
				/>
			</div>
			{modal.addreport && (
				<Modal
					onCloseModal={() => {
						showAddReportModal(dispatch)(false);
					}}
				>
					<AddTR
						onCloseModal={() => {
							showAddReportModal(dispatch)(false);
						}}
					/>
				</Modal>
			)}
			{modal.updatereport && (
				<Modal
					onCloseModal={() => {
						showUpdateReportModal(dispatch)(false);
					}}
				>
					<UpdateTR
						onCloseModal={() => {
							showUpdateReportModal(dispatch)(false);
						}}
					/>
				</Modal>
			)}
		</>
	);
};

export default TRContent;
