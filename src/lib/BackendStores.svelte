<script>
	import axios from "axios";

	import { user, userSettings, userSettingsInit, backendURL } from "./stores";

	$: if ($userSettings && $userSettingsInit) {
		if (
			JSON.stringify($userSettings) != JSON.stringify($userSettingsInit)
		) {
			updateUserSettings();
		}
	}

	$: if ($user) {
		getUserSettings();
	}

	async function updateUserSettings() {
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
			$userSettingsInit = JSON.parse(JSON.stringify(data));
		}
	}
</script>
