<script>
	import { Router } from "@roxi/routify";
	import { routes } from "../.routify/routes";
	import Tailwind from "./Tailwind.svelte";
</script>

<Tailwind />

<Router {routes} />
