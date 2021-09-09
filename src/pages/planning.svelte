<script>
	import axios from "axios";
	import Paper, { Title, Content } from "@smui/paper";
	import { user, userSettings, backendURL } from "../components/stores";
	import Menu from "@smui/menu";
	import Button, { Group, GroupItem, Label, Icon } from "@smui/button";
	import List, { Item, Text } from "@smui/list";
	import { search } from "ss-search";
	import { blur, fade } from "svelte/transition";
	import Textfield from "@smui/textfield/Textfield.svelte";

	let orderMenu;
	let searchInputText;
	let tableWhitelist = ["id", "product"];
	let labels = [
		{ key: "id", text: "ID" },
		{ key: "product", text: "Produkt" },
		{ key: "tomorrow_order_range", text: "Vorschlag Morgen" },
		{ key: "tomorrow_order_qty", text: "Bestellung Morgen" },
		{ key: "day_after_order_range", text: "Vorschlag Übermorgen" },
		{ key: "day_after_order_qty", text: "Bestellung Übermorgen" },
		{ key: "next7_order_range", text: "Vorschlag Woche" },
		{ key: "next7_order_qty", text: "Bestellung Woche" },
	];
	let dataTypes = [
		{ key: "day_after_order_qty", type: "number" },
		{ key: "tomorrow_order_qty", type: "number" },
		{ key: "next7_order_qty", type: "number" },
	];
	let dataPromise = new Promise(() => {});
	let sortBy = { col: "id", ascending: true };
	let currentPage = 1;

	async function order(option, data) {
		let orderUrl = `${backendURL}${$userSettings.order_url}`;
		let resType;
		let filename = `Foodsight_Bestellung.${option}`;

		if (option === "xlsx") {
			resType = "arraybuffer";
		} else if (option === "csv") {
			resType = "text";
		}

		let orderOption;
		if ($userSettings?.tomorrow) {
			orderOption = "tomorrow";
		} else if ($userSettings?.day_after_tomorrow) {
			orderOption = "day_after_tomorrow";
		} else if ($userSettings?.next_seven_days) {
			orderOption = "next_seven_days";
		}
		axios({
			url: orderUrl,
			method: "POST",
			responseType: resType,
			data: { option: option, order_option: orderOption, data: data },
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
		});
	}

	$: pageLength = $userSettings?.rows_per_page || 10;

	$: dataPromise = new Promise(async (res, rej) => {
		if (!$userSettings || Object.keys($userSettings).length == 0) {
			rej("userSettings Not Defined");
		}
		let dataUrl;
		let keys = [];

		try {
			if ($user && Object.keys($user).length) {
				dataUrl = `${backendURL}${$userSettings.forecast_url}/?store=${$userSettings.store}`;
			} else {
				dataUrl = `tableDataStore${$userSettings.store}.json`;
			}
			let result;
			if (
				localStorage.getItem(dataUrl) &&
				JSON.stringify(
					JSON.parse(localStorage.getItem(dataUrl)).user
				) === JSON.stringify($user)
			) {
				let searchedData = search(
					JSON.parse(localStorage.getItem(dataUrl)).data.body,
					["id", "product"],
					searchInputText
				);
				res({
					body: searchedData,
					head: JSON.parse(localStorage.getItem(dataUrl)).data.head,
				});
			} else {
				result = await axios.get(dataUrl);
				result.data.forEach((val) => {
					Object.keys(val).forEach((ob) => {
						if (!keys.includes(ob)) {
							keys.push(ob);
						}
					});
				});
				localStorage.setItem(
					dataUrl,
					JSON.stringify({
						user: $user,
						data: { body: result.data, head: keys },
					})
				);
				let searchedData = search(
					result.data,
					["id", "product"],
					searchInputText
				);
				res({ body: searchedData, head: keys });
			}
		} catch (er) {
			console.log(er);
		}
	});

	$: if ($userSettings?.next_seven_days) {
		tableWhitelist = [
			...tableWhitelist,
			"next7_order_range",
			"next7_order_qty",
		];
	} else {
		tableWhitelist.filter(
			(item) => !["next7_order_range", "next7_order_qty"].includes(item)
		);
	}
	$: if ($userSettings?.day_after_tomorrow) {
		tableWhitelist = [
			...tableWhitelist,
			"day_after_order_range",
			"day_after_order_qty",
		];
	} else {
		tableWhitelist.filter(
			(item) =>
				!["day_after_order_range", "day_after_order_qty"].includes(item)
		);
	}
	$: if ($userSettings?.tomorrow) {
		tableWhitelist = [
			...tableWhitelist,
			"tomorrow_order_range",
			"tomorrow_order_qty",
		];
	} else {
		tableWhitelist.filter(
			(item) =>
				!["tomorrow_order_range", "tomorrow_order_qty"].includes(item)
		);
	}

	$: sort = (data, column) => {
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}
		let sortModifier = sortBy.ascending ? 1 : -1;
		let sort = (a, b) =>
			a[column] < b[column]
				? -1 * sortModifier
				: a[column] > b[column]
				? 1 * sortModifier
				: 0;

		return data.sort(sort);
	};
</script>

<section class="flex flex-col gap-4 md:w-10/12 w-full mx-auto">
	<Paper elevation={1}>
		<Title><h1 class="text-2xl my-6">Vorhersage und Planung</h1></Title>
		<Content>
			<div class="flex flex-col gap-4 w-full">
				<input
					type="text"
					bind:value={searchInputText}
					placeholder="Suche..."
					class="p-2 rounded-md w-full"
				/>
				{#await dataPromise}
					<div
						class="w-full flex flex-col justify-center items-center h-96"
					>
						<span class="material-icons animate-spin">
							autorenew
						</span> Loading
					</div>
				{:then data}
					<table class="w-full" in:blur>
						<thead class="border-b border-black">
							{#each data.head as col}
								{#if tableWhitelist.includes(col)}
									<th
										on:click={() => {
											data.body = sort(data.body, col);
										}}
										style="background: var(--table-head-bg); color: var(--table-head-color)"
									>
										<div
											class="relative h-10 flex justify-center items-center"
										>
											{labels.find(
												(item) => item.key === col
											)?.text || col}
											<div
												class="absolute -right-1 top-0 bottom-0"
											>
												<span
													class={`material-icons absolute right-0 top-0 `}
													class:text-gray-200={sortBy.col ==
														col &&
														!sortBy.ascending}
													class:text-gray-500={sortBy.col !=
														col || sortBy.ascending}
												>
													arrow_drop_up
												</span>
												<span
													class="material-icons absolute right-0 bottom-0"
													class:text-gray-200={sortBy.col ==
														col && sortBy.ascending}
													class:text-gray-500={sortBy.col !=
														col ||
														!sortBy.ascending}
												>
													arrow_drop_down
												</span>
											</div>
										</div>
									</th>
								{/if}
							{/each}
						</thead>

						<tbody>
							{#each data.body as item, i}
								{#if i < pageLength * currentPage && i >= pageLength * (currentPage - 1)}
									<tr
										style={`background: ${
											i % 2
												? "var(--table-body-odd-bg)"
												: "var(--table-body-even-bg)"
										};
									color: ${
										i % 2
											? "var(--table-body-odd-color)"
											: "var(--table-body-even-color)"
									}`}
									>
										{#each Object.keys(item) as field}
											{#if tableWhitelist.includes(field)}
												<td>
													<!-- checking if dataType is special can be edited to display difrent datatypes-->
													{#if dataTypes.find((item) => item.key === field)}
														{#if dataTypes.find((item) => item.key === field).type == "number"}
															<!-- displaying number datatypes as input field 
											<input
												type="number"
												bind:value={dataRow[key]}
												class="min-w-24 w-24"
											/> -->
															<Textfield
																class="shaped-outlined"
																variant="outlined"
																type="number"
																bind:value={item[
																	field
																]}
															/>
														{/if}
													{:else}
														<!-- just displying data -->
														{item[field]}
													{/if}</td
												>
											{/if}
										{/each}
									</tr>
								{/if}
							{:else}
								<div class="h-96 relative">
									<div
										class="absolute top-0 left-0 -right-full bottom-0 flex justify-center items-center"
									>
										Keine Daten zum Suchbegriff "{searchInputText}"
										gefunden
									</div>
								</div>
							{/each}
						</tbody>
					</table>

					<div class="w-full flex" in:fade>
						<Group>
							<Button
								on:click={() => order("xlsx", data.body)}
								variant="raised"
								style="background: {'var(--mdc-theme-callout)'}"
							>
								<Label>Bestellung abschliessen</Label>
							</Button>
							<div use:GroupItem>
								<Button
									on:click={() => orderMenu.setOpen(true)}
									variant="raised"
									style="padding: 0; min-width: 36px; background: {'var(--mdc-theme-callout)'}"
								>
									<Icon
										class="material-icons"
										style="margin: 0;">arrow_drop_down</Icon
									>
								</Button>
								<Menu
									bind:this={orderMenu}
									anchorCorner="TOP_LEFT"
								>
									<List>
										<Item
											on:SMUI:action={() =>
												order("xlsx", data.body)}
										>
											<Text>excel</Text>
										</Item>
										<Item
											on:SMUI:action={() =>
												order("csv", data.body)}
										>
											<Text>csv</Text>
										</Item>
									</List>
								</Menu>
							</div>
						</Group>
						<div class="ml-auto ">
							<Group variant="raised">
								{#if currentPage > 1}
									<Button
										on:click={() => currentPage--}
										variant="raised"
									>
										<Label
											><span
												class="material-icons text-sm"
											>
												arrow_back_ios_new
											</span></Label
										>
									</Button>
								{/if}
								{#if currentPage - 1 > 0}
									<Button
										on:click={() =>
											(currentPage = currentPage - 1)}
										variant="raised"
									>
										<Label>{currentPage - 1}</Label>
									</Button>
								{/if}

								<Button on:click={() => {}} variant="raised">
									<Label>{currentPage}</Label>
								</Button>
								{#if currentPage + 1 <= Math.floor(data.body.length / pageLength) + 1}
									<Button
										on:click={() => {
											currentPage = currentPage + 1;
										}}
										variant="raised"
									>
										<Label>{currentPage + 1}</Label>
									</Button>
								{/if}
								{#if data.body.length > pageLength * currentPage}<Button
										on:click={() => {
											currentPage++;
										}}
										variant="raised"
									>
										<Label
											><span
												class="material-icons p-0 text-sm flex justify-center item"
											>
												arrow_forward_ios
											</span></Label
										>
									</Button>{/if}
							</Group>
						</div>
					</div>
				{:catch error}{error}{/await}
			</div>
		</Content>
	</Paper>
</section>

<style global>
	th,
	td {
		@apply text-center;
		width: 20000px;
	}
	input {
		@apply py-2;
		@apply px-4;
		@apply rounded;
	}
	:root {
		--table-head-bg: var(--mdc-theme-primary);
		--table-head-color: var(--mdc-theme-on-primary);
		--table-body-odd-bg: var(--mdc-theme-background);
		--table-body-odd-color: var(--mdc-theme-text-primary-on-background);
		--table-body-even-bg: var(--mdc-theme-2nd-background);
		--table-body-even-color: var(--mdc-theme-text-primary-on-background);
	}
</style>
