import React, { Component } from 'react';
import Measure from 'react-measure';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FullWidthSelection from './FullWidthSelection.js';
import {muiTheme} from './Styles'

class App extends Component {

render(){

return(
<FullWidthSelection>
<Card>
<CardHeader
titleStyle={muiTheme.headerTitle} title="Om Sykdomspulsen"
subtitleStyle={muiTheme.subheaderTitle} subtitle="Sist oppdatert: 15.08.2017"
/>
<CardText style = {muiTheme.text}>
<p>Sykdomspulsen til kommunehelsetjenesten er et pilotprosjekt som ble lansert 15.08.2017.</p>
<p>I pilotprosjektet har utvalgte fylkes- og kommuneleger fått tilgang til denne websiden for å gi tilbakemelding om behov og brukervennlighet.</p>
<p>Sykdomspulsen er et overvåkningssystem basert på diagnosekoder (ICPC-2 koder) satt på legekontor og legevakter i hele Norge. Formålet med Sykdomspulsen er å se trender og utbredelse av smittsomme sykdommer slik at utbrudd oppdages så tidlig som mulig. I tillegg kan overvåkningen brukes til å iverksette folkehelsetiltak og se effekt av tiltak.</p>
<p>Diagnosekoder som registreres hos lege eller legevakt sendes til Helsedirektoratet som en del av legenes refusjonskrav (KUHR-systemet*). Folkehelseinstituttet mottar daglig oppdatert KUHR-data til Sykdomspulsen. Dataene er anonyme uten pasientidentifikasjon, men med informasjon om kjønn, aldersgruppe, konsultasjonsdato og sted for konsultasjon.</p>
<p>Dataene blir bearbeidet og quasiposson regresjon blir brukt for å detektere forhøyet forekomst av en sykdom/syndrom. Dette er basert på de foregående 5 årene i det samme geografiske området. På denne måten kan antall faktiske konsultasjoner bli identifisert som forventet, høyere enn forventet eller mye høyere enn forventet.</p>
<p>*KUHR-systemet: Regninger for all behandling som utføres utenfor sykehus sendes til HELFO for utbetaling og kontroll (legenes refusjonskrav).</p>
</CardText>
</Card>


<br/>

<Card>
<CardHeader
titleStyle={muiTheme.headerTitle} title="Fargekoder"
subtitleStyle={muiTheme.subheaderTitle} subtitle="Sist oppdatert: 15.08.2017"
/>
<CardText style = {muiTheme.text}>
<p>Grønne felt betyr at antall konsultasjoner ikke er høyere enn forventet i forhold til Sykdommen/Symptomet, Tid, Alder og Geografisk nivå.</p>
<p>Gule felt betyr at antall konsultasjoner er høyere enn forventet i forhold til Sykdommen/Symptomet, Tid, Alder og Geografisk nivå.</p>
<p>Røde felt betyr at antall konsultasjoner er betydelig høyere enn forventet i forhold til Sykdommen/Symptomet, Tid, Alder og Geografisk nivå.</p>
</CardText>
</Card>

<br/>

<Card>
<CardHeader
titleStyle={muiTheme.headerTitle} title="Kontakt oss"
subtitleStyle={muiTheme.subheaderTitle} subtitle="Sist oppdatert: 15.08.2017"
/>
<CardText style = {muiTheme.text}>
<p>Gry M Grøneng er prosjektleder og Richard White er statistiker og webansvarlig for Sykdomspulsen. Hvis du har spørsmål eller ris/ros til websiden ta kontakt med oss på mailadresse: sykdomspulsen@fhi.no</p>
</CardText>
</Card>

</FullWidthSelection>
    );
  }
}

export default App;

//export default App;

