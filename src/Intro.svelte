<script>
	import Paper, { Title, Content } from '@smui/paper';
</script>

<Paper elevation={1}>
	<Title><h1 class="text-2xl my-6">Los gehts!</h1></Title>
	<Content>
        Willkommen bei foodsight - der App die es ganz leicht macht, den Einkauf perfekt zu planen. <br /><br />
        Foodsight sagt genau voraus, wieviel von welchem Produkt Du verkaufen wirst - morgen, übermorgen und in den nächsten 7 Tagen. <br />
        Du bekommst einen Bereich von-bis angezeigt, in dem Dein Absatz liegen wird. 
        Mit dieser Information kannst Du ganz einfach Deine Einkaufsplanung erstellen. <br /><br />

        Im Menü rechts oben findest Du folgende Optionen:<br /><br />
        <ul>
            <li>
                • Login / Logout
                <p style="margin-left: 50px">Solange Du nicht angemeldet bist, läuft die App im Demo-Modus mit Beispieldaten</p>
            </li><br />
            <li>
                • Los gehts<br />
                <p style="margin-left: 50px">Diese Einführung</p>
            </li><br />
            <li>
                • Planung
                <p style="margin-left: 50px">
                    Schau die den erwarteten Absatz an und plane Deine Bestellmengen.<br />
                    Wenn Du fertig bist, klicke unten auf "Bestellen". Du kannst Deine Bestell-Liste in drei Formaten abrufen - als Excel, csv oder pdf.
                </p>
            </li><br />
            <li>
                • Einstellungen
                <p style="margin-left: 50px">
                    Im oberen Teil siehst Du auf welcher Basis Deine Absätze vorhergesagt werden. Bitte lass uns wissen, wenn etwas nicht stimmt.<br />
                    Unten kannst Du einstellen, welche Planung Du gerade machen möchtest: Morgen, übermorgen oder nächste 7 Tage.
                </p>
            </li><br />
            <li>
                • Idee/Problem
                <p style="margin-left: 50px">
                    Foodsight ist ganz neu. Wenn Dir irgendwas auffällt, was besser sein könnte oder Du Ideen hast - bitte lass es uns wissen!<br />
                    Du kannst auf jeder Seite den Briefumschlag oben im Menü drücken, ein Bildschirmfoto machen und Dein Anliegen beschreiben. <br />
                    Absenden - wir kümmern uns darum.
                </p>
            </li><br />
        </ul>

    </Content>
</Paper>