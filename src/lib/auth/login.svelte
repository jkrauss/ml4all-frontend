<script>
  import Textfield from "@smui/textfield";
  import Button from "@smui/button/Button.svelte";
  import Label from "@smui/list/Label.svelte";
  let userData = { grant_type: "password", username: "", password: "" };
  import axios from "axios";
  import { user } from "../stores";
</script>

<div class="flex flex-col w-full justify-center items-center py-16">
  <form
    action=""
    class="flex flex-col justify-center items-center gap-2"
    on:submit|preventDefault={async () => {
      console.log(userData);

      let request = await axios.post(
        "https://foodsight.azurewebsites.net/token",
        userData,
        {
          headers: {
            Authorization: "Basic Og==",
          },
        }
      );
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
