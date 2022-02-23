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
    import {Auth, loginStatus} from "../../components/auth/userStores";
    import {field, form} from 'svelte-forms';
    import {email, matchField, min, pattern, required} from 'svelte-forms/validators'
    import Select, {Option} from '@smui/select';
    //make page only visible if logged out - otherwise redirect to index-page
    onMount(() => {
        if ($loginStatus) {
            $goto("/")
        }
    });
    const first_name_field = field('first_name', '', []);
    const last_name_field = field('last_name', '', []);
    const email_field = field('email', '', [required(), email()]);
    const phone_field = field('phone', '', [required(), pattern(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ // can start with +, 3 numbers, dash or not, 3 numbers, dash or not, 4-6 numbers
    )]);
    const password_field = field('password', '', [required()]);
    const password_check_field = field('password_check', '', [required(), matchField(password_field)])
    const company_field = field('company', '', []);
    const street_field = field('street', '', []);
    const street_number_field = field('street_number', '', []);
    const postal_code_field = field('postal_code', '', []);
    const city_field = field('city', '', []);
    const location_count_field = field("location_count", 1, [min(1)]);
    const register_field = field("invoicing_system", '', []);
    const agree_field = field("agree", false, [required()])
    let register_field_select = "ready2order";
    let register_field_temp_value = "";
    const register_form = form(first_name_field, last_name_field, email_field, phone_field,
        company_field, password_field, password_check_field,
        street_field, street_number_field, postal_code_field, city_field, location_count_field, register_field,
        agree_field);


    async function sendSignup() {
        await register_form.validate()
        if ($register_form.valid)
            Auth.register(register_form.summary()).then(() => {
                $goto("./success")
            }).catch((er) => {
                console.log(er)
                $goto("./error/[er]", {er: encodeURIComponent(JSON.stringify(er))})
            })
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

    $:{
        $register_field.value =
            register_field_select !== "helloCash" && register_field_select !== "ready2order" ? register_field_temp_value : register_field_select
    }

</script>

<div in:fade>
    <Paper elevation={1}>
        <Title><h1 class="text-2xl my-6">Registrieren</h1></Title>
        <Content>
            <form class="grid grid-cols-1 md:grid-cols-2 md:gap-8"
                  on:submit|preventDefault={sendSignup}>
                <div class="w-full">
                    <Textfield bind:value={$first_name_field.value} class="w-full" label="Vorname" type="name">
                        <HelperText slot="helper"
                        >Wie dürfen wir Sie ansprechen?
                        </HelperText
                        >
                    </Textfield>
                    <Textfield bind:value={$last_name_field.value} class="w-full" label="Name" type="name">
                        <HelperText slot="helper"
                        >Wie dürfen wir Sie ansprechen?
                        </HelperText
                        >
                    </Textfield>
                    <Textfield bind:value={$email_field.value} class="w-full"
                               invalid={$register_form.hasError("email.required")||$register_form.hasError("email.email")}
                               label="E-Mail"
                               required
                               type="email">
                        <HelperText slot="helper">Ihre E-Mail-Adresse</HelperText>
                    </Textfield>
                    <Textfield bind:value={$phone_field.value} class="w-full" label="Telefon" required type="phone"
                               invalid={$register_form.hasError("phone.required")}>
                        <HelperText slot="helper"
                        >Damit wir Sie ggf. erreichen können, 10-12 Ziffern, +49 und - sind erlaubt
                        </HelperText
                        >
                    </Textfield>
                    <Textfield bind:value={$password_field.value} class="w-full"
                               invalid={$register_form.hasError("password.required")}
                               label="Passwort"
                               required
                               type="password">
                        <HelperText slot="helper"
                        >Mindestens 8 Zeichen, 1 Buchstabe und eine Zahl
                        </HelperText
                        >
                    </Textfield>
                    <Textfield bind:value={$password_check_field.value} class="w-full"
                               invalid={$register_form.hasError("password_check.required")||$register_form.hasError("password_check.match_field")}
                               label="Passwort Bestätigung"
                               required
                               type="password">
                        <HelperText slot="helper"
                        >Mindestens 8 Zeichen, 1 Buchstabe und eine Zahl
                        </HelperText
                        >
                    </Textfield>
                </div>
                <div>
                    <Textfield bind:value={$company_field.value} class="w-full" label="Firma" type="text">
                        <HelperText slot="helper"
                        >Name Ihrer Firma
                        </HelperText>
                    </Textfield>
                    <div class="grid-cols-1 md:grid-cols-2 grid md:gap-8">
                        <div>
                            <Textfield bind:value={$street_field.value} class="w-full" label="Straße" type="text">
                                <HelperText slot="helper"
                                >In welcher Straße befindet sich ihr Geschäft?
                                </HelperText
                                >
                            </Textfield>
                        </div>
                        <div>
                            <Textfield bind:value={$street_number_field.value} class="w-full" label="Hausnummer"
                                       type="text">
                                <HelperText slot="helper"
                                >Welche Hausnummer hat ihr Geschäft?
                                </HelperText
                                >
                            </Textfield>
                        </div>
                    </div>
                    <div class="grid-cols-1 md:grid-cols-2 grid md:gap-8">
                        <div>
                            <Textfield bind:value={$postal_code_field.value} class="w-full" label="Postleitzahl"
                                       type="text">
                                <HelperText slot="helper"
                                >Postleitzahl des Geschäfts.
                                </HelperText
                                >
                            </Textfield>
                        </div>

                        <div>
                            <Textfield bind:value={$city_field.value} class="w-full" label="Ort" type="text">
                                <HelperText slot="helper"
                                >In welchem Ort befindet sich ihr Geschäft?
                                </HelperText
                                >
                            </Textfield>
                        </div>
                    </div>

                    <Textfield bind:value={$location_count_field.value} class="w-full" label="Anzahl Filialen"
                               type="number">
                        <HelperText slot="helper"
                        >Fialenanzal
                        </HelperText>
                    </Textfield>
                    <Select bind:value={register_field_select} class="w-full" label="Kassensystem">
                        <Option value={"ready2order"}>ready2order</Option>
                        <Option value={"helloCash"}>helloCash</Option>
                        <Option value={"custom"}>Anderes..</Option>
                    </Select>
                    {#if register_field_select !== "helloCash" && register_field_select !== "ready2order"}
                        <Textfield bind:value={register_field_temp_value} class="w-full" label="Kassensystem"
                                   type="text">
                            <HelperText slot="helper"
                            >Welches Kassensystem verwenden Sie?
                            </HelperText>
                        </Textfield>
                    {/if}
                </div>


                <div class="md:col-span-2 flex flex-col gap-4">
                    <FormField>
                        <Checkbox bind:checked={$agree_field.value} input$required/>
                        <span slot="label">
					Ich stimme zu, dass foodsight mich per E-Mail und Telefon
					zwecks Onboarding kontaktiert.
				</span>
                    </FormField>
                    <br/>
                    <Button
                            class="w-full"
                            disabled={!$register_form.valid}
                            on:click={sendSignup}
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