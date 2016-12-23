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
    var width = 396 - margin.left - margin.right
    var height = 350 - margin.top - margin.bottom
    var parseDate = d3.timeParse('%Y-%m-%d')

    var x = d3.scaleLinear()
    .range([0, width])

    var y = d3.scaleLinear()
    .range([height, 0])

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

    x.domain(d3.extent(data, function (d) { return d.x }))
    y.domain([0, d3.max(data, function (d) { return d.n })])

    svg.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', areaNormal)
      .attr('fill', 'green')

    svg.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', areaMedium)
      .attr('fill', 'orange')

    svg.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', areaHigh)
      .attr('fill', 'red')

    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', line)
      .attr('stroke', 'black')
      .attr('fill', 'none')

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
