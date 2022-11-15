export const convertTime = (time) => {
	const newerTime = `${time.hour}:${
		time.minute > 0 ? time.minute : "0" + time.minute
	}`;
	return newerTime;
};
