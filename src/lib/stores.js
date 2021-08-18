import axios from "axios";
import { writable } from "svelte/store";

// var definition
const backendURL = window.location.origin;
//const backendURL = writable(window.location.origin);
//const backendURL = "https://foodsight.ml4all.com";
const modal = writable({}); // the modal that is either for login or for logout
const user = writable(
	localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
); // the user - if logged in, otherwise run in demo-mode
const userSettings = writable();
const mainContent = writable(); // the main-content of our SPA, e.g. datatable or settings-page
const screenShotMode = writable(false);
const problemReport = writable({});
const userSettingsInit = writable();
const notification = writable();
// user subscribtioin to handle axios interceptor forauthentication
user.subscribe((val) => {
	localStorage.setItem("user", JSON.stringify(val));
	if (val && Object.keys(val).length != 0) {
		//setting axios headers
		axios.interceptors.request.use(
			(config) => {
				config.headers.authorization = `Bearer ${val.access_token}`;
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
	}
});

// exports
export {
	backendURL,
	mainContent,
	screenShotMode,
	modal,
	user,
	userSettings,
	userSettingsInit,
	problemReport,
	notification,
};
