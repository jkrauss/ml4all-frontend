<script>
    import Tooltip, {Wrapper} from '@smui/tooltip';

    let clazz
    export {clazz as class};
</script>
<Wrapper>
    <span class={`material-icons ${clazz}`}>information</span>
    <Tooltip xPos="center">
        <slot>Tooltip</slot>
    </Tooltip>
</Wrapper>