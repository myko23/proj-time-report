import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientContent from "../../components/ClientContent/ClientContent";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import TRContent from "../../components/TRContent/TRContent";
import useReportSelected from "../../lib/hooks/useReportSelected";
import { getState } from "../../store/reducer";
import Navigation from "../Navigation/Navigation";
import "./TimeReport.css";

const TimeReport = () => {
	const { content } = useSelector(getState);

	const getWidth = () => {
		switch (content) {
			case "clients":
				return "35rem";
			case "timereports":
				return "50rem";
			default:
				return "0";
		}
	};

	return (
		<div className="TimeReport">
			<Navigation />
			<div className="TimeReport__content-container">
				<ContentHeader label={content} />
				<div
					className="TimeReport__content"
					style={{ width: getWidth() }}
				>
					{content === "timereports" ? (
						<TRContent />
					) : (
						<ClientContent />
					)}
				</div>
			</div>
		</div>
	);
};

export default TimeReport;
