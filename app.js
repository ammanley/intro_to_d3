
// ### Setting up canvas ###
var margin = {top: 20, right: 10, bottom: 20, left: 10};
// Set desired margin vars
var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
// Set H and W vars to be desired values that respect the margins placed 
// in the margin object
var svg = d3.select('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
// Sets SVG "canvas" to be W/H enough to hold W/H + margins
var padding = 50
// ### Setting up scaling ###
var xMin = d3.min(movies, d => d.daysOpen)
var xMax = d3.max(movies, d=> d.daysOpen)
var yMin = d3.min(movies, d => d.total)
var yMax = d3.max(movies, d => d.total)

var xScale = d3.scaleLinear()
				.domain([xMin, xMax])
				.range([padding,width - padding]);
var yScale = d3.scaleLinear()
				.domain([yMin, yMax])
				// .range([padding,height - padding]) //This is the default//
				.range([height - padding, padding]) //this is for human reading//

var colorScale = d3.scaleLinear()
				.domain([0, 1])
				.range(['red','green']);
// ### CIRCLES ###
svg.selectAll('circle')
	.data(movies)
	.enter()
	.append('circle')
	.attr('cx', d =>  xScale(d.daysOpen)   )
	.attr('cy', d => yScale(d.total)   )
	.attr('r' , d => d.total/d.daysOpen * 10)
	.attr('fill', d => colorScale(d.freshness) )
	.attr('name', d => d.title)
	
// .on("mouseout", function(d)
//  {
//      d3.select(labels[0][d.index]).style("visibility","hidden")
//  })

//### Axis ###

var bottomScale = d3.scaleLinear()
                        .domain([xMin,xMax])
                        .range([padding,width + padding]);

var leftScale = d3.scaleLinear()
						.domain([yMax, yMin])
						.range([0, height - 20])

var xAxis = d3.axisBottom()
                  .scale(bottomScale)

var yAxis = d3.axisLeft()
					.scale(leftScale)

svg.append("g")
	.attr("transform", `translate(0, ${height})`)
    .call(xAxis);
                  
svg.append('g')
	.attr('transform',`translate(35,0)`)
	.call(yAxis)

//### Hover Tooltip ###
$('circle').on('click', function(e) {
	console.log($(e.target).attr('name'))
})
