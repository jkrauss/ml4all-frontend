<script>
	import Serviceworker from "./Serviceworker.svelte";
	import { Router } from "@roxi/routify";
	import { routes } from "../.routify/routes";
	import Tailwind from "./Tailwind.svelte";
</script>

<Serviceworker />

<Tailwind />

<Router {routes} />
