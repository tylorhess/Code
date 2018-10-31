//------ selection ------//
d3.select('body') --> <body> // uses any valid CSS3 selector: '#id', '.class', ...
d3.selectAll('div') --> [<div>, <div>, ...]

var svg = d3.select('#componentName').append('svg') --> <svg> // returns <svg> element

d3.select('rect')[0][0] 		 --> <rect ... />
d3.select('rect')[0][0].__data__ --> d // datapoint
/* same */ <rect ... />.__data__ --> 5
								 --> [12, 827]
								 --> {x:12, y:827}

//-------- filter --------//
d3.selectAll('rect')
	.filter(function(d,i) {
		return d.x < 50;
	})

//--------- call ---------//
// helps modularize/clean-up code 				// same as...
d3.selectAll('rect')							d3.selectAll('rect')
	.call(func)										.attr('class', 'className')
function func(selection) {							.style('color', 'red')
	selection										...
		.attr('class', 'className')
		.style('color', 'red')
		...
}

// accepts additional arguments (arg1, arg2)
d3.selectAll('rect')
	.call(func, arg1, arg2)
function func(selection, arg1, arg2) {
	selection
		.attr('class', 'className')
		...
}

// remove call???

//-------- margins --------//
// well-established way to deal with margins
// margins make room for axis
var margin = {top: 25, right: 0, bottom: 20, left: 40};
var width  = 400 - margin.left - margin.right;
var height = 300 - margin.top  - margin.bottom;

var svg = d3.select('#componentName')
	.append('svg')
		.attr('width',  width  + margin.left + margin.right )
		.attr('height', height + margin.top  + margin.bottom)
		.append('g')
			.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
svg --> <g> // NOT: <svg> (because of margins)

//---------- data ----------//
svg.selectAll('rect')			--> [Array of <rect>]	// <rect> in <svg>
	.attr(...)					// modifies all <rect> in <svg> === all bound <rect>, if all <rect> are bound
	.data(dataset)				--> [Array of <rect>]	// <rect> bound to 'dataset'
		.attr(...)				// modifies <rect> bound to 'dataset'
		.enter().append('rect')	--> [Array of <rect>]	// creates & binds new <rect> to each unbound 'datapoint' (datapoint not already bound to a <rect>)
			.attr(...)			// modifies new (previously-unbound) <rect>
		.exit() 				--> [Array of <rect>]	// <rect> NOT bound to 'dataset'
			.attr(...)			// modifies old unbound <rect>
			.remove()			// removes  old unbound <rect>

svg.selectAll('rect').data(dataset)
	.enter().append('rect') // create a new <rect> for each 'datapoint' not already bound to a <rect>
		.attr('class', 'className')
		.attr('width', xScale.rangeBand()) // .rangeBand() = range / (# items in domain)
		.attr('x', function(d, i) { // d = datapoint bound to <rect>; i = index of <rect> in .selectAll('rect') array
			return xScale(d);
		})
		.attr('height', yScale(d))
		.attr('y', function(d, i) { // d = datapoint bound to <rect>; i = index of <rect> in .selectAll('rect') array
			return height - yScale(d);
		})
		.attr('fill', colorScale)
		.on('mouseover', function(d) {
			d3.select(this).classed('className', true)
			/* alternatively */ d3.select(this).style('fill', 'red')
		})
		.on('mouseover', function(d) {
			d3.select(this).classed('className', false)
		})


//--------- max/min ---------//
var dataset = [0, 5, 15, 25];
d3.max(dataset) --> 25

var dataset = [ {x:10,y:15,r:3}, {x:25,y:11,r:7}, ... ];
d3.min(dataset, function(d) { return d.r; }) --> 3


//---------- scale ----------//
// extent
d3.extent(dataset) --> [d3.min(dataset), d3.max(dataset)]

// linear
var yScale = d3.scale.linear()
	//.domain([padding * d3.min(dataset), d3.max(dataset)] * padding)	// padding
	.domain(d3.extent(dataset)) // input  (dataset)
	.range( [0, height])		// output (y-coordinate)
yScale(Math.avg(dataset)) --> 0.5 * height

var colorScale = d3.scale.linear()
	.domain(d3.extent(dataset))
	.range(["yellow", "green"])
colorScale(d) --> heatmap // heatmap = continuous (NOT discrete); d = datapoint

// ordinal = "evenly-spaced" (like the bars in a bar graph)
var xScale = d3.scale.ordinal()
	.domain(dataset) 	// create 1 item in domain for each item in 'dataset'
	.range([0, width], pbb, pob)	// pbb = 0.0-1.0 padding between bands; pob = padding outside bands
xScale(d) --> <rect x="{{xScale(d)}}"> // d = datapoint
xScale.rangeBand() --> function? // bar width ~= (width / dataset.length) * (1.0-pbb)

// quantize = 
var colorScale = d3.scale.quantize()
	.domain([0, dataset.length])
	.range(["yellow", "orange", "green"])
colorScale(index) --> "yellow" 	// for the first  third of items	// index = index of datapoint (in dataset)
				  --> "orange"	// for the middle third of items
				  --> "green"	// for the last   third of items

// quantile = 
var colorScale = d3.scale.quantile()
	.domain([0, (0.10*dataset.length), dataset.length]) // [0, 10% * dataset.length] + [10% * dataset.length, dataset.length]
	.range(["orange", "blue", "yellow", "green"])		// ["orange", "blue"]          ["yellow", "green"]
colorScale(index) --> "orange" 	// for  0% -   5% 		// index = index of datapoint (in dataset)
				  --> "blue" 	// for  5% -  10%
				  --> "yellow"	// for 10% -  55%
				  --> "green"	// for 55% - 100%

//--------- axis ---------//
var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom') 	// numbers below axis (rather than above axis)
	.ticks(10)			// # of ticks (NOT tick spacing)
svg.append('g')
	.attr('class', 'x_axis')
	.attr('transform', 'translate('+0+','+height+')') // moves x-axis to bottom
	.call(xAxis)

//--------- line ---------//
var dataset  = [{x:1,y:9},{x:2,y:7},...];
var xDataset = _.pluck(dataset.x); --> [1, 2, ...]
var yDataset = _.pluck(dataset.y); --> [9, 7, ...]
var xScale = d3.scale.linear()
	.domain(d3.extent(xDataset))
	.range([width,0])
var yScale = d3.scale.linear()
	.domain(d3.extent(yDataset))
	.range([0,height])
var line = d3.svg.line()
	.intepolate('bundle') // line w/ smooth curves
	.x(function(d) { return xScale(d.x); })
	.y(function(d) { return yScale(d.y); })
var path = d3.select('#chart')
	.append('svg').attr('width', '100%').attr('height', '100%')
		.append('g')
			.append('path');
path.datum(dataset)
	.transition()
	.duration(1000)
	.attr('d', line) --> <path d="{{ line }}">


//----- transitions -----//
svg.selectAll('rect')
	.attr(...)		// change attributes (without transition)
	.transition()
		.delay(1000)	// 1000 milliseconds === 1 second
		.delay(function(d,i) {...})
		.duration(1000) // (required)
		.ease('linear')	// (default)'linear'|'quad'|'cubic'|'exp'|'elastic'|'bounce'|'back'|'sin'|'circle'
		.attr(...)		// change attributes (with transition)
	.transition() 	// starts after previous .transition() ends
		.duration(1000) // (required)

//--------- zoom ---------//
// pan + zoom
var zoomListener = d3.behavior.zoom()	// create zoom listener 
	.scaleExtent([0.25, 4])				// limits zoom
	.on("zoom", onzoom);				// attach onzoom event to zoom listener
function onzoom() { // create onzoom event
	var trans = d3.event.translate; // var transX = trans[0]; var transY = trans[1];
	var scale = d3.event.scale;
	
	// limit panning [Note: there is no .translateExtent()]
	if (trans[0] > 0) trans[0] = 0;	// left wall
	if (trans[1] > 0) trans[1] = 0; // top  wall
	if (trans[0]-width  < -( width*scale) ) trans[0] = -( width*scale-width ); // right  wall
	if (trans[1]-height < -(height*scale) ) trans[1] = -(height*scale-height); // bottom wall
	//trans[0] = 0; // disable panning in the x-direction
	//trans[1] = 0; // disable panning in the y-direction
	zoomListener.translate(trans);
	
	// geometric zooming = "normal" zooming
	g.attr("transform", "translate(" + trans + ")scale(" + scale + ")"); // zoom in on <g>...</g>
	// semantic  zooming = as you zoom in, circles remain the same size (seemingly decrease in size)
	g.selectAll('circle').attr('r', radius/scale);
}
svg.call(zoomListener);		// attach zoomListener to <svg> parent
// gParent.append("rect") 	// (Note: to attach zoomListener to <g> parent, you must attach to <rect> overlay)
// 	.attr("width",  width)
// 	.attr("height", height);
// 	.attr("class", "overlay") // === .style("fill", "none").style("pointer-events", "all")
// 	.call(zoomListener);

// remove zoom listeners
svg.on(".zoom", null);

//-------- random --------//
// uniform distribution
Math.floor(Math.random() * (max+1)) + min

// normal distribution
d3.random.normal(mean) // deviation = 1 (by default)
d3.random.normal(mean, deviation)

// log-normal distribution
d3.random.logNormal(mean) // deviation = 1 (default)
d3.random.logNormal(mean, deviation)
// Bates distribution
d3.random.bates(count)
// Irwin-Hall distribution
d3.random.irwinHall(count)

//--------- drag ---------//			// Note: drag functions (dragstart, drag, dragend) don't stack
// create dragListener					//       (can only have 1 assignment: dragstart = ondragstart)
var dragListener = d3.behavior.drag()	//       (which is why dragstart = null removes listener     )
		.on("dragstart", ondragstart)
		.on("drag",      ondrag     )
		.on("dragend",   ondragend  )
svg.call(dragListener);

// remove dragListener
svg.on('.drag', null);
// svg.on("dragstart", null) 
//    .on("drag",      null)
//    .on("dragend",   null)

//--------- time ---------//
var date = new Date();
d3.time.format('%Y%m%d').parse(date);
