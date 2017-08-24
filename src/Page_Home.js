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
    this.props.history.push("/nyheter")
  },
  render(){
    return(
      <FullWidthSelection>
      <FullWidthPanel style={muiTheme.latestNewsTitle} onClick={this.goToNews}>
      24.08.2017 Siste nytt: Ny funksjon for oversikt-siden
      </FullWidthPanel>
      <br/>

      <Card style={muiTheme.fullWidthPanel}>
      <br/>
      <p style={muiTheme.headerTitleCentered}>Velkommen til Sykdomspulsen til kommunehelsetjenesten</p>

      <CardText style={muiTheme.text}>
      <p>
      <span style={muiTheme.textBlue}>Sykdomspulsen til kommunehelsetjenesten</span> er et pilotprosjekt som ble lansert 15.08.2017
      </p>

      <p>
      I pilotprosjektet har utvalgte fylkes- og kommuneleger fått tilgang til en webside for å gi tilbakemelding om behov og brukervennlighet.
      </p>    

      <p>
      Sykdomspulsen er et overvåkningssystem basert på diagnosekoder (ICPC-2 koder) satt på legekontor og legevakter i hele Norge. Formålet med Sykdomspulsen er å se trender og utbredelse av smittsomme sykdommer slik at utbrudd oppdages så tidlig som mulig. I tillegg kan overvåkningen brukes til å vurdere effekt av folkehelsetiltak.
      </p>

      <p>
      Oppe på venstre side kan du velge forskjellige diagrammer, tabeller eller grafer.
      Om du vil vite mer om Sykdomspulsen, gå til <Link to="/om">Om Sykdomspulsen</Link> oppe til venstre.
      Trenger du hjelp, gå til <Link to="/hjelp">Hjelp</Link> oppe til venstre.
      </p>

      <p>
      <span style={muiTheme.textBlue}>NB!</span> Dette er et pilotprosjekt. Du har fått mulighet til å være med på pilotprosjektet og bruke websiden når du vil og så mye du vil. Du kan også vise enkeltsider av websiden til andre som jobber innenfor kommunehelsetjenesten.
      </p>
      
      <p>
      <span style={muiTheme.textBlue}>Men vi ber om at du ikke distribuerer webadressen til andre</span>, hverken til ansatte i kommunehelsetjenesten eller utenfor. Det er fordi dette er et pilotprosjekt der vi ønsker å ha oversikt over hvem som bruker det. Dersom noen andre enn deg ønsker å få tilgang til websiden kan de kontakte oss på Sykdomspulsen@fhi.no.
      </p>
           
      <p>
      Gry M Grøneng er prosjektleder og Richard White er statistiker og webansvarlig. Hvis du har spørsmål eller ris/ros til websiden ta kontakt med oss på mailadresse: sykdomspulsen@fhi.no.
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

