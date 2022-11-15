import { useSelector } from "react-redux";
import { getState } from "../../store/reducer";

const useClientSelected = () => {
	const { entities, selected } = useSelector(getState);

	let clientSelected = false;

	entities.clients.forEach((item) => {
		if (item.id === selected.clientid) clientSelected = true;
	});

	return { clientSelected };
};

export default useClientSelected;
