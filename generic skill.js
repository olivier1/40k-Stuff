var abilityNames={
		per:"Perception",
		ws:"Weapon Skill",
		bs:"Ballistic Skill",
		s:"Strength",
		t:"Toughness",
		ag:"Agility",
		fel:"Fellowship",
		wp:"Willpower",
		int:"Intelligence"
};
on("chat:message", function(msg) {
	if(msg.type=="api" && msg.content.indexOf("!skilltest")!==-1){
		var param= msg.content.split(" ");
		_.each(msg.selected, function(selected) {
			var shooterToken=getObj("graphic", selected._id);

			var stat=param[1];
			var modifier=param[2];

			var modifier=parseInt(param[2]);
			var modifierNumber=parseInt(modifier);
			var shooterChar=shooterToken.get("represents");
			if(!shooterChar){
				sendChat("ERROR", "Token represents no character");
			}else{
				abilityTest(shooterToken, stat, modifierNumber);
			}
		});
	}
});
on("chat:message", function(msg) {
	if(msg.type=="api" && msg.content.indexOf("!sheettest")!==-1){
		var param= msg.content.split("/");
		var name=param[1];
		
		var shooterCharObject=findObjs({ name: name, _type: "character" }, {caseInsensitive: true});
			
		var stat=param[2];

		var modifier=param[3].split("+");
		log(modifier);
				
		var modifierNumber=0;
		for(var i=0; i<modifier.length;i++){
			
			modifierNumber+=parseInt(modifier[i]);
		}
		
		var shooterChar=shooterCharObject[0];
		
		if(!shooterChar){
			sendChat("ERROR", "Token represents no character");
		}else{
			characterTest(shooterChar, stat, modifierNumber);
		}
		
	}
});
on("chat:message", function(msg) {
	if(msg.type=="api" && msg.content.indexOf("!shoot")!==-1){
		var param= msg.content.split(" ");
		_.each(msg.selected, function(selected) {
			var shooterToken=getObj("graphic", selected._id);
			

			var modifier=param[1];
			var modifierNumber=parseInt(modifier);
			var shooterChar=shooterToken.get("represents");
			if(!shooterChar){
				sendChat("ERROR", "Token represents no character");
			}else{
				
				var clipName=param[2];
				var ammoSpent=parseInt(param[3]);
				var currentClip=0;
				if(shooterToken.get("bar2_link")==""&&shooterToken.get("bar_value")!==""){
					currentClip=parseInt(shooterToken.get("bar2_value"));
					currentClip=currentClip-ammoSpent;
					if(currentClip<0){
						sendChat('ERROR','Weapon is out of ammo!');
						return;
					}else{
						shooterToken.set("bar2_value", currentClip);
					}
				}else{
					if(typeof clipName!=="undefined"){
						var clipSizeObject=findObjs({ name: clipName, _characterid: shooterChar }, {caseInsensitive: true});

						var currentClip=parseInt(clipSizeObject[0].get("current"));
						if(currentClip-ammoSpent<0){
							sendChat('ERROR','Weapon is out of ammo!');
							return;
						}else{
							clipSizeObject[0].set("current",currentClip-ammoSpent);
						}
					}
				}
				
				abilityTest(shooterToken, "BS",modifierNumber );
			}
		});
	}
});
function abilityTest(token, ability, modifier){
	var message="";
	if(ability.indexOf("GM")!==-1){
		message="/w gm ";
		ability=ability.replace("GM", "");
	}
	if(ability.indexOf("Parry")!==-1||ability.indexOf("Dodge")!==-1){
		evasion(token, ability);
		return false;
	}
	
	var abilityObject=findObjs({ name: ability.toString(), _characterid: token.get("represents") }, {caseInsensitive: true});

	if(abilityObject.length==0){
		sendChat("ERROR", ability.toString()+" is not a valid ability!");
		return;
	}
	var abilityValue= parseInt(abilityObject[0].get("current"));


	var fatigueValue= parseInt(token.get("bar3_value"));
	if(fatigueValue>0){
		modifier=modifier-10;
	}
	var roll=randomInteger(100);
	
	var toBeat=abilityValue+modifier;
	var degrees=0;
	token.set("status_green",false);
	token.set("status_brown",false);
	if(roll<=toBeat){
		degrees= Math.floor((toBeat-roll)/10).toString();
		message+="Succeeds the <b>"+abilityNames[ability.toString().toLowerCase()]+"</b> check! rolled a <b>"+ roll.toString() + "</b> against <b>"+toBeat.toString()+"</b> scored <b>" +degrees + "</b> degrees of success.";
		if((token.get("gmnotes")!==999)&&(ability.indexOf("BS")!==-1||ability.indexOf("WS")!==-1)){
			hitLocation(roll);
			message+=" Hit the <b>"+hitSpot.toString()+"</b>.";
		}
		
		sendChat(token.get("name"), message);
		token.set("gmnotes", degrees);
		token.set("status_green",0);
		return true;
	}else{
		degrees=Math.abs(Math.ceil((toBeat-roll)/10)).toString();
		message+="Fails the <b>"+abilityNames[ability.toString().toLowerCase()]+"</b> check! rolled a <b>"+ roll.toString() + "</b> against <b>"+toBeat.toString()+"</b> got <b>"+ degrees + "</b> degrees of failure.";
		sendChat(token.get("name"),message);
		token.set("gmnotes", degrees);
		token.set("status_brown",0);
		if(hasAbility(token, "reroll"+ability)&&getAbilityValue(token, "reroll"+ability)!==1){
			sendChat("Reroll","Rerolling failed test.");
			setAbilityValue(token, "reroll"+ability, 1);
			var result=abilityTest(token, ability, modifier);
			setAbilityValue(token, "reroll"+ability, 0);
			return result;
		}else{
			return false;
		}
		
	}
}

function evasion(token, ability){
	if(token.get("status_broken-shield")){
		sendChat("ERROR", token.get("name")+" has already spent his reaction this turn.");
		return;
	}else{
		token.set("gmnotes", 999);
		if(ability.indexOf("Dodge")!==-1){
			var dodgeObject=findObjs({ name: "Dodge", _characterid: token.get("represents") }, {caseInsensitive: true});
			var dodgeValue= parseInt(dodgeObject[0].get("current"));
			abilityTest(token, "Ag", dodgeValue);
		}else {
			var parryObject=findObjs({ name: "Parry", _characterid: token.get("represents") }, {caseInsensitive: true});
			var parryValue= parseInt(parryObject[0].get("current"));

			abilityTest(token, "WS", parryValue);
		}
		token.set("status_broken-shield",0);
	}
}

function characterTest(char, ability, modifier){
	var message="";
	if(ability.indexOf("GM")!==-1){
		message="/w gm ";
		ability=ability.replace("GM", "");
	}
	
	
	


	var fatigueValue= getCharAbilityValue(char, "fatigue");
	if(fatigueValue>0){
		modifier=modifier-10;
	}
	var roll=randomInteger(100);
	
	var toBeat=modifier;
	var degrees=0;
	
	if(roll<=toBeat){
		degrees= Math.floor((toBeat-roll)/10).toString();
		message+="Succeeds the <b>"+ability.toString()+"</b> check! rolled a <b>"+ roll.toString() + "</b> against <b>"+toBeat.toString()+"</b> scored <b>" +degrees + "</b> degrees of success.";
		
		
		sendChat(char.get("name"), message);
		
		return true;
	}else{
		degrees=Math.abs(Math.ceil((toBeat-roll)/10)).toString();
		message+="Fails the <b>"+ability.toString()+"</b> check! rolled a <b>"+ roll.toString() + "</b> against <b>"+toBeat.toString()+"</b> got <b>"+ degrees + "</b> degrees of failure.";
		sendChat(char.get("name"),message);
		
		
		return false;
		
		
	}
}