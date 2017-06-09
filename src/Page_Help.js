import React, { Component } from 'react';
import Measure from 'react-measure';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FullWidthSelection from './FullWidthSelection.js';
import {styles} from './Styles'

class App extends Component {

render(){

return(
<FullWidthSelection>
<Card>
<CardHeader
titleStyle={styles.headerTitle} title="Om Sykdomspulsen"
subtitleStyle={styles.subheaderTitle} subtitle="Sist oppdatert: 15.08.2017"
/>
<CardText style = {styles.text}>
<p>Sykdomspulsen er et overvåkningssystem basert på diagnosekoder (ICPC-2 koder) satt på legekontorer og legevakter i hele Norge. Formålet med Sykdomspulsen er å se trender og udbredelse av smittsomme sykdommer slik at utbrudd oppdages så tidlig som mulig. I tillegg kan overvåkningen brukes til å iverksette folkehelsetiltak og se effekt av tiltak.</p>
<p>Diagnosekoder som registreres hos lege eller legevakt sendes til Helsedirektoratet som en del av legenes refusjonskrav (KUHR-systemet*). Folkehelseinstituttet mottar daglig oppdatert KUHR-data til Sykdomspulsen. Dataene er anonyme uten pasientidentifikasjon, men med informasjon om kjønn, aldersgruppe, konsultasjonsdato og sted for konsultasjon.</p>
<p>Dataene blir bearbeidet og quasiposson regresjon blir brukt for å detektere forhøyet forekomst av et spesifikt syndrom. Dette er basert på de foregående 5 årene i det samme geografiske området. På denne måten kan antall faktiske konsultasjoner bli identifisert som forventet, høyere enn forventet eller mye høyere enn forventet.</p>
<p>Selv om dataene noen ganger viser seg å ligge i området høyere enn forventet eller mye høyere enn forventet trenger dette ikke å være noen grunn til bekymring. Resultatene blir undersøkt av leger og epidemiologer på Folkehelseinstituttet og i kommunene.</p>
<p>Dersom du ønsker mer informasjon om Sykdosmspulsen kan du kontakte Gry M Grøneng eller Richard White på mailadressene: GryMarysol.Groneng@fhi.no og Richard.White@fhi.no.</p>
<p>*KUHR-systemet: Regninger for all behandling som utføres utenfor sykehus sendes til HELFO for utbetaling og kontroll (legenes refusjonskrav).</p>
</CardText>
</Card>


<br/>

<Card>
<CardHeader
titleStyle={styles.headerTitle} title="Oversikt"
subtitleStyle={styles.subheaderTitle} subtitle="Sist oppdatert: 15.08.2017"
/>
<CardText style = {styles.text}>
<p>Tabellen viser en oversikt over forekomsten av sykdom/symptom i et valgt tidsrom.</p>
<p>Valg av tidsrom gjøres på tidslinje nederst på siden. Valg av sykdom/symptom gjøres på venstre side. På venstre side kan man også velge Norge eller et fylke i Norge. Hvis man velger Norge vil hvert fylke få en rad i tabellen. Hvis man velger et fylke vil alle kommunene i valgte fylke få en rad i tabellen.</p>
<p>Dersom ruten for en gitt uke er farget med grønn farge betyr det at antall konsultasjoner i den gitte kommunen eller fylket er som forventet denne uken. En gul farge en gitt uke betyr at antall konsultasjoner i den gitte kommunen eller fylket er høyere enn forventet denne uken. En rød farge en gitt uke betyr at antall konsultasjoner i den gitte kommunen eller fylket er betydelig høyere enn forventet denne uken.</p>
<p>Fargene er laget ut fra beregninger fra de foregående 5 årene i fylke eller kommunen.</p>
</CardText>
</Card>

</FullWidthSelection>
    );
  }
}

export default App;

//export default App;

