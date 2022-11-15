import React from "react";
import cls from "classnames";
import "./Table.css";

const Table = ({
	data = [],
	header = [],
	onSelect = () => {},
	onDoubleClick = () => {},
	selected = 0,
	emptyMessage = "Empty table",
}) => {
	const renderHeader = () => {
		return header.map((item, bar) => {
			if (bar === 0) return null;
			return (
				<th className="Table__header-item" key={item}>
					{item}
				</th>
			);
		});
	};
	const renderRowData = () => {
		return data.map((item, index) => {
			return (
				<tr
					className={cls(
						"Table__row",
						selected === item.id && "Table__row--selected"
					)}
					key={index}
					onClick={() => onSelect(item.id)}
					onDoubleClick={onDoubleClick}
				>
					{Object.values(item).map((foo, bar) => {
						if (bar === 0) return null;

						return (
							<td className="Table__row-item" key={bar}>
								{foo}
							</td>
						);
					})}
				</tr>
			);
		});
	};
	return (
		<>
			<table className="Table">
				<thead>
					<tr className="Table__header">{renderHeader()}</tr>
				</thead>
				<tbody>{renderRowData()}</tbody>
			</table>
			{data.length === 0 && (
				<div className="Table__empty">{emptyMessage}</div>
			)}
		</>
	);
};

export default Table;
