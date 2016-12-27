var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')

var Barometer = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },
  render: function () {
    var data = this.props.data

    var colourRange = [ 'green', 'yellow', 'red' ]

    var margin = {top: 20, right: 20, bottom: 30, left: 50}
    var width = 500 - margin.left - margin.right
    var height = 350 - margin.top - margin.bottom
    var parseDate = d3.timeParse('%Y-%m-%d')

    var x_elements = d3.set(data.map(function(item) { return item.xRaw; } )).values();
    var y_elements = d3.set(data.map(function(item) { return item.locationName; } )).values();

    var cellWidth = width/x_elements.length
    var cellHeight = height/y_elements.length

    var x = d3.scaleLinear()
    .range([0, width])

    var y = d3.scaleBand()
    .range([0, height])

    var colour = d3.scaleOrdinal()
    .range(colourRange)
    .domain(['Normal', 'Medium', 'High'])

    x.domain(d3.extent(data, function(d) { return d.xRaw } ))
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
      .attr('x', function(d) { return x(d.xRaw) } )
      .attr('y', function(d) { return y(d.locationName) } )
      .attr('fill', function(d) { return colour(d.status) } )

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
    .datum(dataRaw)
    .attr('class', 'line')
    .attr('d', line)
*/
    return node.toReact()
  }
})

export default Barometer;
