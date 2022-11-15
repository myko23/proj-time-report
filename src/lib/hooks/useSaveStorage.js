import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getState } from "../../store/reducer";

export const useSaveStorage = () => {
	const { entities } = useSelector(getState);

	useEffect(() => {
		if (entities.clients.length === 0 && entities.timereports.length === 0)
			return;

		localStorage.setItem("timereportdata", JSON.stringify(entities));
	}, [entities]);
};
