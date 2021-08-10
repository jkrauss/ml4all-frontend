<script>
	import axios from "axios";
	import { userData } from "./lib/stores";
</script>

<section class="flex flex-col">
	<h1 class="text-2xl">Einstellungen</h1>
	<div class="flex justify-between">
		<h2>angemeldete/r Benutzer*In</h2>
		<p>{$userData?.username}</p>
	</div>
</section>
