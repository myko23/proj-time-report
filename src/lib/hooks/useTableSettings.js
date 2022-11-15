import _ from "lodash";

const useTableSettings = (data, headers, configs) => {
	const newHeaders = ["id", ...Object.keys(headers)];
	const newData = data.map((item) => {
		return _.pick(item, newHeaders);
	});
	data.forEach((item, index) => {
		Object.keys(configs).forEach((next) => {
			newData[index][next] = configs[next](item);
		});
	});

	const sortedData = _.orderBy(newData, ["timeIn"], ["asc"]);

	return { data: sortedData, headers: ["id", ...Object.values(headers)] };
};

export default useTableSettings;
