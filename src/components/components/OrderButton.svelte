<script lang="ts">
    import Button, {Group, GroupItem, Icon, Label} from '@smui/button';
    import Menu, {MenuComponentDev} from '@smui/menu';
    import List, {Item, Text} from '@smui/list';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    let mode = "";
    let menu: MenuComponentDev;

    function order(option) {
        dispatch("click", option)
    }
</script>

<Group variant="raised">
    <Button on:click={() => {order("pdf")}} variant="raised">
        <Label>Order as PDF</Label>
    </Button>
    <div use:GroupItem>
        <Button
                on:click={() => menu.setOpen(true)}
                style="padding: 0; min-width: 36px;"
                variant="raised"
        >
            <Icon class="material-icons" style="margin: 0;">arrow_drop_down</Icon>
        </Button>
        <Menu anchorCorner="TOP_LEFT" bind:this={menu}>
            <List>
                <Item on:SMUI:action={() => order("xlsx")}>
                    <Text>Excel</Text>
                </Item>
                <Item on:SMUI:action={() => order("csv")}>
                    <Text>CSV</Text>
                </Item>
            </List>
        </Menu>
    </div>
</Group>