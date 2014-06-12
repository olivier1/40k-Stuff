function getCurrentToken() {
    var turn_order = JSON.parse(Campaign().get('turnorder'));
	if (!turn_order.length) {
		return "";
	}
	var turn = turn_order.shift();
	return getObj('graphic', turn.id) || "";
}
on("change:campaign:turnorder", function() {
	var current_token = getCurrentToken();
	if (current_token == "") return;
	var statuses=(current_token.get("statusmarkers")).split(",");
	if (statuses!==""){
		var i=0;
		for(i=0; i<statuses.length;i++){
			
			if(statuses[i].indexOf("@")!==-1){
                statusEffect(statuses[i].substring(statuses[i].indexOf("@"),statuses[i].length-1), current_token);
				var values=statuses[i].split("@");
				var status="status_"+values[0];
				var turnsLeft=parseInt(values[1]);
                
				if(turnsLeft>0){
                    
					turnsLeft=parseInt(turnsLeft-1);
                    
					current_token.set(status, turnsLeft);
				}else{
					current_token.set(status, false);
				}
			}else{
				statusEffect(statuses[i], current_token);
			}
		}
	}
	var regenObject=findObjs({ name: 'Regen', _characterid: current_token.get("represents") }, {caseInsensitive: true});
	if(hasAbility(current_token, "Regen")){
		var regenBonus=0;
		if(hasAbility(current_token, "RegenBonus")){
			var abilityObject=findObjs({ name: "RegenBonus", _characterid: current_token.get("represents") }, {caseInsensitive: true});
			var regenBonus=parseInt(abilityObject[0].get("current"));
		}
		if(hasAbility(current_token, "Necron")&&current_token.get("status_dead")){
			sendChat(current_token.get("name"), "/em 's reanimation protocols activate...");
			if(abilityTest(current_token,"T", regenBonus)){
				sendChat(current_token.get("name"), "/em is imbued by a ghostly green light and reassembles before your very eyes!");
				regen=parseInt(regenObject[0].get("current"));
				current_token.set("bar1_value",regen);
				current_token.set("status_dead", false);
			}else if(parseInt(current_token.get("gmnotes"))>2){
				sendChat(current_token.get("name"), "/em 's reanimation protocols have failed and he disapears in a haze of green light!");
				
			}
		}else{
			if(abilityTest(current_token, "T", regenBonus)){
				sendChat(current_token.get("name"), "/em 's wounds close with unnatural speed!");
				regen=parseInt(regenObject[0].get("current"));
				var hp=parseInt(current_token.get("bar1_value"));
				hp+=regen;
				var maxHp=parseInt(current_token.get("bar1_max"));
				if(hp>maxHp){hp=maxHp;}
				current_token.set("bar1_value",hp);
			}
		}
		
	}
});
function statusEffect(status, token){
	switch(status){
		case "red":
			bleeding(token);
			break;
		case "half-haze":
			burning(token);
			break;
	}
}
function burning(token){
	var char=token.get("represents");
	var tb=findObjs({ name: 'TB', _characterid: char }, {caseInsensitive: true});
	var tbNumber=parseInt(tb[0].get("current"));
	
	var dmg=randomInteger(10);
	var moddmg=Math.max(0,(dmg-tbNumber));
	var hp=hpDamage(token, moddmg);
	hitSpot="Body";
	var message="Burns alive! He suffers <b>1</b> level of fatigue and takes <b>"+moddmg.toString()+"</b> Energy damage from the heat!";
	addFatigue(token, 1);
	
	if(abilityTest(token, "WP",0 )){
		message+=" He calms down and can act normally.";
	}else{
		message+=" He freaks out and can't act normally.";
	}
	sendChat(token.get("name"),message);
	if((moddmg>0)&&(hp<1)){
		critDamage("Energy", hp, token);
	}
}
function bleeding(token){
	var value=randomInteger(10);
	if(value==1){
		var dieHard=findObjs({ name: 'DieHard', _characterid: token.get("represents") }, {caseInsensitive: true});
		if(dieHard.length!==0){
			value=randomInteger(10);
			if(value!==1){
				sendChat(token.get("name"),"/em refuses to die from his wounds!");
				return;
			}
		}
		token.set("status_dead",true);
		sendChat(token.get("name"),"/em bleeds out from his wounds!");
	}else{
		sendChat(token.get("name"),"/em continues bleeding but is ok for now");
	}
}