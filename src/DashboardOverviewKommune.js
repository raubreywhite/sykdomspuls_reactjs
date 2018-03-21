import React, { Component } from 'react';
import Measure from 'react-measure';
import 'rc-slider/assets/index.css';
import BarometerTop from './BarometerTop.js'
import renderIf from 'render-if'
import {GridList, GridTile} from 'material-ui/GridList';
import AutoComplete from 'material-ui/AutoComplete';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }
  
  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };
  
  handleNewRequest = (searchText, searchIndex) => {
      console.log(searchIndex)
      if(searchIndex!==-1){
        console.log(searchText)
        this.props.SetSelectedName(searchText.location)
      } else {
        this.setState({
          errorText: "Velg fra listen",
        })
      }
    
    
  };
  
  

  render(){
  
    const namesKommuneConfig = {
      text: 'locationName',
      value: 'location',
    };
    
    return(
        <div>
        <section id="usage">
        <div className="container">
        <div className="Dashboard-select">
        <div className="Dashboard-select-header">
        <div className="Dashboard-info-autocomplete">
        {this.props.info}
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
          dataSource={this.props.namesKommune}
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
            {renderIf(this.props.selectedName!=="")(
            <BarometerTop
              
              data={this.props.data}
              width={this.state.dimensions.width}
              height={window.innerHeight}
            />
            )}
            </div>
           
        }
        </Measure>
        </section>
      </div>
);
  }
}

export default App;

//export default App;

