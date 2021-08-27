<script>
	import Paper, { Title, Content } from '@smui/paper';
    import Button, { Label, Icon } from "@smui/button";
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text/index';

	import FormField from '@smui/form-field';
	import Checkbox from '@smui/checkbox';
	import {
		backendURL,
		mainContent,
		modal,
		notification,
	} from "./stores";
	import axios from "axios";

	let name = '';
	let email = '';
	let phone = '';
	let password = '';
	let location = '';
	let register = '';
	let agree = null

	function sendSignup(){
		let payload = {
			"name":name,
			"email":email,
			"phone":phone,
			"password":password,
			"location":location,
			"register":register,
			"agree":agree
		}
		console.log(payload);
		$notification = {
						text: "Danke! Ihre Registrierung ist eingegangen. Wir melden uns in Kürze bei Ihnen.",
						bg: "var(--mdc-theme-callout);",
						color: "var(--mdc-theme-on-primary);",
					};
					setTimeout(() => {
						$notification = undefined;
					}, 5000);
					$mainContent = "settings";
	}

	let pwdIcon = "visibility";
	let pwdType = "password";
	function togglePwd(){
		if (pwdIcon === "visibility"){
			pwdIcon = "visibility_off";
			pwdType = "text";
		}
		else {
			pwdIcon = "visibility";
			pwdType = "password";
		}
	}

	let pattern = ".{12,}"
</script>

<Paper elevation={1}>
	<Title><h1 class="text-2xl my-6">Registrieren</h1></Title>
	<Content>
		<form on:submit|preventDefault={sendSignup}>
		<Textfield 
			bind:value={name} 
			label="Name"
			type="name"
		>
			<HelperText slot="helper">Wie dürfen wir Sie ansprechen?</HelperText>
		</Textfield>
		<Textfield 
			bind:value={email} 
			label="E-Mail"
			type="email"
			required
		>
			<HelperText slot="helper">Gültige E-Mail-Adresse</HelperText>
		</Textfield>
		<Textfield 
			bind:value={phone} 
			label="Telefon"
			type="phone"
			required
		>
			<HelperText slot="helper">Benötigt z.B. wenn Sie ihr Passwort nicht mehr wissen</HelperText>
		</Textfield>
		<Textfield 
			bind:value={password} 
			label="Passwort"
			type="{pwdType}"
			required
			input$pattern={pattern}
			style="width:200px"
		>
			<Icon class="material-icons" slot="trailingIcon" on:click={() => togglePwd()}>{pwdIcon}</Icon>
			<HelperText slot="helper">Mind.12 Zeichen, Buchstaben, Zahlen, Sonderzeichen</HelperText>
		</Textfield>
		<Textfield 
			bind:value={location} 
			label="Standort"
			type="text"	
		>
			<HelperText slot="helper">Wo befindet sich Ihr (erstes) Geschäft?</HelperText>
		</Textfield>
		<Textfield 
			bind:value={register} 
			label="Kassensystem"
			type="text"
		>
			<HelperText slot="helper">Welches Kassensystem verwenden Sie?</HelperText>
		</Textfield>
		<FormField>
			<Checkbox bind:checked={agree} input$required/>
			<span slot="label">
			  Ich stimme zu, dass foodsight mich per E-Mail und Telefon zwecks Onboarding kontaktiert.
			</span>
		  </FormField>
		  <br />
		<Button 
			variant="raised"
			style="background: {"var(--mdc-theme-callout)"}"   
			type="submit"   
		>
			<Label>Absenden</Label>
		</Button>
	</form>
    </Content>
</Paper>