

<div ng-app="">
	// this div and anything inside it "belongs to" given ng-app

	// binding
	//		there are a lot of things you shouldn't do inside of {{}}
	//		keep logic inside {{}} to a minimum
	{{2+2}} 	// = 4

	<input type="text" ng-model="data.message">
	<p>{{data.message}}</p>	// displays text input (updates every keypress)
</div>