import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Measure from 'react-measure';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Barometer from './Barometer.js'
import Lines from './Lines.js'
import renderIf from 'render-if'
import {GridList, GridTile} from 'material-ui/GridList';
import {muiTheme} from './Styles'

var d3=require('d3');
var sprintf = require("sprintf-js").sprintf

var LeftSelect = React.createClass ({
  handleChangeType : function(event, index, value){
    this.props.onUpdateType(value)
  },
  handleChangeAge : function(event, index, value){
    this.props.onUpdateAge(value)
  },
  handleChangeFylke : function(event, index, value){
    this.props.onUpdateFylke(value)
  },

  render : function() {
    return (
<div className="Dashboard-select-header">
<div className="Dashboard-select-left">
{this.props.info}
</div>
<div className="Dashboard-select-right">
<GridList cols={3} cellHeight="auto" padding={5}>

<GridTile>
<SelectField autoWidth={true} floatingLabelText="Sykdom" value={this.props.onUpdateTypeVal} onChange={this.handleChangeType}>
{this.props.listType.map(function(listValue, i){
  return <MenuItem key={i} value={listValue["value"]} primaryText={listValue["name"]}/>;
})}
</SelectField>
</GridTile>

<GridTile>
<SelectField autoWidth={true} floatingLabelText="Alder" value={this.props.onUpdateAgeVal} onChange={this.handleChangeAge}>
{this.props.listAge.map(function(listValue, i){
  return <MenuItem key={i} value={listValue["value"]} primaryText={listValue["name"]}/>;
})}
</SelectField>
</GridTile>

<GridTile>
<SelectField autoWidth={true} floatingLabelText="Fylke" value={this.props.onUpdateFylkeVal} onChange={this.handleChangeFylke}>
{this.props.listFylke.map(function(listValue, i){
  return <MenuItem key={i} value={listValue["location"]} primaryText={listValue["locationName"]}/>;
})}
</SelectField>
</GridTile>

</GridList>
</div>
</div>

    )
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namesType: [{'value':'respiratory','name':'Øvre-luftvei diagnose'},{'value':'gastro','name':'Mage-tarm diagnose'}],
      namesAge: [
        {'value':'Totalt','name':'Totalt'},
        {'value':'0-4','name':'0-4'},
        {'value':'5-14','name':'5-14'},
        {'value':'15-19','name':'15-19'},
        {'value':'20-29','name':'20-29'},
        {'value':'30-64','name':'30-64'},
        {'value':'65p','name':'65+'}
        ],
      namesFylke: [1,2],
      selectedType: 'respiratory',
      selectedAge: 'Totalt',
      selectedName: "Norge",
      selectedPrettyType: 'Øvre-luftvei diagnose',
      selectedPrettyAge: 'Totalt',
      selectedPrettyName: "Norge",
      data : [],
      brushXMin : 1,
      brushXMax : 10000,
      brushDefaultValues : [1, 10000],
      brushMarks : {1: ' '},
      brushValues: [0, 10000],
      dimensions: {
        width: 800,
        height: 400
      }
    };
    this.CalculateBrushMaxMin = this.CalculateBrushMaxMin.bind(this)
    this.CalculateBrushMarks = this.CalculateBrushMarks.bind(this)
    this.onUpdateSelectType = this.onUpdateSelectType.bind(this)
    this.onUpdateSelectAge = this.onUpdateSelectAge.bind(this)
    this.onUpdateSelectFylke = this.onUpdateSelectFylke.bind(this)
    this.tipFormatter = this.tipFormatter.bind(this)
    this.SetBrushValues = this.SetBrushValues.bind(this)
  }
  
  CalculateBrushMaxMin(){
    if(this.state.data['data']!=null &&this.state.brushXMax==10000){
      var xMin=d3.min(this.state.data.data.map(function(item){ return item.xRaw }))
      var xMax=d3.max(this.state.data.data.map(function(item){ return item.xRaw }))
    
    this.setState({
          brushXMin : xMin,
          brushXMax : xMax,
          brushDefaultValues : [xMin, xMax],
        }, function(){
          this.CalculateBrushMarks()
        })
    } else if(this.state.data['data']!=null){
      this.CalculateBrushMarks()
    }
  }
  
  CalculateBrushMarks(){
    if(this.state.data['data'] == null){
      } else {
        
        var xMin= this.state.brushXMin
      var xMax= this.state.brushXMax

        var howFrequent=26
        var freeSpace = this.state.dimensions.width/(xMax-xMin+1)
        if(freeSpace <=2){
          howFrequent='lab7'
        } else if(freeSpace <= 4){
          howFrequent='lab6'
        } else if (freeSpace <= 6){
          howFrequent='lab5'
        } else if (freeSpace <= 8){
          howFrequent='lab4'
        } else if (freeSpace <= 14){
          howFrequent='lab3'
        } else if (freeSpace <= 28){
          howFrequent='lab2'
        } else {
          howFrequent='lab1'
        }

        var ticks = d3.set(this.state.data.labs.map(function(item) {
          if(item[howFrequent] === 1){
            return item.xRaw;
          } else {
            return -1
          }
        })).values().map(Number).filter(function(x){return(x>=xMin & x<=xMax)});
        var marks ={}
        for(var i=0; i < ticks.length; i++){
          marks[ticks[i]] = {style: muiTheme.brushMarks, label : this.tipFormatter(ticks[i])}
        }
        this.setState({
          brushMarks : marks,
        })
    }
  }

  GetData(){
    var request = new Request(sprintf(this.props.getData+'?type=%s&age=%s&name=%s',this.state.selectedType,this.state.selectedAge, this.state.selectedName), {
      method: 'GET', 
      mode: 'cors', 
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    // Now use it!
    fetch(request)
      .then((responseText) => responseText.json())
      .then((response) => this.setState({
        data: JSON.parse(response)
      }, function(){
        this.CalculateBrushMaxMin()
      }));
  }

  GetNamesFylke(){
    var request = new Request(this.props.getNamesFylke, {
     method: 'GET', 
     mode: 'cors', 
     redirect: 'follow',
     headers: new Headers({
       'Content-Type': 'text/plain'
     })
    });
    // Now use it!
    fetch(request)
      .then((responseText) => responseText.json())
      .then((response) => this.setState({ namesFylke: JSON.parse(response) }));
  }

  GetResults() {
    this.setState({ namesFylke: [3,4] });
  }

  onUpdateSelectType(val){
    var selectedPrettyType = this.state.namesType.filter(function(el){
      return el['value']===val
    })[0]['name']
    this.setState({
      selectedType: val,
      selectedPrettyType: selectedPrettyType
    }, function(){
      this.GetData()
    })
  }

  onUpdateSelectAge(val){
    var selectedPrettyAge = this.state.namesAge.filter(function(el){
      return el['value']===val
    })[0]['name']
    this.setState({
      selectedAge: val,
      selectedPrettyAge: selectedPrettyAge
    }, function(){
      this.GetData()
    })
  }

  onUpdateSelectFylke(val){
  console.log(this.state.namesFylke)
  console.log(val)
    var selectedPrettyName = this.state.namesFylke.filter(function(el) {
      return el['location']===val
    })[0]['locationName']
    this.setState(
      {
        selectedName: val,
        selectedFylke: val,
        selectedPrettyName: selectedPrettyName
      },
      function(){
        this.GetData()
      }
    )
  }

  componentDidMount(){
    this.GetNamesFylke()
    this.GetData()
  }

tipFormatter(val){
    if(this.state.data['data'] == null){
  return(val)
} else {
  return(this.state.data.labs[val-1].label)
}
}

SetBrushValues(val){
  this.setState({brushValues:val}, function(){console.log(this.state.brushValues)})
}

  render(){

    return(
    <div>
        <section id="usage">
        <div className="container">
        <div className="Dashboard-select">
          <LeftSelect info={this.props.info}
              onUpdateType={this.onUpdateSelectType} onUpdateTypeVal={this.state.selectedType} listType={this.state.namesType}
              listAge={this.state.namesAge}
              onUpdateAge={this.onUpdateSelectAge} onUpdateAgeVal={this.state.selectedAge}
              onUpdateFylke={this.onUpdateSelectFylke} onUpdateFylkeVal={this.state.selectedName}
              listFylke={this.state.namesFylke}
              />
        </div>
        </div>
        <br/>
        <br/>
        <div>
        <Measure bounds
          onResize={
            (contentRect) => {
              this.setState(
                {dimensions : contentRect.bounds},
                function(){
                  this.CalculateBrushMarks()
                }
            )}
          }
        >
        {({ measureRef }) =>
            <div ref={measureRef} className="Dashboard-main">
              {renderIf(this.props.type==="Barometer")(
                <Barometer data={this.state.data} brushValues={this.state.brushValues} width={this.state.dimensions.width} />)}
              {renderIf(this.props.type==="Lines")(
                <Lines data={this.state.data} brushValues={this.state.brushValues} width={this.state.dimensions.width} height={window.innerHeight}/>)}
            </div>
           
        }
        </Measure>
        <div className="Dashboard-brush">
        {renderIf(this.state.brushXMax!=10000)(
          <Slider.Range
            min={this.state.brushXMin}
            max={this.state.brushXMax}
            defaultValue={this.state.brushDefaultValues}
            range={true}
            tipFormatter={this.tipFormatter}
            marks={this.state.brushMarks}
            onAfterChange={this.SetBrushValues}
            trackStyle={[{ backgroundColor: muiTheme.color.main}]}
            handleStyle={[{ borderColor: muiTheme.color.main}, { borderColor: muiTheme.color.main}, { borderColor: muiTheme.color.main}]}
            />
          )}
        </div>
        </div>
        </section>
        </div>
       
    );
  }
}

export default App;

//export default App;

