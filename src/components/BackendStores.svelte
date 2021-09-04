<script>
	import axios from "axios";
	import { user, userSettings, userSettingsInit, backendURL } from "./stores";

	$: if ($userSettings && $userSettingsInit) {
		//checking if stettings are idetical and if not updating the endpoint
		if (
			JSON.stringify($userSettings) != JSON.stringify($userSettingsInit)
		) {
			updateUserSettings();
		}
	}

	$: if ($user) {
		//getuser Settings
		getUserSettings();

		// sett lougout interval
		let startTime = new Date($user.expires);
		let interval = setInterval(() => {
			let currentTime = new Date();
			if (currentTime > startTime) {
				clearInterval(interval);
				localStorage.removeItem("auth");
				$user = {};
			}
		}, 1000);
	}

	async function updateUserSettings() {
		//checking if user is defined and if updating the /api/userdata endpoint else do nothing
		if (!$user || Object.keys($user).length == 0) {
			return;
		}
		if ($user && Object.keys($user).length) {
			let { data } = await axios.put(
				`${backendURL}/api/usersettings/`,
				$userSettings
			);
			$userSettingsInit = JSON.parse(JSON.stringify($userSettings));
		}
	}

	async function getUserSettings() {
		//checking whitch endpoint should be called for the user Settings and getting the Settings
		if ($user && Object.keys($user).length) {
			let { data } = await axios.get(`${backendURL}/api/usersettings/`);
			$userSettings = JSON.parse(JSON.stringify(data));
			$userSettingsInit = JSON.parse(JSON.stringify(data));
		}
		if (!$user || Object.keys($user).length == 0) {
			let { data } = await axios.get(
				window.location.origin + "/userSettings.json"
			);
			$userSettings = JSON.parse(JSON.stringify(data));
			$userSettings.day_after_tomorrow;
			$userSettingsInit = JSON.parse(JSON.stringify(data));
		}
	}
</script>
