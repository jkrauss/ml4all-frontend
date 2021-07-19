
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
- Create a login/logout / forgot password form and flow
  - see App.svelte row 34 and 51
  - see https://foodsight.azurewebsites.net/docs for a working prototype
    - it's a standard oauth2-username/password-flow
    - click GET api/forecast/, click "Try it out", enter store-id=2, you get a return "not authenticated"
    - click "Authorize" in the top-right corner
    - login with "johndoe" "secret"
    - now you can retrieve table-data
    - the client needs to retrieve a token from https://foodsight.azurewebsites.net/token by submitting username and passsword in a form-request
      - all other fields are unneccessary at the moment
    - save the token in the browser-data and submit it with every subsequent request in an authentication-header
- The built version somehow doesn't get the complete styling
    - compare results of `npm run dev` and `npm run build` / `npm run start`
    - font, round corners, ... missing
- make the "search"-field and the pagination-elements align / grow / shrink with the DataTable