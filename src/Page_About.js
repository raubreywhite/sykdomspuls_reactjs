import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Measure from 'react-measure';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FullWidthSelection from './FullWidthSelection.js';
import FullWidthPanel from './FullWidthPanel.js';
import {muiTheme} from './Styles'
import {Link} from 'react-router-dom';

var App = inject("store")(observer(React.createClass({
  goToNews(){
    this.props.history.push("/news")
  },
  render(){
    return(
      <FullWidthSelection>
      <Card style={muiTheme.fullWidthPanel}>
      <br/>
      <p style={muiTheme.headerTitleCentered}>Om Sykdomspulsen</p>
      <CardText style={muiTheme.text}>
      <p>
      <span style={muiTheme.textBlue}>Sydomspulsen til kommunehelsetjenesten</span> er et pilotprosjekt som ble lansert 15.08.2017.
      </p>

      <p>
      I pilotprosjektet har utvalgte fylkes- og kommuneleger og noen helsesøstre fått tilgang til en webside for å gi tilbakemelding om behov og brukervennlighet.
      </p>

      <p>
      Sykdomspulsen er et overvåkningssystem basert på diagnosekoder (ICPC-2 koder) satt på legekontor og legevakter i hele Norge. Formålet med Sykdomspulsen er å se trender og utbredelse av smittsomme sykdommer slik at utbrudd oppdages så tidlig som mulig. I tillegg kan overvåkningen brukes til å iverksette folkehelsetiltak og se effekt av tiltak.
      </p>

      <p>
      Diagnosekoder som registreres hos lege eller legevakt sendes til Helsedirektoratet som en del av legenes refusjonskrav (KUHR-systemet). Folkehelseinstituttet mottar daglig oppdatert KUHR-data til Sykdomspulsen. Dataene er anonyme uten pasientidentifikasjon, men med informasjon om kjønn, aldersgruppe, konsultasjonsdato og sted for konsultasjon. Dataene blir bearbeidet og quasiposson regresjon blir brukt for å detektere forhøyet forekomst av sykdom/symptom. Dette er basert på de foregående 5 årene i det samme geografiske området (for årene 2006-2010 er 5 fremtidige år brukt). På denne måten kan antall konsultasjoner i perioden kategoriseres som normal (grønn), høyere enn forventet (gul) eller mye høyere enn forventet (rød). Geografisk område er basert på stedet for legekonsultasjon, ikke pasientens bosted. Dette er for å best mulig kunne fange opp studenter og pendlere som blir syke på studiestedet eller jobbstedet. Dataene i Sykdomspulsen er dessverre ikke helt oppdaterte da det ofte går minst 14 dager mellom hver gang legene sender inn data til Helsedirektoratet. De siste ukene som vises på websiden ligger derfor ofte lavere enn de foregående ukene. Det er tatt hensyn til denne nedgangen slik at fargekodene skal være riktige også i slutten av perioden. Sykdomspulsen vil kunne vise riktigere verdier på et tidligere tidspunkt dersom dataene sendes oftere fra legene til Helsedirektoratet. Sykdomspulsen websiden vil foreløpig bli oppdatert av Folkehelseinstituttet cirka en gang i uken (tirsdager).
      </p>

      <p>
      I pilotprosjektet vil det i bli mulighet til å følge to forskjellige symptomer/sykdommer:
      </p>
      <ul>
      <li>
      <span style={muiTheme.textBlue}>Mage-tarminfeksjoner</span> som er en samlebetegnelse for ICPC-2 kodene Diare (D11), Tarminfeksjon (D70) og Gastroenteritt antatt infeksiøs (D73)
      </li>
      <li>
      <span style={muiTheme.textBlue}>Luftveisinfeksjoner</span> som er en samlebetegnelse for Hoste (R05), Akutt øvre luftveisinfeksjon (R74), Akutt bronkitt/bronkiolitt (R78) og Luftveisinfeksjon IKA (R83).
      </li>
      </ul>
      <p>
      Dersom dette prosjektet blir videreført vil det være mulighet for å ta med andre symptomer/sykdommer og diagnosekoder.
      </p>

      <p>
      <span style={muiTheme.textBlue}>Kommunereformen</span>: Kommuner som har blitt slått sammen og fått et nytt navn vil ikke finnes i oversiktene. Kommuner som har blitt slått sammen med en annen kommune men beholdt navnet vil vises i oversiktene, og beregningene tar hensyn til sammenslåingen. Det samme gjelder sammenslåtte kommuner som får nytt kommunenavn.
      </p>
           
      <p>
      <span style={muiTheme.textBlue}>Små kommuner</span>: Kommuner med under 500 innbyggere vil ikke kunne se grafer for aldersgrupperinger, men bare «totalt antall». Dette er av hensyn til personvern.
      </p>
           
      <p>
      <span style={muiTheme.textBlue}>Interkommunalt samarbeid om legekontor/legevakt</span>: I Sykdomspulsen er geografisk område basert på stedet for legekonsultasjon, ikke pasientens bosted. Derfor vil legekontorets/legevaktens postadresse si hvilken kommune som vises i Sykdomspulsen. De andre kommunene som er med på det interkommunale samarbeidet vil ikke vises i Sykdomspulsen.
      </p>
           
      <p>
      Dette er et pilotprosjekt fra Folkehelseinstituttet.
      </p>

      <p>
      <span style={muiTheme.textBlue}>Prosjektleder</span>: Gry M Grøneng.
      </p>

      <p>
      <span style={muiTheme.textBlue}>Statistiker og webansvarlig</span>: Richard White.
      </p>

      <p>
      <span style={muiTheme.textBlue}>Ved spørsmål</span> eller ris/ros, send mail til Sykdomspulsen@fhi.no
      </p>


      </CardText>

      <br/>

      </Card>
      </FullWidthSelection>
    );
  }
})))

export default App;

//export default App;

