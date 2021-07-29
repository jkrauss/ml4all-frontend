<script>
  import { modal, user } from "../stores.js";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import Img from "@smui/common/Img.svelte";
  import Button, { Icon } from "@smui/button";
  import Menu from "@smui/menu";
  import List, { Item, Separator, Text } from "@smui/list";
  import Login from "../auth/login.svelte";

  let menu;
  let burger;
  let login = "Login";
  let clicked = "nothing yet";

  function auth() {
    if ($user) {
      $user = undefined;
      localStorage.getItem("auth");
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
        <IconButton class="material-icons" on:click={auth}
          >account_circle
          <!--
						form: login (if not logged in), logout (if logged in), forgot password (if not logged in)
					-->
        </IconButton>
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
                <Text>{login}</Text>
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
