export const filterList = (list, field, value) => {
	if (list.length === 0) return [];

	return list.filter((item) => item[field] === value);
};
