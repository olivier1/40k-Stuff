on("chat:message", function(msg) {
	if(msg.type=="api" && msg.content.indexOf('!setlighting')!==-1 && msg.who.indexOf("(GM)") !== -1){
		var param= msg.content.split(" ");
		var lightRadius=parseInt(param[1]);
		var dimRadius=parseInt(param[2]);
		_.each(msg.selected, function(selected) {
			var obj = getObj("graphic", selected._id);
			obj.set("light_radius", lightRadius);
			obj.set("light_dimradius",dimRadius);
		
		});
	}

});