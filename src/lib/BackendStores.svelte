<script>
	import axios from "axios";

	import { user, userSettings, backendURL } from "./stores";

	$: if ($user) {
		updateUserSettings();
	}

	async function updateUserSettings() {
		if ($user && Object.keys($user).length) {
			let { data } = await axios.get(`${backendURL}/api/usersettings/`);
			$userSettings = data;
		}
		if (!$user || Object.keys($user).length == 0) {
			let { data } = await axios.get(
				window.location.origin + "/userSettings.json"
			);
			$userSettings = data;
		}
	}
</script>
