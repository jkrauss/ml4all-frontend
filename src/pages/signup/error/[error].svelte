<script>
    import Paper, {Content, Title} from "@smui/paper";
    import {goto, params} from '@roxi/routify';
    import {onMount} from "svelte";

    console.log($params)

    onMount(() => {
        setTimeout(() => {
            $goto("/signup")
        }, 5000)
    })
</script>

<Paper class="md:w-10/12 w-full mx-auto" elevation={1}>
    <Title>Error</Title>
    <Content class="gap-4">
        {$params.error}
    </Content>
</Paper>