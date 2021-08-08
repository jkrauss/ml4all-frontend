
# ml4all frontend

This is the frontend for a service that helps reduce foodwaste by producing accurate sales-forecasts

It is built using 
- https://svelte.dev/
- https://github.com/vincjo/svelte-simple-datatables
- https://sveltematerialui.com/

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd ml4all-frontend
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.
\
&nbsp;
\
&nbsp;
\
&nbsp;

## What you can do for me

__(I will build out / adopt required endpoints in the next 3 days)__

- TODO: BUG: On a small device like iPhone SE / when the table is longer than the page: no scrollbars are available to scroll the table
- TODO: BUG: When I click an entry in the main/burger-menu, the menu disappears and re-appears again. It should not re-appear.
- TODO: BUG: I have introduced a "demo-mode" - when no-one is logged in the app is still functional and shows demo-data
  - However, after a login the DataTable doesn't update, neither does it after a logout. Same should happen to the user-settings.
  - On every logout the user-settings must be replaced by demo-settings. And on every login, the user-settings must be replaced with live-data
- TODO: BUG: On first load on a small device e.g. IPhone in vertical mode "Vorschlag" is not shown - this is correct
  - When I switch to horizontal mode, "Vorschlag" disappears - but shouldn't
  - When I switch back to vertical mode, "Vorschlag" re-appears - but now it should actually disappear
- TODO: The app-name in the browser-tab must me "ml4all" not "Svelte App"
- TODO: BUG: When the token of the user expires, the user should be logged off automatically.
  - (I have set token expiration-duration to two minutes on the backend to ease testing)
- TODO: When the window is big enough the app should show username next to login/out-icon in the app-bar
  - When no user is logged in it should display "DEMO" instead
- TODO: Read the url-part for reading data/token from backend from the "userSetting.json" that I put into /public folder
- TODO: Build a settings-page that is shown, when clicking "Einstellungen" in the menu
  - Display some contents from "userSettings.json"
  - "logged_in_user" , display-name: "angemeldete/r BenutzerIn" // read and write the logged-in username
  - "register_plugin" , display-name: "Kassensystem"
  - "country" , display-name: "Land"
  - "state" , display-name: "Bundesland"
  - "city" , display-name: "Stadt"
  - "store_name" , display-name: "Standort"
  - "rows_per_page", display-name: "Zeilen pro Seite" - controls the Foodtable
  - __Now a section with heading "Vorhersage anzeigen"__
  - Use three SMUI-switches (https://sveltematerialui.com/demo/switch/), that read/write the following 3 properties
  - "tomorrow" , display-name: "Morgen"
  - "day_after_tomorrow" , display-name "Übermorgen"
  - "next_seven_days" , display-name "Nächste 7 Tage"
  - This section should control which forecasts should be displayed in the table, see the updated tableDataNew.json
  - (I still need to update the api-endpoint)
  - Rename and replace old tableData.json when done
  - If the screen-width is big, allow all three switches to be turned on, otherwise only one switch.
  - If the screen is big but the window small, display only up to 3x order_qty and hide order_range
  - __Whenever a value in userSetting.json changes, send it to settings_url__
  - (I still need to build this endpoint)
- TODO: Add a material-icon `report_problem` to the top-app-bar. 
  - on click
    - take a screenshot
    - open a modal that allows entering a text "Problem beschreiben" and a "Senden"-button
      - send screenshot and text to "problem_url" from userSettings.json
      - (I still need to build this endpoint)
      - After sending say "Dankeschön, wir kümmern uns schnellstmöglich darum."
- TODO: Make the logo / little robot react like a button (brings user back to home-page)
