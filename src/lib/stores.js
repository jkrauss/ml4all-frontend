import { writable } from "svelte/store";

export const modal = writable({}); // the modal that is either for login or for logout
export const user = writable(); // the user - if logged in, otherwise run in demo-mode
export const mainContent = writable(); // the main-content of our SPA, e.g. datatable or settings-page
