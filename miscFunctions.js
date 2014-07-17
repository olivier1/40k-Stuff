var hitSpot="";
var headHits=["Head","Head","LeftArm", "Body", "RightArm","Body"];
var rightArmHits=["RightArm","RightArm","Body","Head","Body","RightArm"];
var leftArmHits=["LeftArm","LeftArm","Body","Head","Body","LeftArm"];
var bodyHits=["Body","Body","LeftArm","Head","RightArm","Body"];
var leftLegHits=["LeftLeg","LeftLeg","Body","LeftArm","Head","Body"];
var rightlegHits=["RightLeg","RightLeg","Body","RightArm","Head","Body"];
function getHitTable(){
	switch(hitSpot){
	case "Head":
		return headHits;
		break;
	case "RightArm":
		return rightArmHits;
		break;
	case "LeftArm":
	return leftArmHits;
	break;
	case "Body":
		return bodyHits;
		break;
	case "LeftLeg":
		return leftLegHits;
		break;
	case "RightLeg":
	return rightLegHits;
	break;
	default:
		return bodyHits;
	break;
	}
}
function hitLocation(roll){
	var tens=Math.floor(roll/10);
	var digit=roll-(tens*10);
	var flipped= tens+digit*10;
	if(flipped<=10){
		hitSpot="Head";
	}else if(flipped<=20){
		hitSpot="RightArm";
	}else if(flipped<=30){
		hitSpot="LeftArm";
	}else if(flipped<=70){
		hitSpot="Body";
	}else if(flipped<=85){
		hitSpot="RightLeg";
	}else if(flipped<=100){
		hitSpot="LeftLeg";
	}
}

function fetchArmor(targetChar){
	var armor;
	armor= findObjs({ name: hitSpot , _characterid: targetChar }, {caseInsensitive: true});
	var armorValue=parseInt(armor[0].get("current"));
	return armorValue;
}
function getAbilityBonus(token, ability){
	var char=token.get("represents");
	var abilityObject=findObjs({ name: ability.toString(), _characterid: char }, {caseInsensitive: true});
	var abilityBonus=Math.floor(parseInt(abilityObject[0].get("current"))/10);
	var unnaturalObject=findObjs({ name: "U"+ability.toString(), _characterid: char }, {caseInsensitive: true});
	if(unnaturalObject.length>0){
		abilityBonus+=parseInt(unnaturalObject[0].get("current"));
	}
	return abilityBonus;
}
function hasAbility(token, ability){
	var abilityObject=findObjs({ name: ability.toString(), _characterid: token.get("represents") }, {caseInsensitive: true});
	if(abilityObject.length>0){
		return true;
	}else{
		return false;
	}
}
on("chat:message", function(msg) {
	if(msg.type=="api" && msg.content.indexOf('!changeHitSpot')!==-1 && msg.who.indexOf("(GM)") !== -1){
		var param= msg.content.split(" ");
		hitSpot=param[1];
		sendChat("HitLocation","/w gm changed hit location to "+hitSpot);


	}

});
function setAbilityValue(token, ability, value){
	var char=token.get("represents");
	var abilityObject=findObjs({ name: ability.toString(), _characterid: char }, {caseInsensitive: true});
	abilityObject[0].set("current", value);
	
}
function getAbilityValue(token, ability){
	var char=token.get("represents");
	var abilityObject=findObjs({ name: ability.toString(), _characterid: char }, {caseInsensitive: true});
	var abilityValue=parseInt(abilityObject[0].get("current"));
	
	return abilityValue;
}

function getCharAbilityValue(char, ability){
	
	var abilityObject=findObjs({ name: ability.toString(), _characterid: char.id }, {caseInsensitive: true});
	var abilityValue=parseInt(abilityObject[0].get("current"));
	
	return abilityValue;
}