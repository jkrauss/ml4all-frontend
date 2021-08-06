<script>
  import axios from "axios";
  import Modal from "./lib/Modal.svelte";
  import Foodtable from "./Foodtable.svelte";
  import Tailwind from "./Tailwind.svelte";
  import Nav from "./lib/nav/main.svelte";
  import Footer from "./lib/Footer.svelte";
  import { mainContent, user } from "./lib/stores";
  import { onMount } from "svelte";

  //getting tokens from Localstorage and seting the axios header globaly
  onMount(() => {
    getUserFromLocalstorage();
  });

  $: getUserFromLocalstorage($user, localStorage.getItem("auth"));

  function getUserFromLocalstorage() {
    if ($user && Object.keys($user).length != 0) {
      //setting axios headers
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
  }
</script>


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

<main>

  <Tailwind />
  <Modal />
  <Nav />

  <div class="p-2 h-full">
    {#if $mainContent==="settings"}
      <p>Hier sind die Einstellungen</p>
    {:else }
    <Foodtable />
    {/if}
  </div>
  
</main>

<Footer />

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
