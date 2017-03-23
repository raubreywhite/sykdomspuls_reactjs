import React, { Component } from 'react';
import Measure from 'react-measure';

class App extends Component {

  render(){

var styleWrap = {
    margin: '0px',
    padding: '20px',
    background: '#fff',
    overflow: 'hidden'
};

var styleMainSingle = {
    margin: '0 0px 0 auto',
    width: '100%',
    float: 'right',
    background: '#fff',
    minHeight: '100px',
};
    return(
<div>
<section id="help">
<div className="container">
<div className="column10 prefix1 txt-center">
            <h2>Om Sykdomspulsen</h2>
<p>Sykdomspulsen er et overvåkningssystem basert på diagnosekoder (ICPC-2 koder) satt på legekontorer og legevakter i hele Norge. Formålet med Sykdomspulsen er å se trender og udbredelse av smittsomme sykdommer slik at utbrudd oppdages så tidlig som mulig. I tillegg kan overvåkningen brukes til å iverksette folkehelsetiltak og se effekt av tiltak.</p>
<p>Diagnosekoder som registreres hos lege eller legevakt sendes til Helsedirektoratet som en del av legenes refusjonskrav (KUHR-systemet*). Folkehelseinstituttet mottar daglig oppdatert KUHR-data til Sykdomspulsen. Dataene er anonyme uten pasientidentifikasjon, men med informasjon om kjønn, aldersgruppe, konsultasjonsdato og sted for konsultasjon.</p>
<p>Dataene blir bearbeidet og quasiposson regresjon blir brukt for å detektere forhøyet forekomst av et spesifikt syndrom. Dette er basert på de foregående 5 årene i det samme geografiske området. På denne måten kan antall faktiske konsultasjoner bli identifisert som forventet, høyere enn forventet eller mye høyere enn forventet.</p>
<p>Selv om dataene noen ganger viser seg å ligge i området høyere enn forventet eller mye høyere enn forventet trenger dette ikke å være noen grunn til bekymring. Resultatene blir undersøkt av leger og epidemiologer på Folkehelseinstituttet og i kommunene.</p>
<p>Dersom du ønsker mer informasjon om Sykdosmspulsen kan du kontakte Gry M Grøneng eller Richard White på mailadressene: GryMarysol.Groneng@fhi.no og Richard.White@fhi.no.</p>
<p>*KUHR-systemet: Regninger for all behandling som utføres utenfor sykehus sendes til HELFO for utbetaling og kontroll (legenes refusjonskrav).</p>
</div>
</div>
</section>
<section id="help">
<div className="container">
<div className="column4 prefix4">
<hr/>
</div>
<div className="column10 prefix1 txt-center">
<h2>Oversikt</h2>
<p>Tabellen viser en oversikt over forekomsten av sykdom/symptom i et valgt tidsrom.</p>
<p>Valg av tidsrom gjøres på tidslinje nederst på siden. Valg av sykdom/symptom gjøres på venstre side. På venstre side kan man også velge Norge eller et fylke i Norge. Hvis man velger Norge vil hvert fylke få en rad i tabellen. Hvis man velger et fylke vil alle kommunene i valgte fylke få en rad i tabellen.</p>
<p>Dersom ruten for en gitt uke er farget med grønn farge betyr det at antall konsultasjoner i den gitte kommunen eller fylket er som forventet denne uken. En gul farge en gitt uke betyr at antall konsultasjoner i den gitte kommunen eller fylket er høyere enn forventet denne uken. En rød farge en gitt uke betyr at antall konsultasjoner i den gitte kommunen eller fylket er betydelig høyere enn forventet denne uken.</p>
<p>Fargene er laget ut fra beregninger fra de foregående 5 årene i fylke eller kommunen.</p>
</div>
</div>
</section>
<section id="help">
<div className="container">
<div className="column4 prefix4">
<hr/>
</div>
<div className="column10 prefix1 txt-center">
<h2>Antall</h2>
<p>Grafen viser antall konsultasjoner per uke med en indikasjon om antallet er som forventet eller ikke.</p>
<p>Valg av sykdom/symptom, sted og tidsrom gjøres på venstre side. Den svarte streken med rundingene viser antallet faktiske konsultasjoner. Bakgrunnsfargen er laget ut fra beregninger fra de foregående 5 årene i samme geografiske område.</p>
<p>Når den svarte streken ligger i den grønne bakgrunnsfargen er antallet konsultasjoner som forventet og rundingen vises med svart. Når den svarte streken ligger i det gule feltet er antall konsultasjoner høyere enn forventet og fyllet i rundingen blir gult. Dersom den svarte streken ligger i det røde feltet er antall konsultasjoner betydelig høyere enn forventet og fyllet i rundingen blir rødt.</p>
          </div>
      </div>
</section>
</div>
    );
  }
}

export default App;

//export default App;

