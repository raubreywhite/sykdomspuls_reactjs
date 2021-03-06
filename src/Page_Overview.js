import React from 'react';
import { inject, observer } from 'mobx-react';
import renderIf from 'render-if';
import FullWidthSelection from './FullWidthSelection.js';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {GridList, GridTile} from 'material-ui/GridList';
import AutoComplete from 'material-ui/AutoComplete';
import BarometerTop from './BarometerTop.js'
import Measure from 'react-measure';

var sprintf = require("sprintf-js").sprintf


class Info extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
      label="OK"
      primary={true}
      onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
      <IconButton onTouchTap={this.handleOpen} >
      <ActionInfo/>
      </IconButton>
      <Dialog
      title="Info"
      actions={actions}
      modal={false}
      open={this.state.open}
      onRequestClose={this.handleClose}
      autoScrollBodyContent={true}
      >
      <p>
      Dette diagrammet viser de siste 8 ukene i en valgt kommune. En uke går fra mandag til søndag.
      </p>

      <p>
      Velg ønsket kommune på streken oppe til venstre, enten ved å skrive kommunenavnet eller nummeret så kommer det opp en liste som du kan velge fra.
      </p>

      <p>
      X-aksen viser uke og år, y-aksen viser hvilken sykdom/symptom og alder.
      </p>

      <p>
      Grønne felt betyr at antall konsultasjoner ikke er høyere enn forventet i forhold til sykdommen/symptomet, tid, alder og kommune.
      </p>

      <p>
      Gule felt betyr at antall konsultasjoner er høyere enn forventet i forhold til sykdommen/symptomet, tid, alder og kommune.
      </p>

      <p>
      Røde felt betyr at antall konsultasjoner er betydelig høyere enn forventet i forhold til sykdommen/symptomet, tid, alder og kommune.
      </p>

      <p>
      Fargene er laget ut fra beregninger fra de foregående 5 årene i fylket eller kommunen.
      </p>

      <p>
      Kommunereformen: Kommuner som har blitt slått sammen og fått et nytt navn vil ikke finnes i oversiktene. Kommuner som har blitt slått sammen med en annen kommune men beholdt navnet vil vises i oversiktene, og beregningene tar hensyn til sammenslåingen. Det samme gjelder sammenslåtte kommuner som får nytt kommunenavn.
      </p>

      <p>
      Små kommuner: Kommuner med under 500 innbyggere vil ikke kunne se grafer for aldersgrupperinger, men bare «totalt antall». Dette er av hensyn til personvern.
      </p>

      <p>
      Interkommunalt samarbeid om legekontor/legevakt: I Sykdomspulsen er geografisk område basert på stedet for legekonsultasjon, ikke pasientens bosted. Derfor vil legekontorets/legevaktens postadresse si hvilken kommune som vises i Sykdomspulsen. De andre kommunene som er med på det interkommunale samarbeidet vil ikke vises i Sykdomspulsen.
      </p>

      <p>
      Etter tilbakemelding fra en av pilotbrukerne har vi forbedret funksjonen på oversikt-siden. Nå er det mulig å klikke på feltene i diagrammet på oversikt-siden. Du vil da komme direkte til ukentlig-siden der grafen vil vise samme sykdom/symptom, kommune og aldersgruppe som du klikket på.
      </p>

      </Dialog>
      </div>
    );
  }
}

var App = inject("store")(observer(React.createClass({
  getInitialState:function(){
    console.log("HI DATA")
    return {
      namesKommune: [{location: "municip0301", locationName: "Oslo [0301]"}],
      kommuneLocation: ["municip0301"],
      kommuneLocationName: ["Oslo"],
      selectedName: "",
      selectedPrettyName: "Oslo",
      errorText: "",
      data : null,
      searchText: '',
      dimensions: {
        width: 800,
        height: 400
      }
    }},
  componentDidMount:function(){
    console.log("LOADING DATA")
    this.props.store.kommuneSelectedName = this.props.match.params.kommune
    console.log(this.props.store.kommuneSelectedName)
    this.GetNamesKommune()
    this.GetData()
  },
  SetSelectedName(val){
    console.log(val)
    this.props.store.kommuneSelectedName = val
    this.props.history.push('/oversikt/'+this.props.store.kommuneSelectedName)
    this.GetData()
  },
  GetNamesKommune(){
    var request = new Request(this.props.store.baseURL+"namesKommune?xname=All", {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    fetch(request)
      .then(function(response){
        if(response.ok) {
          return response.json()
        }
        throw new Error('Bad kommune.');
      })
      .then((response) => this.setState({
        namesKommune: JSON.parse(response).map(function(item){
          return { 'location': item.location, 'locationName': item.locationName+' ['+item.location.substr(item.location.length - 4)+']'}
        })}));
  },
  GetData(){
    console.log(this.props.store.kommuneSelectedName)
    this.setState({ data: null })
    var request = new Request(sprintf(this.props.store.baseURL+'v1_0_DataWeeklyOverviewKommune?xname=%s', this.props.store.kommuneSelectedName), {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    fetch(request)
      .then(function(response){
        if(response.ok) {
          return response.json()
        }
        throw new Error('Bad kommune.');
      })
      .then((response) => this.setState({
        data: JSON.parse(response)
      }, function(){
        console.log(this.state.data)
      }))
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });


  },
  GoToWeekly(d){
    console.log(d)
    var partsOfStr = d.locationName.split(' - ');
      console.log(partsOfStr);
      var age=partsOfStr[1]
      var type="";
      var arrayLength = this.props.store.namesType.length;
       for (var i = 0; i < arrayLength; i++) {
           if(partsOfStr[0]===this.props.store.namesType[i]["short"]){
               type=this.props.store.namesType[i]["value"]
           }
        }
      var fylke = this.props.store.kommuneSelectedName
      fylke=fylke.substr(fylke.length - 4)
      console.log(fylke)
      fylke="county"+fylke.substr(0,2)
      console.log(fylke)
      this.props.history.push("/ukentlig/"+fylke+"/"+this.props.store.kommuneSelectedName+"/"+type+"/"+age)
    //console.log(val)
    //this.props.store.kommuneSelectedName = val
    //this.props.history.push('/oversikt/'+this.props.store.kommuneSelectedName)
    //this.GetData()
  },
  handleUpdateInput(searchText){
    this.setState({
      searchText: searchText,
    });
  },
  handleNewRequest (searchText, searchIndex){
      console.log(searchIndex)
      if(searchIndex!=-1){
        console.log(searchText)
        this.SetSelectedName(searchText.location)
      } else {
        this.setState({
          errorText: "Velg fra listen",
        })
      }


  },

  render(){

  const namesKommuneConfig = {
      text: 'locationName',
      value: 'location',
    };

    console.log(this.props.store.baseURL)
    return(
      <FullWidthSelection>
      {renderIf(this.props.store.baseURL!="null")(
      <div>
        <section id="usage">
        <div className="container">
        <div className="Dashboard-select">
        <div className="Dashboard-select-header">
        <div className="Dashboard-info-autocomplete">
        <Info/>
        </div>
        <div className="Dashboard-select-right">
        <GridList cols={1} cellHeight="auto" padding={0}>
        <GridTile>
        <AutoComplete
          value="municip0301"
          hintText="Skriv inn kommunenavn"
          errorText={this.state.errorText}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={20}
          onNewRequest={this.handleNewRequest}
          dataSource={this.state.namesKommune}
          dataSourceConfig={namesKommuneConfig}
          openOnFocus={true}
          animated={false}
          menuCloseDelay={0}
        />
        </GridTile>
        </GridList>
        </div>
        </div>
        </div>
        </div>
      <Measure bounds onResize={(contentRect) => { this.setState({dimensions : contentRect.bounds}); console.log("HI"); console.log(this.state.dimensions.width)}}>
        {({ measureRef }) =>
            <div ref={measureRef} className="Dashboard-main">
            <BarometerTop
              onRectangleClick={this.GoToWeekly}
              data={this.state.data}
              width={this.state.dimensions.width}
              height={window.innerHeight}
            />
            </div>

        }
        </Measure>
        </section>
      </div>)}
      </FullWidthSelection>

    );
  }
})))

export default App


//export default App;

