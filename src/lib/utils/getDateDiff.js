const removeColon = (time) => {
	return time.replace(":", "");
};

export const getDateDiff = (time1, time2) => {
	const start = removeColon(time1);
	const end = removeColon(time2);

	let hours = parseInt(end / 100 - start / 100);
	let mins = (end % 100) - (start % 100);
	if (end % 100 < start % 100) {
		mins = 60 - (start % 100) + (end % 100);
	}

	const hourText =
		hours !== 0 ? `${hours} ${hours === 1 ? "hr" : "hrs"}` : "";
	const minText = mins !== 0 ? `${mins} ${mins === 1 ? "min" : "mins"}` : "";

	if (time1 === time2) return "Instant";
	return `${hourText} ${minText}`.trim();
};
