<script>
  import { modal, user } from "../stores.js";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import Img from "@smui/common/Img.svelte";
  import Button, { Icon } from "@smui/button";
  import Menu from "@smui/menu";
  import List, { Item, Separator, Text } from "@smui/list";
  import Login from "../auth/login.svelte";
  import Wrapper from "@smui/tooltip/Wrapper.svelte";
  import Tooltip from "@smui/tooltip/Tooltip.svelte";

  let menu;
  let burger;
  let clicked = "nothing yet";

  function auth() {
    if ($user) {
      localStorage.removeItem("auth");
      $user = undefined;
    } else {
      $modal.title = "Login";
      $modal.component = Login;
    }
  }
</script>

<header>
  <TopAppBar variant="static">
    <Row>
      <Section>
        <Icon
          component={Img}
          style="height: 48px; width: 48px;"
          src="https://raw.githubusercontent.com/hperrin/svelte-material-ui/master/site/static/logo.png"
        />
        <Title>ml4all</Title>
      </Section>
      <Section align="end">
        <Wrapper>
          <IconButton class="material-icons" on:click={auth}
            >{#if $user}account_circle{:else}login{/if}
            <!--
						form: login (if not logged in), logout (if logged in), forgot password (if not logged in)
					-->
          </IconButton>
          <Tooltip
            >{#if $user}Logout{:else}Login{/if}</Tooltip
          >
        </Wrapper>
        <IconButton
          class="material-icons"
          on:click={() => menu.setOpen(true)}
          bind:id={burger}
          >menu
          <Menu
            bind:this={menu}
            bind:anchorElement={burger}
            anchorCorner="TOP_RIGHT"
          >
            <List>
              <Item on:SMUI:action={() => (clicked = "Cut")} on:click={auth}>
                <Text
                  >{#if $user}Logout{:else}Login{/if}</Text
                >
                <!--
									form: login (if not logged in), logout (if logged in), forgot password (if not logged in)
								-->
              </Item>
            </List>
          </Menu>
        </IconButton>
      </Section>
    </Row>
  </TopAppBar>
</header>
