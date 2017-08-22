import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Measure from 'react-measure';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FullWidthSelection from './FullWidthSelection.js';
import {muiTheme} from './Styles'
import {Link} from 'react-router-dom';

var App = inject("store")(observer(React.createClass({
  render(){
    return(
      <FullWidthSelection>

      <Card style={muiTheme.fullWidthPanel}>
      <br/>
      <p style={muiTheme.headerTitleCentered}>Hjelp</p>
      <CardText style={muiTheme.text}>
      <p>
      Under ser du en oversikt over de forskjellige funksjonene på denne websiden. Dersom du ikke finner svar på det du lurer på kan du sende en mail til Sykdomspulsen@fhi.no. Vi ønsker også tilbakemelding på om det er noe som ikke fungerer og ris/ros.
      </p>

      <p>
      I pilotprosjektet vil det i bli mulighet til å følge to forskjellige symptomer/sykdommer:
      </p>
      <ul>
      <li>
      <span style={muiTheme.textBlue}>Mage-tarminfeksjoner</span> som er en samlebetegnelse for ICPC-2 kodene Diare (D11), Tarminfeksjon (D70) og Gastrenteritt antatt infeksiøs (D73).
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
      <span style={muiTheme.textBlue}>Når du klikker øverst til venstre</span> på Sykdomspulsen websiden får du en liste over andre diagrammer, tabeller og grafer.
      </p>

      <p>
      Under er en kort presentasjon av de forskjellige diagrammene, en mer utfyllende forklaring finner du lenger ned i dokumentet.
      </p>
      <ul>
      <li>
      <Link to="/nyheter">Nyheter</Link> er en side med informasjon om viktige hendelser som kan ha innvirkning på tallene i Sykdomspulsen eller informasjon om forandringer på websiden.
      </li>
      <li>
      <Link to={"/oversikt/"+this.props.store.kommuneSelectedName}>Oversikt</Link> er et diagram som viser de siste 8 ukene i en valgt kommune. Med dette diagrammet kan du se om antallet konsultasjoner for mage-tarm infeksjoner og øvre luftveisinfeksjoner var som forventet, høyere eller betydelig høyere enn forventet.
      </li>
      <li>
      <Link to={"/ukentlig/"+this.props.store.weekSelectedFylke+"/"+this.props.store.weekSelectedName+"/"+this.props.store.weekSelectedType+"/"+this.props.store.weekSelectedAge}>Ukentlig</Link> er en graf som viser antall konsultasjoner per uke for angitt sykdom/syndrom, sted, tid og aldersgruppe.
      </li>
      <li>
      <Link to="/daglig">Daglig</Link> er en graf som viser antall konsultasjoner per dag for angitt sykdom/syndrom, sted, tid og aldersgruppe.
      </li>
      <li>
      <Link to="/om">Om Sykdomspulsen</Link> er en side der det ligger informasjon om Sykdomspulsen generelt.
      </li>
      <li>
      <Link to="/hjelp">Hjelp</Link> er en side der det ligger en del informasjon om hvordan du kan navigere deg fram på websiden og om de forskjellige diagrammene, tabellene og grafene.
      </li>
      <li>
      Dette ikonet <u>(i)</u> finnes øverst til venstre i mange av skjermbildene, ved å trykke på dette får du opp en rute med mer informasjon om diagrammet.
      </li>
      </ul>
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

      <br/>
      <Card style={muiTheme.fullWidthPanel}>
      <br/>
      <p style={muiTheme.headerTitleCentered}>I flere av grafene er det fargekoder</p>
      <CardText style={muiTheme.text}>
      <p>
      <span style={muiTheme.textBlue}>Grønne felt</span> betyr at antall konsultasjoner <span style={muiTheme.textBlue}>ikke</span> er høyere enn forventet i forhold til sykdomen/symptomet, tid, alder og geografisk nivå.
      </p>

      <p>
      <span style={muiTheme.textBlue}>Gule felt</span> betyr at antall konsultasjoner er høyere enn forventet i forhold til sykdomen/symptomet, tid, alder og geografisk nivå.
      </p>

      <p>
      <span style={muiTheme.textBlue}>Røde felt</span> betyr at antall konsultasjoner er betydelig høyere enn forventet i forhold til sykdommen/symptomet, tid, alder og geografisk nivå.
      </p>
      </CardText>
      <br/>
      </Card>

      <br/>
      <Card style={muiTheme.fullWidthPanel}>
      <br/>
      <p style={muiTheme.headerTitleCentered}>Oversikt</p>
      <CardText style={muiTheme.text}>
      <p>
      <Link to={"/oversikt/"+this.props.store.kommuneSelectedName}>Dette</Link> er et diagram som viser de siste 8 ukene i en valgt kommune.
      </p>

      <p>
      Velg ønsket kommune på den røde streken oppe til venstre, enten ved å skrive kommunenavnet eller nummeret så kommer det opp en liste som du kan velge fra.
      </p>

      <p>
      X-aksen viser uke/år, y-aksen viser hvilken sykdom/symptom og alder.
      </p>

      <p>
      Betydningen av de forskjellige fargekodene er beskrevet tidligere i denne brukerveiledningen. 
      </p>
      </CardText>
      <br/>
      </Card>


      <br/>
      <Card style={muiTheme.fullWidthPanel}>
      <br/>
      <p style={muiTheme.headerTitleCentered}>Ukentlig</p>
      <CardText style={muiTheme.text}>
      <p>
      <Link to={"/ukentlig/"+this.props.store.weekSelectedFylke+"/"+this.props.store.weekSelectedName+"/"+this.props.store.weekSelectedType+"/"+this.props.store.weekSelectedAge}>Denne</Link> grafen viser antall konsultasjoner per uke for angitt sykdom/syndrom, sted, tid og aldersgruppe.
      </p>
      
      <p>Sykdom/syndrom, aldersgruppe og sted velges ved å klikke på rullegardinmenyene øverst. I tidslinje nederst kan man skyve på rundingene i endene for å zoome inn på ønsket tidsperiode. 
      </p>
      
      <p>
      X-aksen viser uke/år, y-aksen viser antallet konsultasjoner. Den svarte streken viser antallet faktiske konsultasjoner.
      </p>
      
      <p>
      Bakgrunnsfargen er laget ut fra beregninger fra de foregående 5 årene i samme geografiske område (for årene 2006-2010 er 5 fremtidige år brukt). Når den svarte streken ligger i den grønne bakgrunnsfargen er antallet konsultasjoner som forventet og rundingen vises med svart. Når den svarte streken ligger i det gule feltet er antall konsultasjoner høyere enn forventet og fyllet i rundingen blir gult. Dersom den svarte streken ligger i det røde feltet er antall konsultasjoner betydelig høyere enn forventet og fyllet i rundingen blir rødt.
      </p>
      </CardText>
      <br/>
      </Card>

      <br/>
      <Card style={muiTheme.fullWidthPanel}>
      <br/>
      <p style={muiTheme.headerTitleCentered}>Daglig</p>
      <CardText style={muiTheme.text}>
      <p>
      <Link to="/daglig">Denne</Link> grafen viser antall konsultasjoner per dag for angitt sykdom/syndrom, sted, tid og aldersgruppe.
      </p>
      
      <p>
      Sykdom/syndrom, aldersgruppe og sted velges ved å klikke på rullegardinmenyene øverst. Det er kun mulig å se grafen på fylkesnivå og ikke kommunenivå. I tidslinje nederst kan man skyve på rundingene i endene for å zoome inn på ønsket tidsperiode.
      </p>
      
      <p>
      X-aksen viser dag/mnd/år, y-aksen viser antallet konsultasjoner. Den svarte streken viser antallet faktiske konsultasjoner.
      </p>
      
      <p>
      Bakgrunnsfargen er laget ut fra beregninger fra de foregående 5 årene i samme geografiske område. Når den svarte streken ligger i den grønne bakgrunnsfargen er antallet konsultasjoner som forventet og rundingen vises med svart. Når den svarte streken ligger i det gule feltet er antall konsultasjoner høyere enn forventet og fyllet i rundingen blir gult. Dersom den svarte streken ligger i det røde feltet er antall konsultasjoner betydelig høyere enn forventet og fyllet i rundingen blir rødt.
      </p>
      </CardText>
      <br/>
      </Card>

      </FullWidthSelection>
    );
  }
})))

export default App;

