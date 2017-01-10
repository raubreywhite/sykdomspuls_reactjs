var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')
import  './reactive.css';

var Barometer = React.createClass({
getInitialState:function () {
    return {
   brushMin: -1,
  brushMax: -1   
    };
 },
  render: function () {
    if(this.props.data['data'] == null || this.props.brushValues == null){
      return(<h3>Loading...</h3>)
    } else {
      var brushValues = this.props.brushValues
console.log(brushValues)
     var data = this.props.data['data'].filter(function(x){return(
          x.xRaw>= brushValues[0] && x.xRaw <= brushValues[1]
        )})
     var dataBrush = this.props.data['brush']
      var labs = this.props.data['labs']
    }

    var colourRange = [ '#91cf60', '#ffffbf', '#fc8d59' ]

    var mainMargin = {top:0, right: 20, bottom: 20, left: 125}
    var width = this.props.width - mainMargin.left - mainMargin.right + 150
//    var height = 400 - margin.top - margin.bottom

    var x_elements = d3.set(data.map(function(item) { return item.xRaw; } )).values();
    var y_elements = d3.set(data.map(function(item) { return item.locationName; } )).values();

    var xMin=d3.min(data.map(function(item){ return item.xRaw }))-1
    var xMax=d3.max(data.map(function(item){ return item.xRaw }))+1

    var brushXMin=d3.min(dataBrush.map(function(item){ return item.xRaw }))-1
    var brushXMax=d3.max(dataBrush.map(function(item){ return item.xRaw }))+1

    var cellWidth = width/x_elements.length
    var cellHeight = 20 // height/y_elements.length
    var mainHeight = cellHeight*y_elements.length

    var brushMargin = {top: 20, right: 20, bottom: 0, left: 125}
    var brushHeight = 40

    var height=mainHeight+mainMargin.top+mainMargin.bottom+brushHeight+brushMargin.top + brushMargin.bottom

    var x = d3.scaleLinear()
    .range([0, width])

    var y = d3.scaleBand()
    .range([0, mainHeight])

    var colour = d3.scaleOrdinal()
    .range(colourRange)
    .domain([0, 1, 2])

    x.domain([xMin,xMax])
    y.domain(y_elements)

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
      .attr('x', function(d) { return x(d.xRaw-0.4) } )
      .attr('y', function(d) { return y(d.locationName) } )
      .attr('fill', function(d) { return colour(d.statusNum) } )
      .attr('fill-opacity', 0.6)
    
    var howFrequent=26
    var freeSpace = width/(xMax-xMin+1)
    console.log(freeSpace)
    if(freeSpace <=2){
      howFrequent=52
    } else if(freeSpace <= 4){
      howFrequent=26
    } else if (freeSpace <= 6){
      howFrequent=13
    } else if (freeSpace <= 8){
      howFrequent=8
    } else if (freeSpace <= 14){
      howFrequent=4
    } else {
      howFrequent=2
    }
    var labTicks = d3.set(labs.map(function(item) {
      if((item.week%howFrequent-1) === 0){
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
            return(labs[d-1].week+'/'+labs[d-1].year.slice(-2))
          })
          .tickSizeOuter(0)
      );

    var yearTicks = d3.set(labs.map(function(item) {
      if(item.week === 1){
        return item.xRaw;
      } else {
        return -1
      }
    })).values().map(Number).filter(function(x){return(x>=xMin & x<=xMax)});
    mainGraph.append('g')
      .attr("transform", "translate(0," + mainHeight + ")")
      .style('stroke-dasharray', '2 2')
      .call(
        d3.axisBottom(x)
          .tickValues(yearTicks)
          .tickFormat("")
          .tickSizeOuter(-mainHeight)
          .tickSizeInner(-mainHeight)
      );

    mainGraph.append('g')
      .call(
        d3.axisLeft(y)
          .tickSizeOuter(0)
          .tickSizeInner(0)
      );

    mainGraph.append('g')
      .style('stroke-dasharray', '2 2')
      .call(
        d3.axisLeft(y)
          .tickSizeOuter(0)
          .tickSizeInner(-width)
      );

    var brushX = d3.scaleLinear()
    .range([0, width])
    .domain([brushXMin, brushXMax])
    var brushY = d3.scaleLinear()
    .range([brushHeight, 0])
    .domain([0, d3.max(dataBrush, function(d) { return d.n } ) ])

    var line = d3.line()
    .x(function (d) { return brushX(d.xRaw) })
    .y(function (d) { return brushY(d.n) })

    var brushGraph=svg.append('g')
    .attr('transform', 'translate(' + brushMargin.left + ',' + (mainHeight+mainMargin.bottom+brushMargin.top) + ')')

    brushGraph.append('path')
      .data([dataBrush])
      .attr('class', 'line')
      .attr('d', line)
      .attr('stroke', 'black')
      .attr('fill', 'none')
/*
    brushGraph.append('g')
      .attr("transform", "translate(0," + brushHeight + ")")
      .call(
        d3.axisBottom(x)
          .tickValues(labTicks)
          .tickFormat(function(d,i){
            return(labs[d-1].week+'/'+labs[d-1].year.slice(-2))
          })
      );
*/
    return (
        node.toReact()
    )
  }
})

export default Barometer;
