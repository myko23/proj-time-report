import _ from "lodash";
import { useSelector } from "react-redux";
import { getState } from "../../store/reducer";

const useReportSelected = () => {
	const { entities, selected } = useSelector(getState);
	//comment
	let reportSelected = false;

	entities.timereports.forEach((item) => {
		if (item.id === selected.timereportid) reportSelected = true;
	});

	const selectedReport = _.find(
		entities.timereports,
		(item) => item.id == selected.timereportid
	);

	return { reportSelected, selectedReport };
};

export default useReportSelected;
