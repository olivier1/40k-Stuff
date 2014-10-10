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

		var modifierNumber=eval(param[3]);
		
		
		var shooterChar=shooterCharObject[0];

		var characteristic=param[4];
		
		if(!shooterChar){
			sendChat("ERROR", "Token represents no character");
		}else{
			characterTest(shooterChar, stat, modifierNumber, characteristic);
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
	if(fatigueValue>Math.floor(abilityValue/10)){
		modifier=modifier-Math.floor(abilityValue/2);
	}
	var roll=randomInteger(100);
	
	var toBeat=abilityValue+modifier;
	var degrees=0;
	token.set("status_green",false);
	token.set("status_brown",false);
	if(roll<=toBeat){
		degrees= Math.floor(((toBeat-roll)/10+1)).toString();
		message+="<div style='background-color:#339900'>Succeeds the <b>"+abilityNames[ability.toString().toLowerCase()]+"</b> check! rolled a <b>"+ roll.toString() + "</b> against <b>"+toBeat.toString()+"</b> scored <b>" +degrees + "</b> degrees of success.</div>";
		if((token.get("gmnotes")!==999)&&(ability.indexOf("BS")!==-1||ability.indexOf("WS")!==-1)){
			hitLocation(roll);
			message+=" Hit the <b>"+hitSpot.toString()+"</b>.";
		}
		
		sendChat(token.get("name"), message);
		token.set("gmnotes", degrees);
		token.set("status_green",0);
		return true;
	}else{
		degrees=Math.abs(Math.ceil(((toBeat-roll)/10)-1));
		message+="<div style='background-color:#DD0000'>Fails the <b>"+abilityNames[ability.toString().toLowerCase()]+"</b> check! rolled a <b>"+ roll.toString() + "</b> against <b>"+toBeat.toString()+"</b> got <b>"+ degrees.toString() + "</b> degrees of failure.</div>";
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

function characterTest(char, ability, modifier, characteristic){
	var message="";
	if(ability.indexOf("GM")!==-1){
		message="/w gm ";
		ability=ability.replace("GM", "");
	}
	
	
	
	

	var fatigueValue= getCharAbilityValue(char, "fatigue");
	if(fatigueValue>Math.floor(characteristic/10)){
		modifier=modifier-Math.floor(characteristic/2);
	}
	var roll=randomInteger(100);
	
	var toBeat=modifier;
	var degrees=0;
	
	if(roll<=toBeat){
		degrees= Math.floor((toBeat-roll)/10+1).toString();
		message+="<div style='background-color:#339900'>Succeeds the <b>"+ability.toString()+"</b> check! rolled a <b>"+ roll.toString() + "</b> against <b>"+toBeat.toString()+"</b> scored <b>" +degrees + "</b> degrees of success.</div>";
		
		
		sendChat(char.get("name"), message);
		
		return true;
	}else{
		degrees=Math.abs(Math.ceil(((toBeat-roll)/1)-1));
		message+="<div style='background-color:#DD0000'>Fails the <b>"+ability.toString()+"</b> check! rolled a <b>"+ roll.toString() + "</b> against <b>"+toBeat.toString()+"</b> got <b>"+ degrees.toString() + "</b> degrees of failure.</div>";
		sendChat(char.get("name"),message);
		
		
		return false;
		
		
	}
}