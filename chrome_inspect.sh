"Chrome inspect" = Chrome Developer Tools 

Shortcuts:
	cmd + opt + i 		toggle Chrome Developer Tools 

Tabs:
	🔍 			toggle: hover-over to select html element
	📱			as if viewing on mobile device or tablet
	Elements	html elements
		double-click & right-click to edit
		drag-and-drop to reorder
		[delete] to delete
	Network
		⃠ = clear
		blue verticle line = DOMContentLoaded event
		red  verticle line = load event
		Name (column) > Header  = http header
		Name (column) > Preview = view images/assets
		Initiator = what file/line told the browser to download the asset
	Sources
		cmd + s 		= save (in memory, to "History" tab)
		cmd + shift + s = save as... (download file)
		right-click > "Local Modifications"	> "History" tab = log/revert-to each (cmd + s)
	Timeline
		[record] button
			Events
			Frames
			Memory = if grows over time, memory leak
	Profiles
		[record] button 
		[Start] 		Collect JavaScript CPU Profile
		[Take Snapshot] Take Heap Snapshot (compare heap snapshots to check for memory leaks)
		[Start] 		Record Heap Allocations
