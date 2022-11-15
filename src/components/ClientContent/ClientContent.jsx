import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClientSelected from "../../lib/hooks/useClientSelected";
import { addClient, getState, setSelectedClient } from "../../store/reducer";
import ClientItem from "../ClientItem/ClientItem";
import InputAdd from "../InputAdd/InputAdd";
import "./ClientContent.css";

const ClientContent = () => {
	const [clientInput, setClientInput] = useState("");
	const { entities, selected } = useSelector(getState);

	const dispatch = useDispatch();

	const renderClientItems = () => {
		if (entities?.clients?.length !== 0) {
			return entities.clients.map((item) => {
				return (
					<ClientItem
						key={item.id}
						item={item.company}
						selected={selected.clientid === item.id ? true : false}
						onSelect={() => {
							setSelectedClient(dispatch)(item.id);
						}}
					/>
				);
			});
		} else
			return <div className="ClientContent__empty">Add clients here</div>;
	};

	return (
		<div className="ClientContent">
			<div className="ClientContent__clients">{renderClientItems()}</div>
			<div className="ClientContent__add-container">
				<InputAdd
					placeholder="Add new clients here"
					value={clientInput}
					setValue={setClientInput}
					onAdd={() => {
						if (clientInput.trim() !== "") {
							setClientInput("");
							addClient(dispatch)(clientInput);
						} else setClientInput(clientInput.trim());
					}}
				/>
			</div>
		</div>
	);
};

export default ClientContent;
