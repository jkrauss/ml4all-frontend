import axios from "axios";
import { writable } from "svelte/store";
const backendURL = `https://foodsight.azurewebsites.net`;
// export const backendURL = `${window.location.origin}`;
const modal = writable({}); // the modal that is either for login or for logout
const user = writable(
	localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
); // the user - if logged in, otherwise run in demo-mode
const userSettings = writable();
const mainContent = writable(); // the main-content of our SPA, e.g. datatable or settings-page
const screenShotMode = writable(false);
const problemReport = writable({});
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

export {
	backendURL,
	mainContent,
	screenShotMode,
	modal,
	user,
	userSettings,
	problemReport,
};
