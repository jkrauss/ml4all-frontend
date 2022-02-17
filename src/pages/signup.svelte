<script>
    import Paper, {Content, Title} from "@smui/paper";
    import Button, {Label} from "@smui/button";
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';

    import FormField from "@smui/form-field";
    import Checkbox from "@smui/checkbox";
    import {goto} from "@roxi/routify";
    import {fade} from "svelte/transition";

    import {onMount} from 'svelte';
    import {loginStatus} from "../components/auth/userStores";

    //make page only visible if logged out - otherwise redirect to index-page
    onMount(() => {
        if ($loginStatus) {
            $goto("/")
        }
    });

    let prename = "";
    let name = "";
    let email = "";
    let phone = "";
    let company = "";
    let location = "";
    let register = "";
    let agree = null;
    let street = "";
    let streetNumber = "";
    let city = "";
    let postalcode = "";
    let locationCount = "";

    async function sendSignup() {
        /* let payload = {
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
         );*/
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
            <form class="grid grid-cols-1 md:grid-cols-2 md:gap-8"
                  on:submit|preventDefault={sendSignup}>
                <div class="w-full">
                    <Textfield bind:value={prename} class="w-full" label="Vorname" type="name">
                        <HelperText slot="helper"
                        >Wie dürfen wir Sie ansprechen?
                        </HelperText
                        >
                    </Textfield>
                    <Textfield bind:value={name} class="w-full" label="Name" type="name">
                        <HelperText slot="helper"
                        >Wie dürfen wir Sie ansprechen?
                        </HelperText
                        >
                    </Textfield>
                    <Textfield bind:value={email} class="w-full" label="E-Mail" required type="email">
                        <HelperText slot="helper">Gültige E-Mail-Adresse</HelperText>
                    </Textfield>
                    <Textfield bind:value={phone} class="w-full" label="Telefon" required type="phone">
                        <HelperText slot="helper"
                        >Benötigt z.B. wenn Sie ihr Passwort nicht mehr wissen
                        </HelperText
                        >
                    </Textfield>
                </div>
                <div>
                    <Textfield bind:value={company} class="w-full" label="Firma" type="text">
                        <HelperText slot="helper"
                        >Name Ihrer Firma
                        </HelperText>
                    </Textfield>
                    <div class="grid-cols-1 md:grid-cols-2 grid md:gap-8">
                        <div>
                            <Textfield bind:value={street} class="w-full" label="Straße" type="text">
                                <HelperText slot="helper"
                                >In welcher Straße befindet sich ihr Geschäft?
                                </HelperText
                                >
                            </Textfield>
                        </div>

                        <div>
                            <Textfield bind:value={streetNumber} class="w-full" label="Hausnummer" type="text">
                                <HelperText slot="helper"
                                >Welche Hausnummer hat ihr Geschäft?
                                </HelperText
                                >
                            </Textfield>
                        </div>

                    </div>
                    <div class="grid-cols-1 md:grid-cols-2 grid md:gap-8">
                        <div>
                            <Textfield bind:value={postalcode} class="w-full" label="Postleitzahl" type="text">
                                <HelperText slot="helper"
                                >Postleitzahl des Geschäfts.
                                </HelperText
                                >
                            </Textfield>
                        </div>

                        <div>
                            <Textfield bind:value={city} class="w-full" label="Ort" type="text">
                                <HelperText slot="helper"
                                >In welchem Ort befindet sich ihr Geschäft?
                                </HelperText
                                >
                            </Textfield>
                        </div>
                    </div>

                    <Textfield bind:value={locationCount} class="w-full" label="Fialenanzahl" type="text">
                        <HelperText slot="helper"
                        >Fialenanzal
                        </HelperText>
                    </Textfield>

                    <Textfield bind:value={register} class="w-full" label="Kassensystem" type="text">
                        <HelperText slot="helper"
                        >Welches Kassensystem verwenden Sie?
                        </HelperText>
                    </Textfield>
                </div>


                <div class="md:col-span-2 flex flex-col gap-4">
                    <FormField>
                        <Checkbox bind:checked={agree} input$required/>
                        <span slot="label">
					Ich stimme zu, dass foodsight mich per E-Mail und Telefon
					zwecks Onboarding kontaktiert.
				</span>
                    </FormField>
                    <br/>
                    <Button
                            class="w-full"
                            style="background: {'var(--mdc-theme-callout)'}"
                            type="submit"
                            variant="raised"
                    >
                        <Label>Absenden</Label>
                    </Button>
                </div>
            </form>
        </Content>
    </Paper>
    <br/>
    <Paper elevation={1}>
        <Content>
            <div class="flex flex-col justify-center items-center gap-2 w-full h-full">
                oder
                <Button class="w-full md:w-auto" on:click={() => $goto("/login")} variant="raised">
                    <Label>Login</Label>
                </Button>
            </div>
        </Content>
    </Paper>
</div>

<style>
    Textfield {
        @apply w-full;
    }
</style>