<script>
	import Textfield from "@smui/textfield";
	import Button from "@smui/button/Button.svelte";
	import Label from "@smui/list/Label.svelte";
	import axios from "axios";
	import { modal, user, backendURL } from "../stores";
	import { goto, redirect } from "@roxi/routify";
	
	let userSettings = { grant_type: "password", username: "", password: "" };
	let loginPromise;

	async function login() {
		if (!userSettings.username || !userSettings.password) return;
		loginPromise = new Promise(async (res, rej) => {
			let bodyFormData = new FormData();
			bodyFormData.append("username", userSettings.username);
			bodyFormData.append("password", userSettings.password);
			try {
				let { data } = await axios.post(
					// window.location.origin + "/token",
					`${backendURL}/api/token`,
					bodyFormData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: "Basic Og==",
						},
					}
				);
				if (data && user) {
					$user = data;
					localStorage.setItem("auth", JSON.stringify(data));
					$modal = {};
					bodyFormData = undefined;
					// after every login or logout set the main content to show the homepage
					$redirect("/")
				}
				res(data);
			} catch (err) {
				rej(err.response?.data.detail);
			}
		});
	}
</script>

<div class="flex flex-col w-full justify-center items-center py-16">
	<form
		action=""
		class="flex flex-col justify-center items-center gap-2"
		on:submit|preventDefault={login}
	>
		<Textfield
			variant="filled"
			bind:value={userSettings.username}
			label="Benutzername"
		/>
		<Textfield
			variant="filled"
			bind:value={userSettings.password}
			type="password"
			label="Passwort"
		/>

		{#if loginPromise}
			{#await loginPromise}
				<Button variant="raised" class="w-full">
					<Label
						><span class="material-icons animate-spin">
							sync
						</span></Label
					>
				</Button>
			{:then data}
				Login sucessfull 
			{:catch err}
				<div class="text-red-500">
					{err}
				</div>
				<Button variant="raised" class="w-full">
					<Label>Login</Label>
				</Button>
			{/await}
		{:else}
			<Button variant="raised" class="w-full">
				<Label>Login</Label>
			</Button>
		{/if}
	</form>
	<!--
  <span href="#restoreUser" class="mt-12 text-blue-500 cursor-pointer"
    >Forgot your details?</span
  >
  -->
</div>
