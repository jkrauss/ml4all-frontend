<script>    import Paper, {Content, Title} from "@smui/paper";
import {onMount} from "svelte";
import {goto} from "@roxi/routify";

onMount(() => {
    setTimeout(() => {
        $goto("/login")
    }, 5000)
})
</script>
<Paper class="md:w-10/12 w-full mx-auto" elevation={1}>
    <Title>Danke</Title>
    <Content class="gap-4">
        Die Registrierung war erfolgreich, wir melden uns in Kürze bei Ihnen!
    </Content>
</Paper>