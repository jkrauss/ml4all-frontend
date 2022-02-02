<script>
    import Notification from "../components/components/Notification.svelte";
    import Modal from "../components/Modal/main.svelte";
    import Nav from "../components/nav/main.svelte";
    import Footer from "../components/Footer.svelte";
    /*    import {svelteRenderParent} from "../components/stores";*/
</script>


<svelte:head>
    <!-- Fonts -->
    <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
    />
    <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            rel="stylesheet"
    />

    <!-- Material Typography -->
    <link
            href="https://unpkg.com/@material/typography@11.0.0/dist/mdc.typography.css"
            rel="stylesheet"
    />

    <!-- SMUI -->
    <link href="/foodsight.css" rel="stylesheet"/>
    <link href="/bare.css" rel="stylesheet"/>
</svelte:head>
<Notification/>
<Modal/>

<main class="flex flex-col h-screen">
    <Nav/>
    <div class="p-2 h-full overflow-y-auto overflow-x-hidden">
        <slot/>
    </div>
    <Footer/>
</main>

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

    *
    :global(.shaped-outlined
			.mdc-notched-outline
			.mdc-notched-outline__notch) {
        max-width: calc(100% - 28px * 2);
    }

    * :global(.shaped-outlined) {
        width: 100px;
        height: 35px;
    }
</style>