<script>
  import Textfield from "@smui/textfield";
  import Button from "@smui/button/Button.svelte";
  import Label from "@smui/list/Label.svelte";
  import axios from "axios";
  import { modal, user } from "../stores";
  let userData = { grant_type: "password", username: "", password: "" };
  let errorMessage;
  let loginPromise;
  $: {
    if (userData.password && userData.username) {
      errorMessage = undefined;
    }
  }

  async function login() {
    if (!userData.username || !userData.password) return;
    console.log($user);
    loginPromise = new Promise(async (res, rej) => {
      let bodyFormData = new FormData();
      bodyFormData.append("username", userData.username);
      bodyFormData.append("password", userData.password);
      try {
        let { data } = await axios.post(
          window.location.origin + "/token",
          bodyFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Basic Og==",
            },
          }
        );
        //console.log(data);
        if (data && user) {
          $user = data;
          localStorage.setItem("auth", JSON.stringify(data));
          $modal = {};
          bodyFormData = undefined;
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
      bind:value={userData.username}
      label="Benutzername"
    />
    <Textfield
      variant="filled"
      bind:value={userData.password}
      type="password"
      label="Passwort"
    />

    {#if loginPromise}
      {#await loginPromise}
        <Button variant="raised" class="w-full">
          <Label><span class="material-icons animate-spin"> sync </span></Label>
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
