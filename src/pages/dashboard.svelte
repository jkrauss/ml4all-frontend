<script>
	import Paper, { Title, Content } from "@smui/paper";
	import Button, { Label } from "@smui/button";
	import { goto, redirect } from "@roxi/routify";
	import {user} from "../components/stores.js";
	import Donut from "../components/components/Donut.svelte"
	import { fade } from "svelte/transition";
	import Slider from '@smui/slider';

	import { onMount } from 'svelte';
	//make page only visible if logged in - otherwise redirect to signup-page
	//onMount(() => {
	//	if (!($user && Object.keys($user).length)) {
	//		$redirect("/signup")
	//	}
	//});

	let data = [90, 10];
	let labels = ['Einsparung', 'Verbleibende Retoure'];
	let id1 = "donut_save";
	let id2 = "donut_stock";
 
 	let value = 0;

</script>

<div in:fade>

<Paper elevation={1} class="md:w-10/12 w-full mx-auto">
	<Title><h1 class="text-2xl my-6">Dashboard</h1></Title>
	<Content>
		<input type="number" bind:value={data[0]}>
		<input type="number" bind:value={data[1]}>
		<div>
			<div class="chart-container" style="width:45%; max-width:350px; position:relative; float:left;">
				<Donut {data} {labels}  id={id1} />	
			</div>
			<div class="chart-container" style="width:45%; max-width:350px; position:relative; float:right;">
				<Donut {data} {labels} id={id2} />	
			</div>
		</div>
		<br style="clear: both;" />	
		<div style="padding: 0px 25%;">
			<Slider
				bind:value
				min={-2}
				max={2}
				step={1}
				discrete
				tickMarks
				input$aria-label="Tick mark slider"
			/>
		</div>
	</Content>
</Paper>
</div>


