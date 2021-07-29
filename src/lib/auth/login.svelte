<script>
  import Textfield from "@smui/textfield";
  import Button from "@smui/button/Button.svelte";
  import Label from "@smui/list/Label.svelte";
  let userData = { grant_type: "password", username: "", password: "" };
  import axios from "axios";
  import { modal, user } from "../stores";
</script>

<div class="flex flex-col w-full justify-center items-center py-16">
  <form
    action=""
    class="flex flex-col justify-center items-center gap-2"
    on:submit|preventDefault={async () => {
      if (!userData.username || !userData.password) return;
      var bodyFormData = new FormData();
      bodyFormData.append("username", userData.username);
      bodyFormData.append("password", userData.password);
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
      console.log(request.data);
      if (request.data) {
        $modal = {};
      }
      $user = request.data;
      localStorage.setItem("auth", JSON.stringify(request.data));
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
      <Label>Login</Label>
    </Button>
  </form>
</div>
