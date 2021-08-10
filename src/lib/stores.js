import axios from "axios";
import { derived, writable } from "svelte/store";

export const modal = writable({}); // the modal that is either for login or for logout
export const user = writable(); // the user - if logged in, otherwise run in demo-mode
export const userData = derived(user, async ($user, set) => {
	if ($user && Object.keys($user).length > 0) {
		let { data } = await axios.get(window.location.origin + "/users/me/");
		console.log($user);
		set(data);
	}
}); // username
export const mainContent = writable(); // the main-content of our SPA, e.g. datatable or settings-page
export const screenShotMode = writable(false);
