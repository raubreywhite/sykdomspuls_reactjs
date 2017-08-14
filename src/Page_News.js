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
      titleStyle={muiTheme.headerTitle} title="Økt antall konsultasjoner i aldersgruppen 15-19 år"
      subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
      />
      <CardText style = {muiTheme.text}>
      <p>
      Fra høsten 2016 ser vi en økning i antall konsultasjoner hos lege og legevakt for aldersgruppen 15-19 år. Dette har antakelig sammenheng med at det ble innført nye fraværsregler i den videregående skole fra skolestart høsten 2016.
      </p>
      </CardText>
      </Card>

      <br/>
           
      <Card>
      <CardHeader
      titleStyle={muiTheme.headerTitle} title="Lavere antall konsultasjoner med mage-tarminfeksjoner i aldersgruppen 0-4 år"
      subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
      />
      <CardText style = {muiTheme.text}>
      <p>
      Antallet konsultasjoner med mage-tarminfeksjoner blant 0-4 åringer er lavere i årets og fjorårets sesong enn i de foregående årene. Det har antakelig en sammenheng med rotavirus vaksinasjonen som ble innført i denne aldersgruppen i 2014.
      </p>
      </CardText>
      </Card>
    
      <br/>

      <Card>
      <CardHeader
      titleStyle={muiTheme.headerTitle} title="Kommunereformen"
      subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
      />
      <CardText style = {muiTheme.text}>
      <p>Kommuner som har blitt slått sammen og fått et nytt navn vil ikke finnes i oversiktene. Kommuner som har blitt slått sammen med en annen kommune men beholdt navnet vil vises i oversiktene, og beregningene tar hensyn til sammenslåingen. Det samme gjelder sammenslåtte kommuner som får nytt kommunenavn.</p>
      </CardText>
      </Card>

      <Card>
      <CardHeader
      titleStyle={muiTheme.headerTitle} title="Pilotprosjektet Sykdomspulsen til kommunehelsetjenesten lanseres 15.08.2017"
      subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
      />
      <CardText style = {muiTheme.text}>
      <p>Sykdomspulsen til kommunehelsetjenesten er et pilotprosjekt som ble lansert 15.08.2017. I pilotprosjektet har utvalgte fylkes- og kommuneleger fått tilgang til denne websiden for å gi tilbakemelding om behov og brukervennlighet.</p>
      <p>Gry M Grøneng er prosjektleder og Richard White er statistiker og webansvarlig. Hvis du har spørsmål eller ris/ros til websiden ta kontakt med oss på mailadresse: sykdomspulsen@fhi.no</p>
      </CardText>
      </Card>

      </FullWidthSelection>
    );
  }
}

export default App;

//export default App;

