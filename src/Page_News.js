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
      <Card>
      <CardHeader
      titleStyle={muiTheme.headerTitle} title="Ny funksjon for oversikt-siden"
      subtitleStyle={muiTheme.subheaderTitle} subtitle="24.08.2017"
      />
      <CardText style = {muiTheme.text}>
      <p>
      Etter tilbakemelding fra en av pilotbrukerne har vi forbedret funksjonen på <Link to={"/oversikt/"+this.props.store.kommuneSelectedName}>oversikt-siden</Link>. Nå er det mulig å klikke på feltene i diagrammet på <Link to={"/oversikt/"+this.props.store.kommuneSelectedName}>oversikt-siden</Link>. Du vil da komme direkte til ukentlig-siden der grafen vil vise samme sykdom/symptom, kommune og aldersgruppe som du klikket på.
      </p>
      </CardText>
      </Card>

      <br/>
      
      <Card>
      <CardHeader
      titleStyle={muiTheme.headerTitle} title="Økt antall konsultasjoner i aldersgruppen 15-19 år"
      subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
      />
      <CardText style = {muiTheme.text}>
      <p>
      Fra høsten 2016 ser vi en økning i antall konsultasjoner hos lege og legevakt for aldersgruppen <Link to="/ukentlig/Norge/Norge/gastro/15-19">15-19 år</Link>. Dette har antakelig sammenheng med at det ble innført nye fraværsregler i den videregående skole fra skolestart høsten 2016.
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
      Antallet konsultasjoner med mage-tarminfeksjoner blant <Link to="/ukentlig/Norge/Norge/gastro/0-4">0-4 åringer</Link> er lavere i årets og fjorårets sesong enn i de foregående årene. Det har antakelig en sammenheng med rotavirus vaksinasjonen som ble innført i denne aldersgruppen i 2014.
      </p>
      </CardText>
      </Card>
    
      <br/>
           
      <Card>
      <CardHeader
      titleStyle={muiTheme.headerTitle} title="Interkommunalt samarbeid om legekontor/legevakt"
      subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
      />
      <CardText style = {muiTheme.text}>
      <p>
      I Sykdomspulsen er geografisk område basert på stedet for legekonsultasjon, ikke pasientens bosted. Derfor vil legekontorets/legevaktens postadresse si hvilken kommune som vises i Sykdomspulsen. De andre kommunene som er med på det interkommunale samarbeidet vil ikke vises i Sykdomspulsen.
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
})))

export default App;

//export default App;

