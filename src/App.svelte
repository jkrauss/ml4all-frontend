<script>
    import {Router} from "@roxi/routify";
    import {routes} from "../.routify/routes";
    import "./global.css"
    import {Auth, User} from "./components/auth/userStores";

    $:console.log($User, $Auth)
</script>

<!--<Serviceworker/>-->
<Router {routes}/>