var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')

var Lines = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },
  render: function () {
    var data = this.props.data

    var margin = {top: 20, right: 20, bottom: 30, left: 50}
    var width = 500 - margin.left - margin.right
    var height = 350 - margin.top - margin.bottom
    var parseDate = d3.timeParse('%Y-%m-%d')

    var x = d3.scaleLinear()
    .range([0, width])

    var y = d3.scaleLinear()
    .range([height, 0])

    x.domain(d3.extent(data, function (d) { return d.x }))
    y.domain([0, d3.max(data, function (d) { return Math.max(d.threshold4, d.n) })])

    var line = d3.line()
    .x(function (d) { return x(d.x) })
    .y(function (d) { return y(d.n) })

    var areaNormal = d3.area()
      .x(function (d) { return x(d.x) })
      .y0(height)
      .y1(function (d) { return y(d.threshold2) })
     
    var areaMedium = d3.area()
      .x(function (d) { return x(d.x) })
      .y0(function (d) { return y(d.threshold2) })
      .y1(function (d) { return y(d.threshold4) })
     
    var areaHigh = d3.area()
      .x(function (d) { return x(d.x) })
      .y0(function (d) { return y(d.threshold4) })
      .y1(0) 
 

    var node = ReactFauxDOM.createElement('svg')
    var svg = d3.select(node)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    
    svg.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', areaNormal)
      .attr('fill', '#91cf60')
      .attr('fill-opacity', 0.75)

    svg.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', areaMedium)
      .attr('fill', '#ffffbf')
      .attr('fill-opacity', 0.75)

    svg.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', areaHigh)
      .attr('fill', '#fc8d59')
      .attr('fill-opacity', 0.75)

    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', line)
      .attr('stroke', 'black')
      .attr('fill', 'none')

    svg.selectAll('dot')
      .data(data)
      .enter().append("circle")
      .attr('r', 3)
      .attr('cx', function(d) { return x(d.x); })
      .attr('cy', function(d) { return y(d.n); })
      .attr('fill-opacity', function(d) { if(d.n >= d.threshold2){ return 1 } else { return 0 } })

    svg.selectAll('dot')
      .data(data)
      .enter().append("circle")
      .attr('r', 2)
      .attr('cx', function(d) { return x(d.x); })
      .attr('cy', function(d) { return y(d.n); })
      .attr('fill', '#ffffbf')
      .attr('fill-opacity', function(d) { if(d.n >= d.threshold2 && d.n < d.threshold4){ return 1 } else { return 0 } })

    svg.selectAll('dot')
      .data(data)
      .enter().append("circle")
      .attr('r', 2)
      .attr('cx', function(d) { return x(d.x); })
      .attr('cy', function(d) { return y(d.n); })
      .attr('fill', '#fc8d59')
      .attr('fill-opacity', function(d) { if(d.n >= d.threshold4){ return 1 } else { return 0 } })

    svg.append('g')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

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
    .datum(data)
    .attr('class', 'line')
    .attr('d', line)
*/
    return node.toReact()
  }
})

export default Lines;
