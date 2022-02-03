<script>
    import Paper, {Content, Title} from "@smui/paper";
    import Button, {Icon, Label} from "@smui/button";
    import Textfield from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text/index";

    import FormField from "@smui/form-field";
    import Checkbox from "@smui/checkbox";
    import {backendURL, modal, notification} from "../components/stores";
    import axios from "axios";
    import {goto, redirect} from "@roxi/routify";
    import {fade} from "svelte/transition";

    import {onMount} from 'svelte';
    import {loginStatus} from "../components/auth/userStores";

    //make page only visible if logged out - otherwise redirect to index-page
    onMount(() => {
        if ($loginStatus) {
            $redirect("/")
        }
    });

    let name = "";
    let email = "";
    let phone = "";
    let password = "";
    let location = "";
    let register = "";
    let agree = null;

    async function sendSignup() {
        let payload = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            location: location,
            register_type: register,
            agree: agree,
        };
        axios.post(`${backendURL}/api/signup`, payload).then(
            (response) => {
                $notification = {
                    text: "Danke! Ihre Registrierung ist eingegangen. Wir melden uns in Kürze bei Ihnen.",
                    bg: "var(--mdc-theme-callout);",
                    color: "var(--mdc-theme-on-primary);",
                };
                setTimeout(() => {
                    $notification = undefined;
                    $modal = {};
                    $goto("/");
                }, 5000);
            },
            () => {
                $notification = {
                    text: "Leider ist etwas schiefgegangen. Bitte kontaktieren Sie uns unter support@ml4all.com",
                    bg: "var(--mdc-theme-callout);",
                    color: "var(--mdc-theme-on-primary);",
                };
                setTimeout(() => {
                    $notification = undefined;
                    $modal = {};
                }, 5000);
            }
        );
    }

    let pwdIcon = "visibility";
    let pwdType = "password";

    function togglePwd() {
        if (pwdIcon === "visibility") {
            pwdIcon = "visibility_off";
            pwdType = "text";
        } else {
            pwdIcon = "visibility";
            pwdType = "password";
        }
    }

    let pattern = ".{12,}";
</script>

<div in:fade>
    <Paper elevation={1}>
        <Title><h1 class="text-2xl my-6">Registrieren</h1></Title>
        <Content>
            <form on:submit|preventDefault={sendSignup}>
                <Textfield bind:value={name} label="Name" type="name">
                    <HelperText slot="helper"
                    >Wie dürfen wir Sie ansprechen?
                    </HelperText
                    >
                </Textfield>
                <Textfield bind:value={email} label="E-Mail" required type="email">
                    <HelperText slot="helper">Gültige E-Mail-Adresse</HelperText>
                </Textfield>
                <Textfield bind:value={phone} label="Telefon" required type="phone">
                    <HelperText slot="helper"
                    >Benötigt z.B. wenn Sie ihr Passwort nicht mehr wissen
                    </HelperText
                    >
                </Textfield>
                <Textfield
                        bind:value={password}
                        input$pattern={pattern}
                        label="Passwort"
                        required
                        style="width:200px"
                        type={pwdType}
                >
                    <Icon
                            class="material-icons"
                            on:click={() => togglePwd()}
                            slot="trailingIcon">{pwdIcon}</Icon
                    >
                    <HelperText slot="helper"
                    >Mind.12 Zeichen, Buchstaben, Zahlen, Sonderzeichen
                    </HelperText
                    >
                </Textfield>
                <Textfield bind:value={location} label="Standort" type="text">
                    <HelperText slot="helper"
                    >Wo befindet sich Ihr (erstes) Geschäft?
                    </HelperText
                    >
                </Textfield>
                <Textfield bind:value={register} label="Kassensystem" type="text">
                    <HelperText slot="helper"
                    >Welches Kassensystem verwenden Sie?
                    </HelperText
                    >
                </Textfield>
                <FormField>
                    <Checkbox bind:checked={agree} input$required/>
                    <span slot="label">
					Ich stimme zu, dass foodsight mich per E-Mail und Telefon
					zwecks Onboarding kontaktiert.
				</span>
                </FormField>
                <br/>
                <Button
                        style="background: {'var(--mdc-theme-callout)'}"
                        type="submit"
                        variant="raised"
                >
                    <Label>Absenden</Label>
                </Button>
            </form>
        </Content>
    </Paper>
</div>