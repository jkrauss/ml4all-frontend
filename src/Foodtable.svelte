<script>
  import Button, { Icon, Label } from "@smui/button";
  import Select, { Option } from "@smui/select";
  import IconButton from "@smui/icon-button";
  import Textfield, { Input } from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";
  import { beforeUpdate } from "svelte";

  import { Datatable, rows } from "svelte-simple-datatables";

  const settings = {
    sortable: true,
    pagination: true,
    scrollY: true,
    rowPerPage: 14,
    columnFilter: true,
    css: true, //true let's the table shrink or even explode left/right on window resizing
    labels: {
      search: "Suchen...", // search input placeholer
      filter: "Filtern", // filter inputs placeholder
      noRows: "Keine Einträge...",
      info: "Zeige {start} bis {end} von {rows} Einträgen",
      previous: "Zurück",
      next: "Nächste",
    },
    blocks: {
      searchInput: true,
      paginationButtons: true,
      paginationRowCount: true,
    },
  };

  let data = [];
  let loaded = false;
  let width;
  async function getData() {
    if (typeof window === "undefined") return;

    loaded = false;
    //const res = await fetch("http://localhost:8000/api/forecast/?clientId=23");
    const res = await fetch("tableData.json");
    const body = await res.json();
    data = body.data;
    console.log(data);

    setTimeout(() => (loaded = true), 500);
  }
  beforeUpdate(() => {
    if (data.length == 0) {
      getData();
    }
  });
</script>

<svelte:window bind:outerWidth={width} />

<section class="ftable h-full md:px-16 md:py-8 ">
  <Datatable {settings} {data}>
    <thead class=" w-full">
      <tr class="grid grid-cols-4 justify-center w-full">
        <th data-key="id" class="numcol ">ID</th>
        <th data-key="product" class="textcol">Produkte</th>
        <!-- {#if width > 768} -->
        <th data-key="forecast" class="numcol">Vorschlag</th>
        <!-- {/if} -->
        <th data-key="order_qty" class="numcol">Bestellen</th>
      </tr>
    </thead>
    <tbody class="">
      {#each $rows as row}
        <tr class="grid grid-cols-4" w-full>
          <td class="flex justify-center items-center ">{row.id}</td>
          <td class="flex justify-center items-center">{row.product}</td>
          {#if width > 768}
            <td class="md:flex justify-center items-center hidden"
              >{row.order_range}</td
            >
          {/if}
          <td class="flex justify-center items-center">
            <input
              type="number"
              class="p-2 min-w-min"
              bind:value={row.order_qty}
            />
            <!-- <Textfield
              class="shaped-outlined"
              variant="outlined"
              bind:value={row.order_qty}
            >
              <HelperText slot="helper">
                {row.order_range}
              </HelperText>
            </Textfield> -->
          </td>
        </tr>
      {/each}
    </tbody>
  </Datatable>
</section>

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
