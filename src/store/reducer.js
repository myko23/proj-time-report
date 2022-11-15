import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { DateTime } from "luxon";

const slice = createSlice({
	name: "state",
	initialState: {
		login: false,
		user: "Jane Doe",
		content: "clients",
		selected: {
			clientid: 0,
			timereportid: 0,
			currentdate: DateTime.now().toLocaleString(),
		},
		modal: { addreport: false, updatereport: false },
		entities: {
			clients: [
				// {
				// 	id: 1,
				// 	company: "ABC Corporation",
				// },
				// {
				// 	id: 2,
				// 	company: "Angel Incorporated",
				// },
				// {
				// 	id: 3,
				// 	company: "PBC Newsletter",
				// },
				// {
				// 	id: 4,
				// 	company: "Cream of the Crop World",
				// },
				// {
				// 	id: 5,
				// 	company: "Ariba Taste",
				// },
			],
			timereports: [
				// {
				// 	id: 1,
				// 	timeIn: "10:00",
				// 	timeOut: "11:00",
				// 	duration: "1 hour, 0 min",
				// 	client: "Angel Accessories",
				// 	remarks: "VAT Exemption",
				// 	date: "11/07/2022",
				// },
				// {
				// 	id: 2,
				// 	timeIn: "10:00",
				// 	timeOut: "11:00",
				// 	duration: "1 hour, 0 min",
				// 	client: "Angel Accessories",
				// 	remarks: "VAT Exemption",
				// 	date: "11/07/2022",
				// },
				// {
				// 	id: 3,
				// 	timeIn: "10:00",
				// 	timeOut: "11:00",
				// 	duration: "1 hour, 0 min",
				// 	client: "Angel Accessories",
				// 	remarks: "VAT Exemption",
				// 	date: "11/07/2022",
				// },
				// {
				// 	id: 4,
				// 	timeIn: "10:00",
				// 	timeOut: "11:00",
				// 	duration: "1 hour, 0 min",
				// 	client: "Angel Accessories",
				// 	remarks: "VAT Exemption",
				// 	date: "11/07/2022",
				// },
				// {
				// 	id: 5,
				// 	timeIn: "10:00",
				// 	timeOut: "11:00",
				// 	duration: "1 hour, 0 min",
				// 	client: "Angel Accessories",
				// 	remarks: "VAT Exemption",
				// 	date: "11/07/2022",
				// },
			],
		},
	},
	reducers: {
		dataInitialized: (state, action) => {
			state.entities.clients = action.payload.clients;
			state.entities.timereports = action.payload.timereports;
		},
		loggedIn: (state, action) => {
			state.login = true;
		},
		loggedOut: (state, action) => {
			state.login = false;
		},
		contentSet: (state, action) => {
			state.content = action.payload;
		},
		selectedClientSet: (state, action) => {
			state.selected.clientid = action.payload;
		},
		selectedReportSet: (state, action) => {
			state.selected.timereportid = action.payload;
		},
		reportDeleted: (state, action) => {
			state.entities.timereports = state.entities.timereports.filter(
				(item) => {
					if (item.id !== action.payload) return item;
				}
			);
		},
		clientDeleted: (state, action) => {
			state.entities.clients = state.entities.clients.filter((item) => {
				if (item.id !== action.payload) return item;
			});
		},
		clientAdded: (state, action) => {
			const id =
				state.entities.clients.length !== 0
					? state.entities.clients[state.entities.clients.length - 1]
							.id + 1
					: 1;
			state.entities.clients = [
				...state.entities.clients,
				{ id, company: action.payload },
			];
		},
		reportAdded: (state, action) => {
			const id =
				state.entities.timereports.length !== 0
					? state.entities.timereports[
							state.entities.timereports.length - 1
					  ].id + 1
					: 1;

			state.entities.timereports.push({ id, ...action.payload });
		},
		reportUpdated: (state, action) => {
			const index = _.findIndex(
				state.entities.timereports,
				(item) => item.id === action.payload.id
			);
			state.entities.timereports[index].timeIn =
				action.payload.report.timeIn;
			state.entities.timereports[index].timeOut =
				action.payload.report.timeOut;
			state.entities.timereports[index].duration =
				action.payload.report.duration;
			state.entities.timereports[index].client =
				action.payload.report.client;
			state.entities.timereports[index].remarks =
				action.payload.report.remarks;
		},
		addReportModalShow: (state, action) => {
			state.modal.addreport = action.payload;
		},
		updateReportModalShow: (state, action) => {
			state.modal.updatereport = action.payload;
		},
		currentDateSet: (state, action) => {
			state.selected.currentdate = action.payload;
		},
		nameSet: (state, action) => {
			state.user = action.payload;
		},
	},
});

export default slice.reducer;
const {
	dataInitialized,
	loggedIn,
	loggedOut,
	contentSet,
	selectedClientSet,
	clientDeleted,
	clientAdded,
	selectedReportSet,
	reportDeleted,
	addReportModalShow,
	reportAdded,
	reportUpdated,
	updateReportModalShow,
	currentDateSet,
	nameSet,
} = slice.actions;

export const initializedData = (dispatch) => (data) => {
	dispatch(
		dataInitialized({
			timereports: data.timereports,
			clients: data.clients,
		})
	);
};

export const onLogin = (dispatch) => {
	dispatch(loggedIn());
};
export const onLogout = (dispatch) => {
	dispatch(loggedOut());
};
export const setContent = (dispatch) => (content) => {
	dispatch(
		contentSet(content === "Time Reports" ? "timereports" : "clients")
	);
};
export const setSelectedClient = (dispatch) => (id) => {
	dispatch(selectedClientSet(id));
};
export const setSelectedReport = (dispatch) => (id) => {
	dispatch(selectedReportSet(id));
};
export const deleteClient = (dispatch) => (id) => {
	dispatch(clientDeleted(id));
};
export const addClient = (dispatch) => (company) => {
	dispatch(clientAdded(company));
};

export const deleteReport = (dispatch) => (id) => {
	dispatch(reportDeleted(id));
};
export const addReport = (dispatch) => (report) => {
	dispatch(reportAdded(report));
};

export const updateReport = (dispatch) => (id, report) => {
	dispatch(reportUpdated({ id, report }));
};
export const showAddReportModal = (dispatch) => (visible) => {
	dispatch(addReportModalShow(visible));
};
export const showUpdateReportModal = (dispatch) => (visible) => {
	dispatch(updateReportModalShow(visible));
};
export const setCurrentDate = (dispatch) => (date) => {
	dispatch(currentDateSet(date));
};
export const setName = (dispatch) => (name) => {
	dispatch(nameSet(name));
};

export const getState = (state) => state;
