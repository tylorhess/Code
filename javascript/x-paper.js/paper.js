<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/paper.js/0.10.2/paper-full.min.js">

//----- Option 1: JavaScript -----//
<script type="text/javascript">
	window.onload = function() { // only execute code once DOM is ready
	// OR: $(document).ready(function() {
		paper.setup('canvas_id'); // creates empty [Project], binds empty [View] to #canvas_id
		// OR: paper.setup($('canvas_id')); OR: paper.setup(document.getElementById('canvas_id'));
		var path = new paper.Path(); // `paper` is the 1 global object
		path.strokeColor = 'black';
		var start = new paper.Point(100, 100);
		path.moveTo(start);
		var next = start.add([ 200, -50 ]);
		path.lineTo(next);
		paper.view.draw();
	}
<script>
//----- Option 2: PaperScript -----//				// PaperScript extends JavaScript
<script type="text/paperscript" canvas="canvas_id"> // creates empty [Project], binds empty [View] to #canvas_id
//				 or: data-paper-canvas="canvas_id">	// each <script> tag has its own [PaperScope]
	var path = new Path();							// `paper` objects/functions seem global
	path.strokeColor = 'black';
	var start = new Point(100, 100);
	path.moveTo(start);
	path.lineTo(start + [ 100, -50 ]); 				// math operators (+ - * / %) for [Point] and [Size] objects
	// [View].draw();								// automatically handles [View].draw() because [View].onFrame handler is installed
<script>
//----- Option 3: Load PaperScript -----//
<script type="text/paperscript" src="js/myScript.js" canvas="canvas_id">


//////////////////////////////////
////////// [PaperScope] //////////
//////////////////////////////////
// usually: 1 [PaperScope] for whole web app (can still have multiple [Projects])
// usually: 1 [Project] for each [View]/<canvas>
// use global variables (window.myVar) to communicate between scopes
// [PaperScope] = <script>'s scope
// 		[Project] = has 1 [View]/<canvas> and many [Layers]
//		[View] = <canvas>++
//		[Layer] = has many [Items]
//		[Tools] = (mouse?) event handlers?

paper --> [PaperScope]

// setup [PaperScope]
// 		NECESSARY:  for JavaScript
//		NOT NEEDED: for PaperScript (canvas id specified in <>)
paper.setup(canvas); // creates active [Project] with active, empty [Layer] and [View]/<canvas>
paper.setup('canvas_id'); 

paper.project  --> [Project] // currently active [Project]
paper.projects --> [Array] of [Projects] // all open [Projects] within [PaperScope]
paper.view --> [View] // active [Project]'s [View]
paper.tool --> [Tool] // currently active [Tool]
paper.tools --> [Array] of [Tools] // all available [Tools]

paper.settings
paper.settings.insertItems  = (true)|false // automatically add new [Items] to paper.project.activeLayer
paper.settings.applyMatrix  = (true)|false
paper.settings.handleSize   = (4) // curve handle length for selected paths
paper.settings.hitTolerance = (0)

paper.install(scope)
paper.execute(code[, option])
paper.version --> [String]
paper._id --> [Number] // PaperScope id/index
paper.PaperScope.get(id) --> [PaperScope] // returns [PaperScope] object with given id/index

// NEVER NEEDED: create new [PaperScope]
paper = new paper.PaperScope(); // creates new [PaperScope], [Project] object 
paper.setup(canvas);
paper._id --> 1
paper.PaperScope.get(0).activate(); // switch back to original [PaperScope]
// INSTEAD: 
const PROJECT1 = paper.project;
const PROJECT2 = new paper.Project(canvas);
...
PROJECT1.activate(); // switch back to original project
PROJECT2.remove();

///////////////////////////////
////////// [Project] //////////
///////////////////////////////
paper.project --> [Project]

let project = new paper.Project(canvas); // creates [Project] with 1 active, empty [Layer]
            = new paper.Project('canvas_id');

project.active() // so `paper.project` --> this [Project]
project.index --> [Number] // index for `paper.projects[index]`
project.remove() // removes `project` and its [View] from `paper.projects`

project.view --> [View] // a [Project] has 1 [View]/<canvas>

project.activeLayer --> [Layer] // currently active [Layer]
project.layers --> [Array] of [Layers] // a [Project] has many [Layers]
project.addLayer(layer) --> layer
project.insertLayer(index, layer) --> layer // add `layer` at `project.layers[index]`
project.clear() // removes all [Layers]
project.isEmpty() --> [Boolean] // true if `project` has any "content" (Layers? Items?)

project.currentStyle = { // apply style to selected [Items] and newly created [Items]
	fillColor: 'red',
    strokeColor: '#000000',
    strokeWidth: 5
}

project.selectedItems --> [Array] of [Items] // [Items] where `item.selected=true`
project.selectAll()
project.deselectAll()

project.getItems(options)
project.getItem(options)
project.hitTest(point[, options])

project.symbolDefinitions


////////////////////////////
////////// [View] //////////
////////////////////////////
// [View] = wraps an html element (<canvas>)
//        = handles drawing, scrolling, mouse/keyboard user interaction

paper.view --> [View]
paper.project.view --> [View]

view.autoUpdate = (true)|false // auto-update animation frame (vs. manually .update()/.requestUpdate() after changes)
view.element --> <canvas>
view.pixelRatio --> [Number] // ratio between physical pixels and device-independent pixels (DIPs); 1 for normal displays, 2 for high-res displays
view.resolution --> [Number] // if pixelRation = 1, resolution = 72 dpi; if pixelRation = 2, resolution = 144 dpi
view.viewSize --> [Size] // <canvas> size
view.viewSize  =  [Size] // resizes <canvas>
view.bounds --> [Rectangle] // currently visible area (in project's coordinate system)
view.size --> [Size] // size of visible area (in project's coordinate system)
view.center --> [Point] // visible area's center (in project's coordinate system)
view.center  =  [Point] // center the visible area 
view.zoom --> [Number]
view.zoom  =  [Number]
view.matrix

view.remove()
view.update()
view.requestUpdate()
view.play()
view.pause()
view.isVisible()
view.isInserted()

////////////////////////////
////////// [Item] //////////
////////////////////////////
// Inheritance:
// [Item]
//		[Group]
//			[Layer]
//		[PathItem]
//			[Path]
//			[CompoundPath]
//		[Shape]
//		[Raster]
//		[TextItem]
//			[PointText]

/////////////////////////////////////
////////// transformations //////////
/////////////////////////////////////
item|view.translate(delta)
item|view.rotate(angle[, center])
item|view.scale(scale[, center])
item|view.scale(hor, ver[, center])
item|view.shear(shear[, center])
item|view.shear(hor, ver[, center])
item|view.skew(skew[, center])
item|view.skew(hor, ver[, center])
item|view.transform(matrix)

item.globalToLocal(point)
item.localToGlobal(point)
item.parentToLocal(point)
item.localToParent(point)
item.fitBounds(rectangle[, fill])

view.projectToView(point)
view.viewToProject(point)
view.getEventPoint(event)


/////////////////////////////
////////// [Event] //////////
/////////////////////////////

// all events
	event.timeStamp --> [Number] // in milliseconds
	event.modifiers.shift|control|alt|meta|capsLock = false|true // keyboard state
	event.preventDefault()
	event.stopPropagation()
	event.stop()

item|view.onMouseDown   = function(mouseEvent){}
item|view.onMouseDrag   = function(mouseEvent){}
item|view.onMouseUp     = function(mouseEvent){}
item|view.onClick       = function(mouseEvent){}
item|view.onDoubleClick = function(mouseEvent){}
item|view.onMouseEnter  = function(mouseEvent){}
item|view.onMouseMove   = function(mouseEvent){}
item|view.onMouseLeave  = function(mouseEvent){}
	mouseEvent.type --> 'mousedown'|'mouseup'|'mousedrag'|'click'|'doubleclick'|'mousemove'|'mouseenter'|'mouseleave'
	mouseEvent.point --> [Point] // mouse position
	mouseEvent.target --> [Item] // [Item] that dispactched event
	mouseEvent.currentTarget
	mouseEvent.delta --> [Point]

item|view.onFrame = function(event){}
	event.count --> [Number] // total number of times the frame event was fired
	event.time  --> [Number] // total amount of time (in seconds) passed since first frame event fired 
	event.delta --> [Number] // time (in seconds) since last frame event fired

view.onResize = function(event){}

item|view.on(type, function(){})
item|view.on(param)
item|view.off(type, function(){})
item|view.off(param)
item|view.emit(type, event)
item|view.responds(type)

item.removeOn(options)
item.removeOnMove()
item.removeOnDown()
item.removeOnDrag()
item.removeOnUp()
item.hitTestAll(point[, options])

////////////////////////////////////////////
////////// JSON/SVG export/import //////////
////////////////////////////////////////////
item|project.exportJSON([options])
item|project.importJSON(json)
item|project.exportSVG([options])
item|project.importSVG(svg[, options])
item|project.importSVG(svg, onLoad)


// Paper.js doesn't really have ctx.getImageData(), 
// but it supports rasterizing any item into a Raster.
// You can then [Raster].getImageData(rect) (undocumented)
var group = new Group( new Path.Circle({[100,100],100}), new Path.Rectangle({[100,100],[200, 200]}) ); 
var raster = group.rasterize();
var raster = item.rasterize();
var imageData = raster.getImageData(); 


