import {writable} from "svelte/store";

// var definition
// const backendURL = window.location.origin;
/*const backendURL = "https://foodsight.ml4all.com";*/
const backendURL = 'https://foodsight-backend-b3grh.ondigitalocean.app'
const modal = writable({}); // the modal that is either for login or for logout
const userSettings = writable({});
const screenShotMode = writable(false);
const problemReport = writable({});
//const userSettingsInit = writable({});
const notification = writable({});

const svelteRenderParent = writable();
let interceptor;


// exports
export {
    backendURL,
    screenShotMode,
    modal,
    userSettings,
    //userSettingsInit,
    problemReport,
    notification,
    svelteRenderParent,
};