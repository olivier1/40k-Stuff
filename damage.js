on("chat:message", function(msg) {
	if(msg.type=="api" && msg.content.indexOf('!damage')!==-1){
		var param= msg.content.split(" ");
		var numbHits;
		var hitTable=getHitTable();
		if(typeof param[9]==="undefined"){
			numbHits=1;
		}else{
			numbHits=param[9];
		}
		if(isNaN(parseInt(numbHits))){
			sendChat("ERROR", numbHits+" is not a number!");
			return;
		}
		for(var i=0;i<numbHits;i++){
			if(i<hitTable.length){
				hitSpot=hitTable[i];
			}else{
				hitSpot=hitTable[hitTable.length-1];
			}
			sendChat(hitSpot,"/em is targeted by attack #"+(i+1).toString()+"!");
			damage(param);
		}

	}

});
on("chat:message", function(msg) {
	if(msg.type=="api" && msg.content.indexOf('!areadamage')!==-1){
		hitSpot="Body";
		var param= msg.content.split(" ");
		_.each(msg.selected, function(selected) {
			var obj = getObj("graphic", selected._id);
			param[2]=obj.id;
			damage(param);
		});
	}

});
function damage(param){
	var shooterId=param[1];
	var shooterToken=getObj("graphic",shooterId);
	var targetId=param[2];
	var targetToken=getObj("graphic",targetId);
	var dice=param[3];
	var diceNumber=parseInt(dice);
	var bonus=param[4];
	var bonusNumber=parseInt(bonus);
	var pen=param[5];
	var penNumber=0;
	penNumber= parseInt(pen);
	var damageType=param[6];
	var cover= parseInt(param[7]);
	if (isNaN(cover)){cover=0;}
	var speschuls={tearing: false,
			flame: false,
			proven: 1,
			primitive: 10,
			toxic: -1,
			felling: 0,
			shocking: false,
			snare: -1,
			sanctified: false,
			force: false,
			accurate: 0,
			concussive: -1,
			hellfire: false,
			bypass: false,
			gauss: false,
			scatter: false,
			blast: false,
			spray: false,
			tesla: false,
			d5: false
	};
	if(typeof param[8]==="undefined"){


	}else{
		var specials=param[8].split("/");
		parseSpecials(speschuls, specials);
	}
	



	var targetChar=targetToken.get("represents");
	if(!targetChar){
		sendChat('ERROR','Target represents no character');
		return;
	}

	var shooterName="";
	if(!shooterToken){

	}else{
		shooterName=shooterToken.get("name");
	}

	var targetName=targetToken.get("name");
	var damage=parseInt(bonusNumber);
	if(speschuls["flame"]){catchFire(targetToken);}
	
	if(speschuls["snare"]>-1){snareTest(targetToken, speschuls["snare"]);}
	var fury=false;
	var furynumber=10;
	var tesla=false;
	if(speschuls["hellfire"]||speschuls["gauss"]){furynumber=9;}
	for (var i=0;i<diceNumber;i++){
		var rollsMessage="dice "+(i+1).toString();
		var roll=0;
		if(speschuls["tearing"]){
			rollsMessage+=" weapon is tearing got ";
			var roll1=randomInteger(10);
			var roll2=randomInteger(10);
			rollsMessage+=roll1.toString()+" and "+roll2.toString();
			if(roll1>=furynumber||roll2>=furynumber){
				fury=true;
			}
			roll=Math.max(roll1,roll2);
		}else{
			roll=randomInteger(10);
			rollsMessage+=" got "+roll.toString();
			if(roll>=furynumber){
				fury=true;
			}

		}
		sendChat("Rolls", rollsMessage);
		roll=Math.min(Math.max(roll, speschuls["proven"]),speschuls["primitive"]);
		if(speschuls["tesla"]&&roll>8){
			tesla=true;
		}
		if(speschuls["d5"]){
			roll=Math.ceil(roll/2);
		}
		damage+=roll;
	}
	if(speschuls["accurate"]>2){speschuls["accurate"]=2;}
	var accurateDamage=0;
	for (var i=0; i<speschuls["accurate"];i++){
		var roll=randomInteger(10);
		accurateDamage+=roll;
	}
	if(accurateDamage>0){
		damage+=accurateDamage;
		sendChat("Accurate damage", "Got <b>"+accurateDamage+"</b> extra damage from accurate!");
	}
	

	if(!speschuls["bypass"]){
		var armorNumber=fetchArmor(targetChar);

		var reduction=0;

		if(armorNumber>=penNumber){
			reduction=cover+parseInt(armorNumber)-parseInt(penNumber);


		}
		reduction+=toughnessReduction(targetChar, speschuls);

		if(damage<reduction){
			damage=0;
		}else{
			damage=damage-parseInt(reduction);

		}
	}
	if(hasAbility(targetToken, "Swarm")&&(!speschuls["flame"]&&!speschuls["blast"]&&!speschuls["spray"]&&!speschuls["scatter"])){
		damage=Math.ceil(damage/2);
	}
	if(fury){
		if(damage>0){
			var furyRoll=randomInteger(5);
			sendChat('RIGHTEOUS FURY!!!', '/em :'+shooterName + ' applies critical effects to the attack!');
			if(!speschuls["force"]&&!speschuls["sanctified"]&&hasAbility(targetToken, "stuffofnightmares")){
				sendChat("Stuff of nightmares", "/em Prevented critical effects!");
			}else{
				critDamage(damageType, furyRoll*(-1), targetToken);
			}

		}else{
			if(speschuls["gauss"]){
				damage=randomInteger(5);
			}else{
				damage=1;
			}
			
		}	



	}
	if(damage>0&&speschuls["bleed"]){
		var bleedRounds=randomInteger(5);
		sendChat("Bleeding", "The attack inflicts bleeding wounds for <b>"+bleedRounds.toString()+"</b> rounds!");
		targetToken.set("status_red",bleedRounds);
	}
	if(speschuls["shocking"]&&(damage>0)){shockTest(targetToken);}
	if(speschuls["concussive"]>-1){concussTest(targetToken,speschuls["concussive"], damage);}
	var hp=targetToken.get("bar1_value");


	if(hasAbility(shooterToken, "Crippling")&&(damage>hp)){
		damage+=2;
	}
	hp=hpDamage(targetToken, damage);

	sendChat(shooterName, 'damages <b>'+targetName+'</b> for <b>'+ damage.toString()+'</b> '+damageType+' damage');
	
	if((hp<0)&&(damage>0)){
		if(!speschuls["force"]&&!speschuls["sanctified"]&&hasAbility(targetToken, "stuffofnightmares")&&hp>-8){
			sendChat("Stuff of nightmares", "/em Prevented critical effects!");
		}else{
			critDamage(damageType, hp, targetToken);
		}

	}
	if(!hasAbility(targetToken,"Undying")&&damage>0&&speschuls["toxic"]>-1){toxicTest(targetToken, speschuls["toxic"], damageType);}
	if(speschuls["tesla"]&&(tesla||targetToken.get("status_dead")||targetToken.get("status_sleepy"))){
		sendChat("Tesla", "The tesla weapon arcs to another target within 15m!");
	}
}
function parseSpecials(speschuls, specials){
	if(specials!==""){
		var i=0;
		for(i=0;i<specials.length;i++){
			if(specials[i].indexOf("@")!==-1){
				splitSpecial=specials[i].split("@");
				speschuls[splitSpecial[0].toLowerCase()]=parseInt(splitSpecial[1]);
			}else{

				speschuls[specials[i].toLowerCase()]=true;
			}
		}
	}
}
function snareTest(token, modifier){


	if(!abilityTest(token, "Ag",modifier*-10 )){


		sendChat(token.get("name"), token.get("name")+" is snared by the attack!");
		token.set("status_cobweb", true);

	}
}
function shockTest(token){


	if(!abilityTest(token, "T",0 )){

		degrees=parseInt(token.get("gmnotes"));

		sendChat(token.get("name"), token.get("name")+" is stunned "+ degrees.toString()+" rounds because of the shocking weapon!");
		token.set("status_lightning-helix",degrees);


	}
}
function concussTest(token, modifier, damage){


	if(!abilityTest(token, "T",modifier*-10 )){
		degrees=parseInt(token.get("gmnotes"));


		sendChat(token.get("name"), token.get("name")+" is stunned <b>"+ degrees.toString()+"</b> rounds because of the concussive attack!");
		token.set("status_lightning-helix",degrees);


	}
	var strBonus=getAbilityBonus(token,"S");
	if(damage>strBonus){
		token.set("status_arrowed", true);
		sendChat(token.get("name"), token.get("name")+ "is knocked prone by the force of the blast!");
	}
}
function toxicTest(token, modifier, damageType){


	if(!abilityTest(token, "T",modifier*-10 )){
		var dmg=randomInteger(10);
		var hp=hpDamage(token, dmg);

		sendChat(token.get("name"), "suffers <b>"+ dmg.toString()+"</b> extra damage from the toxic weapon!");


		if(hp<0){
			critDamage(damageType, hp, token);
		}
	}
}
function catchFire(token){



	if(!abilityTest(token, "Ag",0 )){
		sendChat(token.get("name"), "/em catches fire!");

		token.set("status_half-haze", true);

	}

}
function toughnessReduction(char, specials){
	var toughObject=findObjs({ name: 'T', _characterid: char }, {caseInsensitive: true});
	var tough=Math.floor(toughObject[0].get("current")/10);
	var utObject=findObjs({ name: 'UT', _characterid: char }, {caseInsensitive: true});

	if (utObject.length!==0){
		var ut=parseInt(utObject[0].get("current"));
		tough+=Math.max(0, ut-specials["felling"]);
	}
	if(!specials["sanctified"]||!specials["force"]){
		var daemonObject=findObjs({ name: 'Daemonic', _characterid: char }, {caseInsensitive: true});

		if (daemonObject.length!==0){
			var daemon=parseInt(daemonObject[0].get("current"));
			tough+=daemon;
		}
	}
	return tough;

}
function hpDamage(targetToken, damage){
	var hp=targetToken.get("bar1_value");

	var char=targetToken.get("represents");


	if(!hasAbility(targetToken, "TrueGrit")||damage==0){
		hp=parseInt(hp)-parseInt(damage);

	}else{
		if(hp<0||hp-damage<0){
			if(hp>-1){
				damage=damage-hp;
				hp=0;

			}
			var tough=findObjs({ name: 'TB', _characterid: char }, {caseInsensitive: true});
			var toughNum=parseInt(tough[0].get("current"));
			damage=Math.max((damage-toughNum),1);
			sendChat(targetToken.get("name"), " Critical damage is reduced to <b>"+damage.toString()+"</b> by true grit!");
		}
		hp=(parseInt(hp)-parseInt(damage));
	}


	targetToken.set({bar1_value: parseInt(hp)});
	return hp;

}
function addFatigue(targetToken, fatigue){
	var currFatigue=parseInt(targetToken.get("bar3_value"));
	var maxFatigue=parseInt(targetToken.get("bar3_max"));

	currFatigue=parseInt(currFatigue)+parseInt(fatigue);
	if(currFatigue>2*maxFatigue){
		targetToken.set("status_dead",true);
		sendChat(targetToken.get("name"),"/em dies from fatigue.");
	}
	if(currFatigue>maxFatigue&&!targetToken.get("status_sleepy")){
		
		targetToken.set("status_sleepy",true);
		sendChat(targetToken.get("name"),"/em falls unconscious from fatigue.");
	}
	targetToken.set({bar3_value: parseInt(currFatigue)});
}
