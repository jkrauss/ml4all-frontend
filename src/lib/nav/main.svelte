<script>
  import { modal, user, mainContent } from "../stores.js";
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
    if ($user && Object.keys($user).length) {
      localStorage.removeItem("auth");
      $user = {};
    } else {
      $modal.title = "Login";
      $modal.component = Login;
    }
    // after every login or logout set the main content to show the table
    // "https://raw.githubusercontent.com/hperrin/svelte-material-ui/master/site/static/logo.png"
    $mainContent = "table";
  }
  function settings(){
    console.log('settings clicked')
    menu.setOpen(false)
    $mainContent = "settings";
  }
</script>

<header>
  <TopAppBar variant="static">
    <Row>
      <Section
        on:click={() => $mainContent="table"}
      >
      <Wrapper>
          <Icon
          component={Img}
          style="height: 48px; width: 48px;"
          src="logo.png"
        />
        <Title>ml4all</Title>
        <Tooltip>Hauptseite</Tooltip>
      </Wrapper>
      </Section>
      <Section align="end">
        <Wrapper>
          <IconButton class="material-icons" on:click={auth}
            >{#if $user && Object.keys($user).length}logout{:else}login{/if}
            <!--
						form: login (if not logged in), logout (if logged in), forgot password (if not logged in)
					-->
          </IconButton>
          <Tooltip
            >{#if $user && Object.keys($user).length}Logout{:else}Login{/if}</Tooltip
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
              <Item on:SMUI:action={() => (menu.setOpen(false))} on:click={auth}>
                <Text
                  >{#if $user && Object.keys($user).length}Logout{:else}Login{/if}</Text
                >
                <!--
									form: login (if not logged in), logout (if logged in), forgot password (if not logged in)
								-->
              </Item>
              <Item on:SMUI:action={() => (menu.setOpen(false))} on:click={() => ($mainContent = "settings")} >
                <Text
                  >Einstellungen</Text
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
