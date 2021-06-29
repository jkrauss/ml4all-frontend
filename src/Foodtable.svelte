<section class="ftable">
    <Datatable settings={settings} data={data}>
        <thead>
            <th data-key="id" class="numcol">ID</th>
            <th data-key="product" class="textcol">Produkte</th>
            <th data-key="forecast" class="numcol">Vorschlag</th>
            <th data-key="order_qty" class="numcol">Bestellen</th>
        </thead>
        <tbody>
            {#each $rows as row}
            <tr>
                <td class="numcol">{row.id}</td>
                <td class="textcol">{row.product}</td>
                <td class="numcol">{row.order_range}</td>
                <td class="numcol">
                    <Textfield
                        class="shaped-outlined"
                        variant="outlined"
                        bind:value={row.order_qty}
				    >
					    <HelperText slot="helper">{row.order_range}</HelperText>
				    </Textfield>
                </td>
            </tr>
            {/each}
        </tbody>
    </Datatable>
</section>

    
<script>
    import Button, { Icon, Label } from '@smui/button';
    import Select, { Option } from '@smui/select';
    import IconButton from '@smui/icon-button';
    import Textfield, { Input } from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text/index';
    import { beforeUpdate } from 'svelte'
  
    import { Datatable, rows } from 'svelte-simple-datatables'

    const settings = {
      sortable: true,
      pagination: true,
      scrollY: true,
      rowPerPage: 10,
      columnFilter: true,
      css: true, //true let's the table shrink or even explode left/right on window resizing 
      labels: {
          search: 'Suchen...',    // search input placeholer
          filter: 'Filtern',       // filter inputs placeholder
          noRows: 'Keine Einträge...',
          info: 'Zeige {start} bis {end} von {rows} Einträgen',
          previous: 'Zurück',
          next: 'Nächste',       
      },
      blocks: {
          searchInput: true, 
          paginationButtons: true,
          paginationRowCount: true,
      }
  }

  
  let data = [];
  let loaded = false;

  async function getData() {
      if (typeof window === "undefined") return;

      loaded = false;
      //const res = await fetch("http://localhost:8000/api/forecast/?clientId=23");
      const res = await fetch("tableData.json");
      const body = await res.json();
      data = body.data;
      console.log(data);

      setTimeout(() => loaded = true, 500);
  }
  beforeUpdate(() => {
    if (data.length==0){
        getData();
    }
    });

</script>


<style>
    .ftable {
    min-height: 600px;
    margin: 0 auto;
    max-width: 800px;
    table-layout: fixed;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
    }
    .numcol {
        text-align: center;
        border:grey;
        border-style: solid;
        border-width: 3px;
    }
    .textcol {
        text-align: left;
        border:grey;
        border-style: solid;
        border-width: 3px;
    }
    td, th {
    padding: 8px;
    }
    tr:nth-child(even) {
    background-color: var(--mdc-theme-secondary);
    }     
</style>
  
<svelte:head>
      <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700">
      
    <!-- Material Typography -->
      <link rel="stylesheet" href="https://unpkg.com/@material/typography@11.0.0/dist/mdc.typography.css" />
      
      <!-- SMUI -->
      <link rel="stylesheet" href="foodsight.css" />
      <link rel="stylesheet" href="bare.css" />
</svelte:head>