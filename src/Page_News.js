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
titleStyle={muiTheme.headerTitle} title="Økt antall konsultasjoner i 15-19 aldersgruppen"
subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
/>
<CardText style = {muiTheme.text}>
<p>På grunn av nye regelverk angående videre gåendeskole, har vi sett en stor økning i antall konsultasjoner i 15-19 aldersgruppen. </p>
</CardText>
</Card>

<br/>

<Card>
<CardHeader
titleStyle={muiTheme.headerTitle} title="Sykdomspulsen lanseres"
subtitleStyle={muiTheme.subheaderTitle} subtitle="15.08.2017"
/>
<CardText style = {muiTheme.text}>
<p>I dag lanseres Sykdomspulsen gjennom et pilotprosjekt.</p>
<p>Hvis du har noe spørsmål, ta kontakt med Gry M Grøneng eller Richard White på mailadressene: GryMarysol.Groneng@fhi.no og Richard.White@fhi.no.</p>
</CardText>
</Card>

</FullWidthSelection>
    );
  }
}

export default App;

//export default App;

