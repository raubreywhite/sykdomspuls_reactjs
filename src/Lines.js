var d3 = require('d3')
var React = require('react')
var ReactFauxDOM = require('react-faux-dom')

var Lines = React.createClass({
  render: function () {
    if(this.props.data['data'] == null || this.props.brushValues == null){
      return(<h3>Laster...</h3>)
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

    var mainMargin = { top:0, right: 20, bottom: 20, left: 125}
    var width = this.props.width - mainMargin.left - mainMargin.right + 150

    var xMin=d3.min(data.map(function(item){ return item.xRaw }))-1
    var xMax=d3.max(data.map(function(item){ return item.xRaw }))+1

    var brushXMin=d3.min(dataBrush.map(function(item){ return item.xRaw }))-1
    var brushXMax=d3.max(dataBrush.map(function(item){ return item.xRaw }))+1

    var mainHeight = 500

    var brushMargin = {top: 20, right: 20, bottom: 0, left: 125}
    var brushHeight = 40

    var height=mainHeight+mainMargin.top+mainMargin.bottom+brushHeight+brushMargin.top + brushMargin.bottom
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

    var dotSizeBlack = Math.log2(freeSpace)*0.8+3
    var dotSizeColour = Math.log2(freeSpace)*0.5+2

    var x = d3.scaleLinear()
    .range([0, width])

    var y = d3.scaleLinear()
    .range([mainHeight, 0])

    x.domain([xMin, xMax])
    y.domain([0, d3.max(data, function (d) { return 1.05*(2+Math.max(d.threshold4, d.n)) })])

    var line = d3.line()
    .x(function (d) { return x(d.xRaw) })
    .y(function (d) { return y(d.n) })

    var areaNormal = d3.area()
      .x(function (d) { return x(d.xRaw) })
      .y0(mainHeight)
      .y1(function (d) { return y(d.threshold2) })
     
    var areaMedium = d3.area()
      .x(function (d) { return x(d.xRaw) })
      .y0(function (d) { return y(d.threshold2) })
      .y1(function (d) { return y(d.threshold4) })
     
    var areaHigh = d3.area()
      .x(function (d) { return x(d.xRaw) })
      .y0(function (d) { return y(d.threshold4) })
      .y1(0) 
 
    var node = ReactFauxDOM.createElement('svg')
    var svg = d3.select(node)
    .attr('width', width + mainMargin.left + mainMargin.right)
    .attr('height', height)

    var mainGraph = svg.append('g')
    .attr('transform', 'translate(' + mainMargin.left + ',' + mainMargin.top + ')')
    
    mainGraph.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', areaNormal)
      .attr('fill', '#91cf60')
      .attr('fill-opacity', 0.6)

    mainGraph.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', areaMedium)
      .attr('fill', '#ffffbf')
      .attr('fill-opacity', 0.6)

    mainGraph.append('path')
      .data([data])
      .attr('class', 'area')
      .attr('d', areaHigh)
      .attr('fill', '#fc8d59')
      .attr('fill-opacity', 0.6)

    mainGraph.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', line)
      .attr('stroke', 'black')
      .attr('fill', 'none')

    mainGraph.selectAll('dot')
      .data(data.filter(function(d){ return (d.n>=d.threshold2 || freeSpace>6)}))
      .enter().append("circle")
      .attr('r', dotSizeBlack)
      .attr('cx', function(d) { return x(d.xRaw); })
      .attr('cy', function(d) { return y(d.n); })
//      .attr('fill-opacity', function(d) { if(d.n >= d.threshold2 || freeSpace>6){ return 1 } else { return 0 } })

    mainGraph.selectAll('dot')
      .data(data.filter(function(d){ return(d.n>=d.threshold2 && d.n < d.threshold4)}))
      .enter().append("circle")
      .attr('r', dotSizeColour)
      .attr('cx', function(d) { return x(d.xRaw); })
      .attr('cy', function(d) { return y(d.n); })
      .attr('fill', '#ffffbf')
//      .attr('fill-opacity', function(d) { if(d.n >= d.threshold2 && d.n < d.threshold4){ return 1 } else { return 0 } })

    mainGraph.selectAll('dot')
      .data(data.filter(function(d){ return(d.n>= d.threshold4)}))
      .enter().append("circle")
      .attr('r', dotSizeColour)
      .attr('cx', function(d) { return x(d.xRaw); })
      .attr('cy', function(d) { return y(d.n); })
      .attr('fill', '#fc8d59')
//      .attr('fill-opacity', function(d) { if(d.n >= d.threshold4){ return 1 } else { return 0 } })

    var labTicks = d3.set(labs.map(function(item) {
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
            return(labs[d-1].label)
          })
          .tickSizeOuter(0)
      );

    var yearTicks = d3.set(labs.map(function(item) {
      if(item.vlines === 1){
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

    var brushLine = d3.line()
    .x(function (d) { return brushX(d.xRaw) })
    .y(function (d) { return brushY(d.n) })

    var brushGraph=svg.append('g')
    .attr('transform', 'translate(' + brushMargin.left + ',' + (mainHeight+mainMargin.bottom+brushMargin.top) + ')')

    brushGraph.append('path')
      .data([dataBrush])
      .attr('class', 'line')
      .attr('d', brushLine)
      .attr('stroke', 'black')
      .attr('fill', 'none')

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

export default Lines;
