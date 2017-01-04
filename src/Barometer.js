var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')
import Measure from 'react-measure';
import  './reactive.css';

var Barometer = React.createClass({
  render: function () {
    if(this.props.data['data'] == null){
      console.log("BAD")
      return(<h2>Loading...</h2>)
    } else {
      var data = this.props.data['data']
      var dataBrush = this.props.data['brush']
      var labs = this.props.data['labs']
    }

    var colourRange = [ '#91cf60', '#ffffbf', '#fc8d59' ]

    var margin = {top: 20, right: 20, bottom: 50, left: 125}
    var width = this.props.width - margin.left - margin.right + 150
//    var height = 400 - margin.top - margin.bottom
    var parseDate = d3.timeParse('%Y-%m-%d')

    var x_elements = d3.set(data.map(function(item) { return item.xRaw; } )).values();
    var y_elements = d3.set(data.map(function(item) { return item.locationName; } )).values();

    var xMin=d3.min(data.map(function(item){ return item.xRaw }))-2
    var xMax=d3.max(data.map(function(item){ return item.xRaw }))+2

    var cellWidth = width/x_elements.length
    var cellHeight = 20 // height/y_elements.length
    var height = cellHeight*y_elements.length + margin.top + margin.bottom

    var x = d3.scaleLinear()
    .range([0, width])

    var y = d3.scaleBand()
    .range([0, height])

    var colour = d3.scaleOrdinal()
    .range(colourRange)
    .domain([0, 1, 2])

    x.domain([xMin,xMax])
    y.domain(y_elements)

    var node = ReactFauxDOM.createElement('svg')
    var svg = d3.select(node)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    svg.selectAll('rect')
      .data(data)
      .enter().append('g').append('rect')
      .attr('class', 'cell')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('x', function(d) { return x(d.xRaw-0.4) } )
      .attr('y', function(d) { return y(d.locationName) } )
      .attr('fill', function(d) { return colour(d.statusNum) } )
      .attr('fill-opacity', 0.75)
    
    var labTicks = d3.set(labs.map(function(item) {
      if((item.week%13-1) == 0){
        return item.xRaw;
      } else {
        return -1
      }
    })).values().map(Number).filter(function(x){return(x>=xMin & x<=xMax)});

    svg.append('g')
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3.axisBottom(x)
          .tickValues(labTicks)
          .tickFormat(function(d,i){
            return(labs[d-1].week+'/'+labs[d-1].year.slice(-2))
          })
      );

    var yearTicks = d3.set(labs.map(function(item) {
      if(item.week == 1){
        return item.xRaw;
      } else {
        return -1
      }
    })).values().map(Number).filter(function(x){return(x>=xMin & x<=xMax)});
    svg.append('g')
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3.axisBottom(x)
          .tickValues(yearTicks)
          .tickFormat("")
          .tickSizeOuter(-height)
          .tickSizeInner(-height)
      );

    svg.append('g')
      .call(d3.axisLeft(y));

/*
    svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

    svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Price ($)')

    svg.append('path')
    .datum(dataRaw)
    .attr('class', 'line')
    .attr('d', line)
*/
    return (
        node.toReact()
    )
  }
})

export default Barometer;
