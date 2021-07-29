<script>
  import Textfield from "@smui/textfield";
  import Button from "@smui/button/Button.svelte";
  import Label from "@smui/list/Label.svelte";
  import axios from "axios";
  import { modal, user } from "../stores";

  let userData = { grant_type: "password", username: "", password: "" };
  let loading = false;
</script>

<div class="flex flex-col w-full justify-center items-center py-16">
  <form
    action=""
    class="flex flex-col justify-center items-center gap-2"
    on:submit|preventDefault={async () => {
      loading = true;
      //catch if the fields are not complete
      if (!userData.username || !userData.password) return;

      // changing the data from json to Formdata
      var bodyFormData = new FormData();
      bodyFormData.append("username", userData.username);
      bodyFormData.append("password", userData.password);

      //making the request with axios
      let request = await axios.post(
        "https://foodsight.azurewebsites.net/token",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Basic Og==",
          },
        }
      );
      // closing modal if request was successfull and storing tokens and seting it in store
      if (request.data) {
        $user = request.data;
        localStorage.setItem("auth", JSON.stringify(request.data));
        loading = false;
        $modal = {};
      }
    }}
  >
    <Textfield
      variant="filled"
      bind:value={userData.username}
      label="Username"
    />
    <Textfield
      variant="filled"
      bind:value={userData.password}
      type="password"
      label="Password"
    />
    <Button variant="raised" class="w-full">
      <Label
        >{#if loading}<span class="material-icons animate-spin"> sync </span>
        {:else}
          Login{/if}</Label
      >
    </Button>
  </form>

  <span href="#restoreUser" class="mt-12 text-blue-500 cursor-pointer"
    >Forgot your details?</span
  >
</div>
