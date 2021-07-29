<script>
  import { axios } from "axios";
  import Modal from "./lib/Modal.svelte";
  import Foodtable from "./Foodtable.svelte";
  import Tailwind from "./Tailwind.svelte";
  import Nav from "./lib/nav/main.svelte";
  import { user } from "./lib/stores";

  $: if ($user) {
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${$user.access_token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  } else {
    if (localStorage.getItem("auth")) {
      $user = JSON.parse(localStorage.getItem("auth"));
    }
  }
</script>

<Tailwind />

<Modal />

<Nav />

<div class="p-2 h-full">
  <Foodtable />
</div>
<footer>Here goes the footer</footer>

<svelte:head>
  <!-- Fonts -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
  />

  <!-- Material Typography -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/@material/typography@11.0.0/dist/mdc.typography.css"
  />

  <!-- SMUI -->
  <link rel="stylesheet" href="foodsight.css" />
  <link rel="stylesheet" href="bare.css" />
</svelte:head>

<style>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *
    :global(.shaped-outlined
      .mdc-notched-outline
      .mdc-notched-outline__leading) {
    border-radius: 28px 0 0 28px;
    width: 28px;
  }
  *
    :global(.shaped-outlined
      .mdc-notched-outline
      .mdc-notched-outline__trailing) {
    border-radius: 0 28px 28px 0;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__notch) {
    max-width: calc(100% - 28px * 2);
  }
  * :global(.shaped-outlined) {
    width: 100px;
    height: 35px;
  }
</style>
