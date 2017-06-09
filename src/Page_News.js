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
titleStyle={styles.headerTitle} title="Økt antall konsultasjoner i 15-19 aldersgruppen"
subtitleStyle={styles.subheaderTitle} subtitle="15.08.2017"
/>
<CardText style = {styles.text}>
<p>På grunn av nye regelverk angående videregåendeskole, har vi sett en stor økning i antall konsultasjoner i 15-19 aldersgruppen. </p>
</CardText>
</Card>

<br/>

<Card>
<CardHeader
titleStyle={styles.headerTitle} title="Sykdomspulsen lanseres"
subtitleStyle={styles.subheaderTitle} subtitle="15.08.2017"
/>
<CardText style = {styles.text}>
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

