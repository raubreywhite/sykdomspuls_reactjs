import CircularProgress from 'material-ui/CircularProgress';
import {muiTheme} from './Styles'
import {legendColor}  from 'd3-svg-legend';
var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')


var Barometer = React.createClass({
getInitialState:function () {
    return {
   brushMin: -1,
  brushMax: -1   
    };
 },
  render: function () {
    if(this.props.data == null){
      return(
      <div className="Dashboard-loading">
      <CircularProgress size={100} color={muiTheme.progress.color} />
      </div>
      )
    } else {
      var data = this.props.data['data']
      var labs = this.props.data['labs']
      var titleMain = this.props.data['titleMain']
    }

    var colourRange = [ '#91cf60', '#ffffbf', '#fc8d59' ]

    var mainMargin = {top:20, right: 0, bottom: 20, left: 100}
    var width = this.props.width - mainMargin.left - mainMargin.right
//    var height = 400 - margin.top - margin.bottom

    var x_elements = d3.set(data.map(function(item) { return item.xRaw; } )).values();
    var y_elements = d3.set(data.map(function(item) { return item.locationName; } )).values();

    var xMin=d3.min(data.map(function(item){ return item.xRaw }))
    var xMax=d3.max(data.map(function(item){ return item.xRaw }))+1

    var cellWidth = width/x_elements.length
    var cellHeight = 20 // height/y_elements.length
    var mainHeight = cellHeight*y_elements.length

    var height=mainHeight+mainMargin.top+mainMargin.bottom

    var howFrequent=''
    var freeSpace = width/(xMax-xMin+1)
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

    var x = d3.scaleLinear()
    .range([0, width])
    .domain([xMin,xMax])

    var y = d3.scaleBand()
    .range([0, mainHeight])
    .domain(y_elements)

    var colour = d3.scaleOrdinal()
    .range(colourRange)
    .domain([0, 1, 2])

    var yLinesScale = d3.scaleLinear()
    .range([0, mainHeight])
    .domain([0,y_elements.length])
    
    var yLinesValues = [];
    for (var i = 1; i <= y_elements.length; i++) {
       yLinesValues.push(i);
    }


    var node = ReactFauxDOM.createElement('svg')
    var svg = d3.select(node)
    .attr('width', width + mainMargin.left + mainMargin.right)
    .attr('height', height)

    var mainGraph=svg.append('g')
    .attr('transform', 'translate(' + mainMargin.left + ',' + mainMargin.top + ')')

    mainGraph.selectAll('rect')
      .data(data)
      .enter().append('g').append('rect')
      .attr('class', 'cell')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('x', function(d) { return x(d.xRaw) } )
      .attr('y', function(d) { return y(d.locationName) } )
      .attr('fill', function(d) { return colour(d.statusNum) } )
      .attr('fill-opacity', 0.6)
/*
    mainGraph.append('g')
      .attr('transform', 'translate(20,20)')
      .call(
        legendColor()
        .shape("path", d3.symbol().type(d3.symbolTriangle).size(150)())
        .shapePadding(10)
        .scale(colour)
      )
*/    
    var labTicks = d3.set(labs.map(function(item) {
      if(item[howFrequent] === 1){
        return item.xRaw+0.5;
      } else {
        return -1
      }
    })).values().map(Number).filter(function(x){return(x>=xMin & x<=xMax)});
    
    var labLines = d3.set(labs.map(function(item) {
      if(item[howFrequent] === 1){
        return item.xRaw;
      } else {
        return -1
      }
    })).values().map(Number).filter(function(x){return(x>=xMin & x<=xMax)});

    mainGraph.append('g')
      .attr("transform", "translate(0," + mainHeight + ")")
      .call(
        d3.axisBottom(x)
          .tickValues(labTicks)
          .tickFormat(function(d,i){
            return(labs[d-0.5-1].label)
          })
          .tickSizeOuter(0)
      );

    mainGraph.append('g')
      .attr("transform", "translate(0," + mainHeight + ")")
      .style('stroke-dasharray', '2 2')
      .call(
        d3.axisBottom(x)
          .tickValues(labLines)
          .tickFormat("")
          .tickSizeOuter(-mainHeight)
          .tickSizeInner(-mainHeight)
      );

    mainGraph.append('g')
      .call(
        d3.axisLeft(y)
          .tickSizeOuter(0)
      );

    mainGraph.append('g')
      .style('stroke-dasharray', '2 2')
      .call(
        d3.axisLeft(yLinesScale)
          .tickValues(yLinesValues)
          .tickFormat("")
          .tickSizeOuter(0)
          .tickSizeInner(-width)
      );
      
    mainGraph.append('text')
      .attr("x", (width / 2))
      .attr("y", 0 - (mainMargin.top / 2))
      .attr("text-anchor", "middle")
      .text(titleMain);


    return (
        node.toReact()
    )
  }
})

export default Barometer;
