<script>
    import Tooltip, {Wrapper} from '@smui/tooltip';

    let clazz
    export {clazz as class};
</script>
<Wrapper class={clazz}>
    <span class="material-icons">information</span>
    <Tooltip xPos="center">
        <slot>Tooltip</slot>
    </Tooltip>
</Wrapper>