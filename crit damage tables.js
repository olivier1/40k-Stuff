function critDamage(damageType, damage, targetToken){
	switch(damageType.toLowerCase()){
	case "energy":
		energyCrits(targetToken, damage);
		break;
	case "impact":
		impactCrits(targetToken, damage);
		break;
	case "explosive":
		explosiveCrits(targetToken, damage);
		break;
	case "rending":
		rendingCrits(targetToken, damage);
		break;
	default:
		impactCrits(targetToken, damage);

	}
}
function energyCrits(targetToken, damage){
	switch(hitSpot.toLowerCase()){
	case "head":
		energyHeadCrits(targetToken, damage);
		break;
	case "rightarm":
		energyArmCrits(targetToken, damage);
		break;
	case "leftarm":
		energyArmCrits(targetToken, damage);
		break;
	case "body":
		energyBodyCrits(targetToken, damage);
		break;
	case "rightleg":
		energyLegCrits(targetToken, damage);
		break;
	case "leftleg":
		energyLegCrits(targetToken, damage);
		break;
	default:
		energyBodyCrits(targetToken, damage);
	}
};
function impactCrits(targetToken, damage){
	switch(hitSpot.toLowerCase()){
	case "head":
		impactHeadCrits(targetToken, damage);
		break;
	case "rightarm":
		impactArmCrits(targetToken, damage);
		break;
	case "leftarm":
		impactArmCrits(targetToken, damage);
		break;
	case "body":
		impactBodyCrits(targetToken, damage);
		break;
	case "rightleg":
		impactLegCrits(targetToken, damage);
		break;
	case "leftleg":
		impactLegCrits(targetToken, damage);
		break;
	default:
		impactBodyCrits(targetToken, damage);
	}
};
function explosiveCrits(targetToken, damage){
	switch(hitSpot.toLowerCase()){
	case "head":
		explosiveHeadCrits(targetToken, damage);
		break;
	case "rightarm":
		explosiveArmCrits(targetToken, damage);
		break;
	case "leftarm":
		explosiveArmCrits(targetToken, damage);
		break;
	case "body":
		explosiveBodyCrits(targetToken, damage);
		break;
	case "rightleg":
		explosiveLegCrits(targetToken, damage);
		break;
	case "leftleg":
		explosiveLegCrits(targetToken, damage);
		break;
	default:
		explosiveBodyCrits(targetToken, damage);
	}
};
function rendingCrits(targetToken, damage){
	switch(hitSpot.toLowerCase()){
	case "head":
		rendingHeadCrits(targetToken, damage);
		break;
	case "rightarm":
		rendingArmCrits(targetToken, damage);
		break;
	case "leftarm":
		rendingArmCrits(targetToken, damage);
		break;
	case "body":
		rendingBodyCrits(targetToken, damage);
		break;
	case "rightleg":
		rendingLegCrits(targetToken, damage);
		break;
	case "leftleg":
		rendingLegCrits(targetToken, damage);
		break;
	default:
		rendingBodyCrits(targetToken, damage);
	}
};
function energyArmCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="The attack grazes <b>"+ targetToken.get("name")+"’s</b> arm, causing it to spasm uncontrollably. All Tests involving that arm suffer a –30 penalty for ";
		var duration=randomInteger(5);
		message+="<b>"+duration.toString() +"</b> rounds.";
		targetToken.set("status_sentry-gun",duration);
	}else if(damage==-2){
		message+="The attack smashes into the arm, sending currents of energy crackling down to the fingers and up to the shoulder. The arm is useless for ";
		var duration=randomInteger(5);
		message+="<b>"+duration.toString()+"</b> Rounds and <b>"+ targetToken.get("name")+"</b> takes <b>1</b> level of Fatigue.";
		addFatigue(targetToken, 1);
	}else if(damage==-3){
		message+="The arm suffers superficial burns inflicting no small amount of pain on <b>"+ targetToken.get("name")+"</b>. <b>"+ targetToken.get("name")+"</b> may only take a Half Action in his next Round and he suffers ";
		var duration=randomInteger(5);
		message+="<b>"+duration.toString()+"</b> levels of Fatigue";
		addFatigue(targetToken, duration);
		targetToken.set("status_stopwatch",true);
	}else if(damage==-4){
		message+="The shock of the attack causes the character to temporarily lose control of his autonomous functions. He is Stunned for <b>1</b> Round and is knocked Prone. The arm is useless for ";
		var duration=randomInteger(10);
		message+="<b>"+duration.toString()+"</b> Rounds.";
		targetToken.set("status_lightning-helix", 1);
		targetToken.set("status_arrowed", true);
		targetToken.set("status_spanner", duration);

	}else if(damage==-5){
		message+="The attack causes energy to course through <b>"+ targetToken.get("name")+"’s</b> arm leaving him Stunned for <b>1</b> Round, and the arm is useless until <b>"+ targetToken.get("name")+"</b> receives medical treatment.";
		targetToken.set("status_lightning-helix", 1);
		targetToken.set("status_spanner", true);
	}else if(damage==-6){
		message+="The attack wreathes the arm in flame, scorching clothing and armour, and temporarily fusing together <b>"+ targetToken.get("name")+"’s</b> fingers. <b>"+ targetToken.get("name")+"</b> suffers ";
		var skillDamage=randomInteger(5);
		message+="<b>"+skillDamage.toString()+"</b> Weapon Skill and Ballistic Skill Damage, suffers ";
		var fatigue=randomInteger(5);
		message+="<b>"+fatigue.toString()+"</b> levels of Fatigue. ";
		
		if(abilityTest(targetToken, "T",0 )){
			message+="<b>"+targetToken.get("name")+"</b> succeeds the toughness test to keep his hand!";
		}else{
			message+="<b>"+targetToken.get("name")+"</b> fails the toughness test to keep his hand!";
		}
	}else if(damage==-7){
		message+="With a terrible snapping sound, the heat of the attack boils the marrow in <b>"+ targetToken.get("name")+"’s</b> arm, causing it to crack or even shatter. <b>"+ targetToken.get("name")+"’s</b> arm is broken and, until it is repaired, <b>"+ targetToken.get("name")+"</b> counts as only having one arm. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>1</b> Round and suffers ";
		var duration=randomInteger(5);
		message+="<b>"+duration.toString()+"</b> levels of Fatigue";
		addFatigue(targetToken, duration);
		targetToken.set("status_lightning-helix", 1);
	}else if(damage==-8){
		message+="Energy ripples across <b>"+ targetToken.get("name")+"’s</b> arm, causing skin and muscle to slough disgustingly from <b>"+ targetToken.get("name")+"’s</b> limb, revealing a sticky red mess of sinew and bone. ";
		var fatigue=randomInteger(10);
		
		if(abilityTest(targetToken, "T",0 )){
			message+="<b>"+targetToken.get("name")+"</b> succeeds the toughness test and is not stunned ";
		}else{
			message+="<b>"+targetToken.get("name")+"</b> fails the toughness test and is stunned for ";
			var stun=randomInteger(5);
			message+="<b>"+stun.toString()+"</b>. ";
			targetToken.set("status_lightning-helix", stun);
		}
		message+="In addition, <b>"+ targetToken.get("name")+"</b> suffers <b>"+fatigue.toString()+"</b> levels of fatigue and has no arm.";

		addFatigue(targetToken, fatigue);

	}else if(damage==-9){

		
		if(abilityTest(targetToken, "T",0 )){
			message+="Fire consumes <b>"+ targetToken.get("name")+"’s</b> arm, burning the flesh to a crisp right down to the bone. In addition <b>"+ targetToken.get("name")+"</b> suffers ";
			var fatigue=randomInteger(10);
			message+=fatigue.toString()+"</b> levels of fatigue and is stunned for <b>1</b> round.";
			targetToken.set("status_lightning-helix", 1);
			addFatigue(targetToken, fatigue);
		}else{
			message+="Fire consumes <b>"+ targetToken.get("name")+"’s</b> arm, burning the flesh to a crisp right down to the bone. <b>"+ targetToken.get("name")+"</b> dies for shock.";

			targetToken.set("status_dead", true);

		}


	}else if(damage<=-10){
		message+="The attack reduces the arm to a cloud of ash and sends <b>"+ targetToken.get("name")+"</b> crumbling to the ground where he immediately dies from shock, clutching his smoking stump.";
		targetToken.set("status_dead", true);
	}
	sendChat('Critical Effect',message);
}
function energyBodyCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="A blow to <b>"+ targetToken.get("name")+"’s</b> body steals the air from his lungs. <b>"+ targetToken.get("name")+"</b> can take only a Half Action on his next Turn.";
		targetToken.set("status_stopwatch",true);

	}else if(damage==-2){
		message+="The blast punches the air from <b>"+ targetToken.get("name")+"’s</b> body.";
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> is knocked prone!";

			targetToken.set("status_arrowed", true);

		}
	}else if(damage==-3){
		message+="The attack cooks the flesh on the chest and abdomen, inflicting <b>2</b> levels of Fatigue and ";

		var tough=randomInteger(5);
		message+="<b>"+tough.toString()+"</b> toughness damage.";
		addFatigue(targetToken, 2);

	}else if(damage==-4){
		message+="The energy ripples all over the character, scorching his body with horrid third-degree burns and inflicting ";        
		var duration=randomInteger(10);
		message+="<b>"+duration.toString()+"</b> levels of fatigue. <b>"+ targetToken.get("name")+"</b> may only take a Half Action on his next Round.";
		addFatigue(targetToken, duration);
		targetToken.set("status_stopwatch",true);

	}else if(damage==-5){
		message+="The fury of the attack forces <b>"+ targetToken.get("name")+"</b> to the ground, helplessly covering his face and keening in agony. <b>"+ targetToken.get("name")+"</b> is knocked Prone";
		
		if(!abilityTest(targetToken, "Ag",0 )){
			message+=" and catches fire!";

			targetToken.set("status_half-haze", true);

		}
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" and is stunned for <b>1</b> round";

			targetToken.set("status_lightning-helix", 1);

		}
		message+=".";	




	}else if(damage==-6){

		message+="Struck by the full force of the attack, <b>"+ targetToken.get("name")+"</b> is sent reeling to the ground; smoke spiralling out from the wound. <b>"+ targetToken.get("name")+"</b> is knocked Prone, Stunned for ";
		var stun=randomInteger(10);
		message+="<b>"+stun.toString()+"</b> rounds and suffers ";
		var fatigue=randomInteger(5);
		addFatigue(targetToken, fatigue);
		targetToken.set("status_lightning-helix", stun);
		message+=fatigue.toString()+"</b> levels of Fatigue. ";

		
		if(!abilityTest(targetToken, "Ag",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> catches fire!";

			targetToken.set("status_half-haze", true);

		}


	}else if(damage==-7){
		message+="The intense power of the energy attack cooks <b>"+ targetToken.get("name")+"’s</b> organs, burning his lungs and heart with intense heat. <b>"+ targetToken.get("name")+"</b> is Stunned for ";

		var stun=randomInteger(10)+randomInteger(10);
		message+="<b>"+stun.toString()+"</b> rounds and suffers ";
		var toughdmg=randomInteger(10);
		message+="<b>"+toughdmg.toString()+"</b> permanent toughness damage.";

		targetToken.set("status_lightning-helix", stun);

	}else if(damage==-8){

		message+="As the attack washes over <b>"+ targetToken.get("name")+", his skin turns black and peels off while melted fat seeps from his clothing and armour. <b>"+ targetToken.get("name")+"</b> is Stunned for ";
		var stun=randomInteger(10)+randomInteger(10);
		message+="<b>"+stun.toString()+"</b> rounds and the attack halves his strength, toughness and agility until he receives medical treatment. The extensive scarring deals ";
		var fellodmg=randomInteger(5)+randomInteger(5);
		message+=fellodmg.toString()+"</b> fellowship damage.";



	}else if(damage==-9){

		message+=" <b>"+ targetToken.get("name")+"</b> is completely encased in fire, melting his skin and popping his eyes like superheated eggs. He falls to the ground a blackened corpse.";

		targetToken.set("status_dead", true);




	}else if(damage<=-10){

		message+=" <b>"+ targetToken.get("name")+"</b> is completely encased in fire, melting his skin and popping his eyes like superheated eggs. He falls to the ground a blackened corpse. In addition, if <b>"+ targetToken.get("name")+"</b> is carrying any ammunition, there is a 50% chance it explodes. Unless they can make a successful Evasion Test, all creatures within 1d5 metres take 1d10+5 Explosive Damage. If <b>"+ targetToken.get("name")+"</b> carried any grenades or missiles, one Round after the Damage was dealt, they detonate where <b>"+ targetToken.get("name")+"’s</b> body lies with the normal effects.";
		targetToken.set("status_dead", true);
	}
	sendChat('Critical Effect',message);
}
function energyHeadCrits(targetToken, damage){
	var message="";
	//
	if(damage==-1){
		message+="A grazing blow to the head disorientates <b>"+ targetToken.get("name")+", imposing a –10 penalty to all Tests (except Toughness) for <b>1</b> Round.";


	}else if(damage==-2){
		message+="The blast of energy dazzles <b>"+ targetToken.get("name")+"</b>, leaving him Blinded for <b>1</b> Round.";
		targetToken.set("status_bleeding-eye", 1);
	}else if(damage==-3){
		message+="The attack cooks off <b>"+ targetToken.get("name")+"’s</b> ear, leaving him with a partially burned stump of cartilage and deafened until he receives first aid or waits for ";


		var tough=randomInteger(5);
		message+="<b>"+tough.toString()+"</b> hours.";


	}else if(damage==-4){

		message+="The energy attack burns away all of the hairs on <b>"+ targetToken.get("name")+"’s</b> head as well as leaving him reeling from the injury. The attack deals <b>2</b> levels of Fatigue and <b>"+ targetToken.get("name")+"</b> is blinded for ";        
		var duration=randomInteger(5);
		message+="<b>"+duration.toString()+"</b> rounds.";
		addFatigue(targetToken, 2);
		targetToken.set("status_bleeding-eye", duration);

	}else if(damage==-5){

		var blind=randomInteger(10);
		message+="A blast of energy envelops <b>"+ targetToken.get("name")+"’s</b> head, burning his face and hair, crisping his skin, and causing him to scream like a stuck Grox. In addition to losing his hair, he is blinded for <b>"+blind.toString()+"</b> Rounds, Stunned for <b>1</b> Round, and takes <b>1</b> permanent Fellowship Damage.";
		targetToken.set("status_bleeding-eye", blind);
		targetToken.set("status_lightning-helix", 1);



	}else if(damage==-6){

		var hour=randomInteger(10);
		var fellow=randomInteger(5);
		var per=randomInteger(5);
		var fatigue=randomInteger(5);
		message+="The attack cooks <b>"+ targetToken.get("name")+"’s</b> face, melting his features and damaging his eyes. <b>"+ targetToken.get("name")+"</b> is blinded for the next <b>"+hour.toString()+"</b> hours and suffers <b>"+fellow.toString()+"</b> permanent Fellowship Damage and <b>"+per.toString()+"</b> permanent Perception Damage. <b>"+ targetToken.get("name")+"</b> also suffers <b>"+fatigue.toString()+"</b> levels of Fatigue.";
		targetToken.set("status_bleeding-eye", true);
		addFatigue(targetToken,fatigue);


	}else if(damage==-7){

		var fatigue=randomInteger(10);
		var fellow=randomInteger(10);
		message+="In a gruesome display, the flesh is burned from <b>"+ targetToken.get("name")+"’s</b> head, exposing charred bone and muscle underneath. <b>"+ targetToken.get("name")+"</b> is blinded permanently and suffers <b>"+fatigue.toString()+"</b> levels of Fatigue. <b>"+ targetToken.get("name")+"'s fellowship is now <b>"+fellow.toString()+"</b>.";
		targetToken.set("status_bleeding-eye", true); 
		addFatigue(targetToken,fatigue);

	}else if(damage==-8){

		message+=" <b>"+ targetToken.get("name")+"’s</b> head is destroyed in a conflagration of fiery death. He does not survive.";
		targetToken.set("status_dead", true);



	}else if(damage==-9){

		message+="Superheated by the attack, <b>"+ targetToken.get("name")+"’s</b> brain explodes, tearing apart his skull and sending flaming chunks of meat flying at those nearby. <b>"+ targetToken.get("name")+"</b> is very dead!";

		targetToken.set("status_dead", true);




	}else if(damage<=-10){
		var run=randomInteger(10)+randomInteger(10);
		message+="Superheated by the attack, <b>"+ targetToken.get("name")+"’s</b> brain explodes, tearing apart his skull and sending flaming chunks of meat flying at those nearby. <b>"+ targetToken.get("name")+"</b> is very dead! <b>"+ targetToken.get("name")+"’s</b> entire body catches fire and runs off headless <b>"+run.toString()+"</b> metres in a random direction (use the Scatter Diagramon page 255). Anything flammable it passes, including characters, must make a Challenging (+0) Agility Test or catch fire";
		targetToken.set("status_dead", true);
	}
	sendChat('Critical Effect',message);
}
function energyLegCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="The blast of energy sears the flesh and bone of <b>"+ targetToken.get("name")+"’s</b> leg, leaving a nasty burn scar. <b>"+ targetToken.get("name")+"</b> may not Run or Charge for <b>2</b> Rounds.";


	}else if(damage==-2){
		message+="The attack flash-fries <b>"+ targetToken.get("name")+"’s</b> leg, cooking chunks of flesh into char.";

		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> level of fatigue.";

			addFatigue(targetToken, 1);

		}

	}else if(damage==-3){
		//im hereeeeeeeeeeeeeeeeeeeeeee
		var move=randomInteger(10);
		message+="A solid blow to the leg sends currents of agony coursing through <b>"+ targetToken.get("name")+"</b>. <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> level of Fatigue and reduces his Movement by half (rounding up) for <b>"+move.toString()+"</b> Rounds. <b>"+ targetToken.get("name")+"</b> is knocked Prone";
		addFatigue(targetToken, 1);
		targetToken.set("status_arrowed", true);
		targetToken.set("status_tread",move);



	}else if(damage==-4){

		message+="The blast causes a nasty compound fracture in <b>"+ targetToken.get("name")+"’s</b> leg. <b>"+ targetToken.get("name")+"</b> reduces his Movement by half (rounding up), and <b>"+ targetToken.get("name")+"</b> may not Run or Charge. The effects to <b>"+ targetToken.get("name")+"’s</b> Movement persist until <b>"+ targetToken.get("name")+"</b> receives medical attention.";        
		targetToken.set("status_tread",true);

	}else if(damage==-5){

		var half=randomInteger(10)+randomInteger(10);
		message+=" <b>"+ targetToken.get("name")+"’s</b> leg endures horrific burn Damage, fusing clothing and armour with flesh and bone. <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> level of Fatigue and reduces his movement by half (rounding up) for <b>"+half.toString()+"</b> Rounds. <b>"+ targetToken.get("name")+"</b> is knocked Prone";
		targetToken.set("status_arrowed", true);
		targetToken.set("status_tread",half);


	}else if(damage==-6){

		message+="The attack burns <b>"+ targetToken.get("name")+"’s</b> foot, charring the flesh and emitting a foul aroma. In addition, <b>"+ targetToken.get("name")+"</b> suffers <b>2</b> levels of Fatigue.";
		addFatigue(targetToken, 2);
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> loses it's foot!";

			addFatigue(targetToken, 1);

		}else{
			message+=" <b>"+ targetToken.get("name")+"</b> reduces his movement by 1/2 (rounding up) until he receives medical attention";
			targetToken.set("status_tread",true);
		}


	}else if(damage==-7){

		var fatigue=randomInteger(5);
		message+="The energy attack fries the leg, leaving it a mess of blackened flesh. The leg is broken and until repaired, <b>"+ targetToken.get("name")+"</b> counts as having lost the leg. <b>"+ targetToken.get("name")+"</b> suffers <b>"+fatigue.toString()+"</b> levels of fatigue";

		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" and is stunned for <b>1</b> round";

			targetToken.set("status_lightning-helix", 1);

		}
		message+=".";
		addFatigue(targetToken,fatigue);

	}else if(damage==-8){
		var fatigue=randomInteger(10);
		message+="Energy sears through the bone, causing the leg to be severed.";

		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> is stunned for <b>1</b> round. ";

			targetToken.set("status_lightning-helix", 1);

		}
		message+="In addition, <b>"+ targetToken.get("name")+"</b> suffers <b>"+fatigue.toString()+"</b> levels of Fatigue and is suffering from Blood Loss. <b>"+ targetToken.get("name")+"</b> now only has one leg";
		targetToken.set("status_red", true);
		addFatigue(targetToken,fatigue);



	}else if(damage==-9){

		
		if(abilityTest(targetToken, "T",0 )){
			message+="The force of the attack reduces the leg to little more than a chunk of sizzling gristle. The leg is utterly lost.";

		}else{
			message+="The force of the attack reduces the leg to little more than a chunk of sizzling gristle. <b>"+ targetToken.get("name")+"</b> dies from shock.";

			targetToken.set("status_dead", true);

		}




	}else if(damage<=-10){

		message+="In a terrifying display of power, the leg immolates and fire consumes <b>"+ targetToken.get("name")+"</b> completely. <b>"+ targetToken.get("name")+"</b> dies in a matter of agonising seconds";
		targetToken.set("status_dead", true);
	}
	sendChat('Critical Effect',message);
}
function explosiveArmCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="The attack throws the limb backwards, painfully jerking it away from the body, inflicting <b>1</b> level of Fatigue.";
		addFatigue(targetToken, 1);

	}else if(damage==-2){
		message+="The force of the blast snaps the bones of the arm in half. <b>"+ targetToken.get("name")+"</b> drops anything held in the hand";
		
		if(abilityTest(targetToken, "T",0 )){

		}else{
			message+="and is stunned for <b>1</b> round";
			targetToken.set("status_lightning-helix", 1);
		}
		message+=".";

	}else if(damage==-3){

		var finger=randomInteger(5);
		var bs=randomInteger(10);
		var ws=randomInteger(10);
		message+="The explosion removes <b>1</b> finger (and the tips from up to  <b>"+ finger.toString()+"</b> others) from <b>"+ targetToken.get("name")+"’s</b> hand. <b>"+ targetToken.get("name")+"</b> suffers <b>"+ ws.toString()+"</b> WS and <b>"+bs.toString()+"</b> BS damage, and anything carried in the hand is destroyed. If this is an explosive such as a hand grenade, it goes off—messy (use result 9 instead)";


	}else if(damage==-4){

		message+="The blast rips the sinew of the arm straight from the bone. He is Stunned for <b>1</b> Round, and the limb is useless until medical attention is received.";

		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from blood loss!";
			targetToken.set("status_red", true);
		}

		targetToken.set("status_lightning-helix", 1);


	}else if(damage==-5){

		message+="Fragments from the explosion tear into <b>"+ targetToken.get("name")+"’s</b> hand, ripping away flesh and muscle alike.";
		
		if(!abilityTest(targetToken, "T",10 )){
			message+=" <b>"+ targetToken.get("name")+"</b> loses his hand!";
		}else{
			message+=" <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> permanent Weapon Skill and Ballistic Skill Damage from the Damaged nerves.";
		}


	}else if(damage==-6){
		var fatigue=randomInteger(5);
		message+="The explosive attack shatters the bone and mangles the flesh, turning <b>"+ targetToken.get("name")+"’s</b> arm into a red ruin, inflicting <b>"+fatigue.toString()+"</b> levels of Fatigue. <b>"+ targetToken.get("name")+"’s</b> arm is broken and, until repaired, <b>"+ targetToken.get("name")+"</b> counts as having only one arm. In addition, the horrendous nature of the wound means that he now suffers from Blood Loss.";
		addFatigue(targetToken, fatigue);
		targetToken.set("status_red",true);


	}else if(damage==-7){
		message+="In a violent hail of flesh, the arm is blown apart.";



		if(abilityTest(targetToken, "T",0 )){
			var fatigue=randomInteger(10);
			var stun = randomInteger(10);
			message+=" <b>"+ targetToken.get("name")+"</b> is stunned for <b>"+ stun.toString()+", suffers from <b>"+ fatigue.toString()+"</b> levels of fatigue, and suffers from blood loss. He is now missing an arm.";
			targetToken.set("status_red",true);
			addFatigue(targetToken,fatigue);
			targetToken.set("status_lightning-helix",stun);
		}else{
			message+=" <b>"+ targetToken.get("name")+"</b> dies from shock!";
			targetToken.set("status_dead",true);
		}

	}else if(damage==-8){
		message+="The arm disintegrates under the force of the explosion taking a good portion of the shoulder and chest with it. <b>"+ targetToken.get("name")+"</b> is sent screaming to the ground, where he dies in a pool of his own blood and organs.";
		targetToken.set("status_dead",true);

	}else if(damage==-9){
		message+="With a mighty bang the arm is blasted from <b>"+ targetToken.get("name")+"’s</b> body, killing <b>"+ targetToken.get("name")+"</b> instantly in a rain of blood droplets. In addition, if <b>"+ targetToken.get("name")+"</b> was carrying a weapon with a power source in his hand (such as a power sword or chainsword) then it explodes, dealing <b>1d10+5</b> Impact Damage to anyone within two metres.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){
		var dist=randomInteger(10);
		message+="With a mighty bang the arm is blasted from <b>"+ targetToken.get("name")+"’s</b> body, killing <b>"+ targetToken.get("name")+"</b> instantly in a rain of blood droplets. In addition, if <b>"+ targetToken.get("name")+"</b> was carrying a weapon with a power source in his hand (such as a power sword or chainsword) then it explodes, dealing <b></b> Impact Damage to anyone within two metres.if <b>"+ targetToken.get("name")+"</b> is carrying any ammunition it explodes dealing <b>1d10+5</b> Impact Damage to anyone within <b>"+dist.toString()+"</b> metres. If <b>"+ targetToken.get("name")+"</b> is carrying any grenades or missiles, these detonate immediately.";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}
function explosiveBodyCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		var dist=randomInteger(5);
		message+="The explosion flings <b>"+ targetToken.get("name")+"</b> backwards <b>"+dist.toString()+"</b> metres. <b>"+ targetToken.get("name")+"</b> is knocked Prone.";
		targetToken.set("status_arrowed", true);

	}else if(damage==-2){

		var dist=randomInteger(5);
		message+=" <b>"+ targetToken.get("name")+"</b> is blown backwards <b>"+dist.toString()+"</b> metres by a terrific explosion, taking <b>"+dist.toString()+"</b> levels of Fatigue. <b>"+ targetToken.get("name")+"</b> is knocked Prone.";
		targetToken.set("status_arrowed", true);
		addFatigue(targetToken,dist);

	}else if(damage==-3){

		var dist=randomInteger(5);
		message+="The force of the blast sends <b>"+ targetToken.get("name")+"</b> sprawling to the ground. <b>"+ targetToken.get("name")+"</b> is knocked backwards <b>"+dist.toString()+"</b> metres, Stunned for <b>1</b> Round, and is knocked Prone.";
		targetToken.set("status_arrowed", true);
		targetToken.set("status_lightning-helix",1);

	}else if(damage==-4){

		message+="The power of the explosion rends flesh and bone with horrific results.";

		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from Blood Loss and is Stunned for <b>1</b> Round!";
			targetToken.set("status_red", true);
			targetToken.set("status_lightning-helix",1);
		}




	}else if(damage==-5){

		message+="Concussion from the explosion knocks <b>"+ targetToken.get("name")+"</b> to the ground and turns his innards into so much ground meat.";
		var fatigue=randomInteger(5);
		message+=" <b>"+ targetToken.get("name")+"</b> suffers <b>"+fatigue.toString()+"</b> levels of fatigue and is knocked prone. ";
		addFatigue(targetToken,fatigue);
		targetToken.set("status_arrowed",true);
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" In addition <b>"+ targetToken.get("name")+"</b> suffers from lood loss and <b>1</b> permanent toughness damage!";
			targetToken.set("status_red",true);
		}


	}else if(damage==-6){
		message+="Chunks of <b>"+ targetToken.get("name")+"’s</b> flesh are ripped free by the force of the attack leaving large, weeping wounds. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>1</b> Round, may only take a Half Action in his next Round, and is now suffering Blood Loss.";
		targetToken.set("status_red", true);
		targetToken.set("status_lightning-helix",1);
		targetToken.set("status_stopwatch",true);


	}else if(damage==-7){
		var stun=randomInteger(10);
		message+="The explosive force of the attack ruptures <b>"+ targetToken.get("name")+"’s</b> flesh and scrambles his nervous system, knocking him to the ground. <b>"+ targetToken.get("name")+"</b> suffers Blood Loss, is knocked Prone, is Stunned for <b>"+stun.toString()+"</b> Rounds. ";
		targetToken.set("status_red", true);
		targetToken.set("status_lightning-helix",stun);
		targetToken.set("status_arrowed", true);
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> falls unconscious!";
			targetToken.set("status_sleepy",true);
		}

	}else if(damage==-8){
		message+=" <b>"+ targetToken.get("name")+"’s</b> chest explodes outward, disgorging a river of partially cooked organs onto the ground, killing him instantly.";
		targetToken.set("status_dead",true);

	}else if(damage==-9){
		var dmg=randomInteger(10)+5;
		var dist=randomInteger(10);
		message+="Pieces of <b>"+ targetToken.get("name")+"’s</b> body fly in all directions as he is torn into bloody gobbets by the attack. In addition, if <b>"+ targetToken.get("name")+"</b> is carrying any ammunition, it explodes dealing <b>"+dmg.toString()+"</b> Impact Damage to anyone within <b>"+dist.toString()+"</b> metres. If <b>"+ targetToken.get("name")+"</b> is carrying any grenades or missiles, these too detonate immediately.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){
		var dmg=randomInteger(10)+5;
		var dist=randomInteger(10);
		var gore=randomInteger(10);
		message+="Pieces of <b>"+ targetToken.get("name")+"’s</b> body fly in all directions as he is torn into bloody gobbets by the attack. In addition, if <b>"+ targetToken.get("name")+"</b> is carrying any ammunition, it explodes dealing <b>"+dmg.toString()+"</b> Impact Damage to anyone within <b>"+dist.toString()+"</b> metres. If <b>"+ targetToken.get("name")+"</b> is carrying any grenades or missiles, these too detonate immediately. Anyone within <b>"+gore.toString()+"</b> metres of <b>"+ targetToken.get("name")+"</b> is drenched in gore and must make a Challenging (+0) Agility Test or suffer a –10 penalty to Weapon Skill and Ballistic Skill Tests for <b>1</b> Round as blood fouls their sight.";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}
function explosiveHeadCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){

		message+="The explosion leaves <b>"+ targetToken.get("name")+"</b> confused. He can take only a Half Action on his next Turn.";
		targetToken.set("status_stopwatch",true);

	}else if(damage==-2){


		message+="The flash and noise leaves <b>"+ targetToken.get("name")+"</b> Blinded and Deafened for <b>1</b> Round.";
		targetToken.set("status_bleeding-eye", 1);


	}else if(damage==-3){



		message+="The detonation leaves <b>"+ targetToken.get("name")+"’s</b> face a bloody ruin from scores of small cuts. <b>"+ targetToken.get("name")+"</b> suffers <b>2</b> levels of Fatigue ";
		addFatigue(targetToken, 2);
		
		if(!abilityTest(targetToken, "T",0 )){
			var dmg= randomInteger(10);
			message+=" and <b>"+dmg.toString()+"</b> points of perception and fellowship damage.";

		}

	}else if(damage==-4){

		var radius=randomInteger(10);
		message+="The force of the blast knocks <b>"+ targetToken.get("name")+"</b> to the ground and leaves him senseless. <b>"+ targetToken.get("name")+"</b> suffers <b>"+radius.toString()+"</b> Intelligence Damage and is knocked Prone.";

		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> permanent intelligence damage and is Stunned for <b>2</b> Rounds!";
			targetToken.set("status_lightning-helix",2);
		}




	}else if(damage==-5){

		var stun=randomInteger(10);
		var fellow=randomInteger(5);
		message+="The explosion flays the flesh from <b>"+ targetToken.get("name")+"’s</b> face and bursts his eardrums with its force. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>"+stun.toString()+"</b> Rounds and is permanently deafened. Finally, <b>"+ targetToken.get("name")+"</b> gains hideous scars—he suffers <b>"+fellow.toString()+"</b> points of permanent Fellowship Damage.";
		targetToken.set("status_lightning-helix",stun);


	}else if(damage==-6){
		message+=" <b>"+ targetToken.get("name")+"’s</b> head explodes under the force of the attack, leaving his headless corpse to spurt blood from the neck for the next few minutes. Needless to say this is instantly fatal.";
		targetToken.set("status_dead", true);


	}else if(damage==-7){
		var dmg=randomInteger(10)+5;
		var dist=randomInteger(5);
		message+="Both head and body are blown into a mangled mess, instantly killing <b>"+ targetToken.get("name")+"</b>. In addition, if <b>"+ targetToken.get("name")+"</b> is carrying any ammunition it explodes dealing <b>"+dmg.toString()+"</b> Impact Damage to any creatures within <b>"+dist.toString()+"</b> metres. If <b>"+ targetToken.get("name")+"</b> was carrying grenades or missiles, these too explode immediately.";
		targetToken.set("status_dead", true);

	}else if(damage==-8){
		message+="In a series of unpleasant explosions <b>"+ targetToken.get("name")+"’s</b> head and torso peel apart, leaving a gory mess on the ground. For the rest of the fight, anyone moving over this spot must make a Challenging (+0) Agility Testor fall Prone";
		targetToken.set("status_dead",true);

	}else if(damage==-9){
		message+=" <b>"+ targetToken.get("name")+"</b> ceases to exist in any tangible way, entirely turning into a kind of crimson mist. You don’t get much deader than this, except…";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){


		message+=" <b>"+ targetToken.get("name")+"</b> ceases to exist in any tangible way, entirely turning into a kind of crimson mist. You don’t get much deader than this, except… Any of <b>"+ targetToken.get("name")+"’s</b> allies who are within two metres of where <b>"+ targetToken.get("name")+"</b> stood, must make an immediate Challenging (+0) Willpower Test or spend their next Turn fleeing from the attacker.";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}
function explosiveLegCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="A glancing blast sends the character backwards one metre.";
		
		if(!abilityTest(targetToken, "T",0 )){

			message+=" <b>"+ targetToken.get("name")+"</b> is knocked prone.";
			targetToken.set("status_arrowed",true);

		}
	}else if(damage==-2){

		var duration=randomInteger(5);

		message+="The force of the explosion takes <b>"+ targetToken.get("name")+"’s</b> feet out from under him. He is knocked Prone and may only take Half Move movement Actions for <b>"+duration.toString()+"</b> Rounds.";
		targetToken.set("status_arrowed", true);
		targetToken.set("status_tread",duration);

	}else if(damage==-3){


		var agi=randomInteger(10)+randomInteger(10);
		message+="The concussion causes <b>"+ targetToken.get("name")+"’s</b> leg to fracture, inflicting <b>"+agi.toString()+"</b> Agility Damage.";


	}else if(damage==-4){

		var flung=randomInteger(5);
		var duration= randomInteger(10);
		message+="The explosion sends <b>"+ targetToken.get("name")+"</b> spinning through the air. <b>"+ targetToken.get("name")+"</b> is flung <b>"+flung.toString()+"</b> metres away from the explosion. It takes <b>"+ targetToken.get("name")+"</b> a Full Action to regain his feet, and his Movement is reduced by half (rounding up) for <b>"+duration.toString()+"</b> Rounds.";
		targetToken.set("status_tread",duration);
	}else if(damage==-5){
		var agi=randomInteger(5);
		message+="Explosive force removes <b>"+ targetToken.get("name")+"’s</b> foot and scatters the ragged remnants over a wide area. <b>"+ targetToken.get("name")+"</b> suffers <b>"+agi.toString()+"</b> permanent Agility Damage.";

		
		if(!abilityTest(targetToken, "T",-10 )){
			var fatigue=randomInteger(5);
			message+=" <b>"+ targetToken.get("name")+"</b> suffers <b>"+fatigue.toString()+"</b> levels of fatigue.";
			addFatigue(targetToken,fatigue);

		}



	}else if(damage==-6){
		var fatigue=randomInteger(10);
		message+="The concussive force of the blast shatters <b>"+ targetToken.get("name")+"’s</b> leg bones and splits apart his flesh, inflicting <b>"+fatigue.toString()+"</b> levels of Fatigue. The leg is broken and, until repaired, <b>"+ targetToken.get("name")+"</b> counts as having only one leg.";
		
		if(!abilityTest(targetToken, "T",0 )){

			message+=" <b>"+ targetToken.get("name")+"</b> permanent permanently loses it's foot!";

		}


	}else if(damage==-7){

		message+=" The explosion reduces <b>"+ targetToken.get("name")+"’s</b> leg into a hunk of smoking meat.";
		
		if(!abilityTest(targetToken, "T",0 )){

			message+=" <b>"+ targetToken.get("name")+"</b> dies from shock!";
			targetToken.set("status_dead",true);

		}else{
			var stun=randomInteger(10);
			var fatigue=randomInteger(10);
			message+=" <b>"+ targetToken.get("name")+"</b> is Stunned for <b>"+stun.toString()+"</b> Rounds, suffers <b>"+fatigue.toString()+"</b> levels of Fatigue, and suffers Blood Loss. He now has only one leg.";
			targetToken.set("status_sleepy",fatigue);
			targetToken.set("status_lightning-helix",stun);
			targetToken.set("status_red",true);
		}

	}else if(damage==-8){
		message+="The blast tears the leg from the body in a geyser of gore, sending him crashing to the ground, blood pumping from the ragged stump: instantly fatal.";
		targetToken.set("status_dead",true);

	}else if(damage==-9){

		var dmg=randomInteger(10)+2;
		message+="The leg explodes in an eruption of blood, killing <b>"+ targetToken.get("name")+"</b> immediately and sending tiny fragments of bone, clothing, and armour hurtling off in all directions. Anyone within two metres suffers <b>"+dmg.toString()+"</b> Impact Damage.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){


		var dmg=randomInteger(10)+2;
		var plode=randomInteger(10)+5;
		var dist=randomInteger(10);
		message+="The leg explodes in an eruption of blood, killing <b>"+ targetToken.get("name")+"</b> immediately and sending tiny fragments of bone, clothing, and armour hurtling off in all directions. Anyone within two metres suffers <b>"+dmg.toString()+"</b> Impact Damage. In addition, if <b>"+ targetToken.get("name")+"</b> is carrying any ammunition, it explodes dealing <b>"+plode.toString()+"</b> Impact Damage to anyone within <b>"+dist.toString()+"</b> metres. If <b>"+ targetToken.get("name")+"</b> is carrying any grenades or missiles, these detonate immediately.";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}
function impactArmCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="The attack strikes <b>"+ targetToken.get("name")+"’s</b> limb, with a powerful blow, causing him to drop anything held in that hand.";

	}else if(damage==-2){
		message+="The strike leaves a deep bruise, possibly causing minor fractures in the arm. <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> level of Fatigue.";
		addFatigue(targetToken, 1);


	}else if(damage==-3){


		message+="The impact smashes into the arm or whatever <b>"+ targetToken.get("name")+"</b> is holding, ripping it away and leaving <b>"+ targetToken.get("name")+"</b> reeling from the pain. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>1</b> Round and drops whatever he was holding in his arm. There is a %10 chance that anything <b>"+ targetToken.get("name")+"</b> was holding in that hand is Damaged and unusable until repaired.";
		targetToken.set("status_lightning-helix", 1);

	}else if(damage==-4){

		message+="The impact crushes flesh and bone. <b>"+ targetToken.get("name")+"</b> drops whatever was held in that hand.";
		
		if(!abilityTest(targetToken, "T",0 )){
			var ws=randomInteger(10);
			var bs=randomInteger(10);
			message+=" In addition <b>"+ targetToken.get("name")+"</b> suffers <b>"+ws.toString()+"</b> WS damage and <b>"+bs.toString()+"</b> BS damage.";

		}
	}else if(damage==-5){

		message+="Muscle and bone take a pounding as the attack rips into the arm. The limb is useless until <b>"+ targetToken.get("name")+"</b> receives medical attention.";




	}else if(damage==-6){
		var fingers=randomInteger(5);
		message+="The attack pulverises <b>"+ targetToken.get("name")+"’s</b> hand, crushing and breaking <b>"+fingers.toString()+"</b> fingers. <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> level of Fatigue.";
		addFatigue(targetToken,1);
	 
		if(!abilityTest(targetToken, "T",0 )){

			message+=" <b>"+ targetToken.get("name")+"</b> suffers <b>2</b> permanent WS and BS Damage!";

		}


	}else if(damage==-7){

		message+=" With a loud snap, the arm bone is shattered and left hanging limply at <b>"+ targetToken.get("name")+"’s</b> side, dribbling blood onto the ground. The arm is broken and, until repaired, <b>"+ targetToken.get("name")+"</b> counts as having only one arm. <b>"+ targetToken.get("name")+"</b> suffers from Blood Loss.";
		targetToken.set("status_red", true);

	}else if(damage==-8){

		message+="The force of the attack takes the arm off just below the shoulder, showering blood and gore across the ground.";
		
		if(!abilityTest(targetToken, "T",0 )){

			message+=" <b>"+ targetToken.get("name")+"</b> dies from shock!";
			targetToken.set("status_dead",true);
		}else{
			var stun=randomInteger(10);
			var fatigue=randomInteger(5);
			message+=" <b>"+ targetToken.get("name")+"</b> is stunned for <b>"+stun.toString()+"</b> and suffers <b>"+fatigue.toString()+"</b> levels of fatigue, and suffers from blood loss.";
			targetToken.set("status_red",true);
			targetToken.set("status_lightning-helix",stun);
			addFatigue(targetToken,fatigue);
		}


	}else if(damage==-9){

		message+="In a rain of blood, gore, and meat, <b>"+ targetToken.get("name")+"’s</b> arm is removed from his body. Screaming incoherently, he twists about in agony for a few seconds before collapsing to the ground and dying.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){

		var dmg=Math.max((randomInteger(5)-3),0);
		message+="In a rain of blood, gore, and meat, <b>"+ targetToken.get("name")+"’s</b> arm is removed from his body. Screaming incoherently, he twists about in agony for a few seconds before collapsing to the ground and dying. As the arm is removed by the force of the attack, bone, clothing, and armour fragments fly about like shrapnel. Anyone within <b>2</b> metres of <b>"+ targetToken.get("name")+"</b> suffers <b>"+dmg.toString()+"</b> Impact Damage to a random location.";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}
function impactBodyCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="A blow to <b>"+ targetToken.get("name")+"’s</b> body steals the breath from his lungs. <b>"+ targetToken.get("name")+"</b> can take only a Half Action on his next Turn.";
		targetToken.set("status_stopwatch",true);

	}else if(damage==-2){
		message+="The impact punches the air from <b>"+ targetToken.get("name")+"’s</b> body, inflicting <b>1</b> level of Fatigue and knocking <b>"+ targetToken.get("name")+"</b> Prone.";
		addFatigue(targetToken, 1);
		targetToken.set("status_arrowed", true);


	}else if(damage==-3){


		message+="The attack breaks a rib and <b>"+ targetToken.get("name")+"</b> is knocked Prone. <b>"+ targetToken.get("name")+"</b> is also Stunned for <b>1</b> Round.";
		targetToken.set("status_lightning-helix", 1);
		targetToken.set("status_arrowed", true);

	}else if(damage==-4){
		var tough=randomInteger(10);
		message+="The blow batters <b>"+ targetToken.get("name")+", shattering a rib. <b>"+ targetToken.get("name")+"</b> suffers <b>"+tough.toString()+"</b> Toughness Damage.";
		
		if(!abilityTest(targetToken, "Ag",0 )){

			message+=" <b>"+ targetToken.get("name")+"</b> is knocked prone!";
			targetToken.set("status_arrowed", true);
		}
	}else if(damage==-5){
		message+="A solid blow to the chest pulverises <b>"+ targetToken.get("name")+"’s</b> innards, and he momentary doubles over in pain, clutching himself and crying in agony. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>2</b> Rounds";
		targetToken.set("status_lightning-helix", 2);
		
		if(!abilityTest(targetToken, "T",0 )){
			var fatigue=randomInteger(5);
			message+=" <b>"+ targetToken.get("name")+"</b> also suffers <b>"+fatigue.toString()+"</b> levels of fatigue.";
			addFatigue(targetToken,fatigue);
		}


	}else if(damage==-6){
		var dist=randomInteger(5);
		var fatigue=randomInteger(5);
		message+="The attack knocks <b>"+ targetToken.get("name")+"</b> sprawling on the ground. <b>"+ targetToken.get("name")+"</b> is flung <b>"+dist.toString()+"</b> metres away from the attacker and falls Prone (if <b>"+ targetToken.get("name")+"</b> strikes a wall or other solid object, he stops). <b>"+ targetToken.get("name")+"</b> suffers <b>"+fatigue.toString()+"</b> levels of Fatigue and is Stunned for <b>2</b> Rounds.";
		targetToken.set("status_arrowed", true);
		addFatigue(targetToken, fatigue);
		targetToken.set("status_lightning-helix", 2);


	}else if(damage==-7){

		var ribs=randomInteger(5);
		var tough=randomInteger(5);

		message+="With an audible crack, <b>"+ribs.toString()+"</b> of <b>"+ targetToken.get("name")+"’s</b> ribs break. <b>"+ targetToken.get("name")+"</b> can either lie down and stay still awaiting medical attention (a successful Medicae Test sets the ribs) or continue to take Actions, though each Round there is a 20% chance that a jagged rib pierces a vital organ and kills the character instantly. <b>"+ targetToken.get("name")+"</b> suffers <b>"+tough.toString()+"</b> permanent Toughness Damage.";


	}else if(damage==-8){

		var tough=randomInteger(10);

		message+="The force of the attack ruptures several of <b>"+ targetToken.get("name")+"’s</b> organs and knocks him down, gasping in wretched pain. <b>"+ targetToken.get("name")+"</b> suffers Blood Loss and suffers <b>"+tough.toString()+"</b> permanent Toughness Damage.";
		targetToken.set("status_red",true);


	}else if(damage==-9){
		message+=" <b>"+ targetToken.get("name")+"</b> jerks back from the force of the attack, throwing back his head and spewing out a jet of blood before crumpling to the ground dead.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){

		var dist=randomInteger(10);
		message+=" <b>"+ targetToken.get("name")+"</b> jerks back from the force of the attack, throwing back his head and spewing out a jet of blood before crumpling to the ground dead. <b>"+ targetToken.get("name")+"</b> is thrown <b>"+dist.toString()+"</b> metres away from the attack. Anyone in <b>"+ targetToken.get("name")+"’s</b> path must make a Challenging (+0) Agility Testor be knocked Prone.";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}
function impactHeadCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="The impact fills <b>"+ targetToken.get("name")+"’s</b> head with a terrible ringing noise.";
		
		if(!abilityTest(targetToken, "T",0 )){

			message+=" <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> level of fatigue.";
			addFatigue(targetToken,1);
		}

	}else if(damage==-2){

		var duration=randomInteger(5);
		message+="The attack causes <b>"+ targetToken.get("name")+"</b> to see stars. <b>"+ targetToken.get("name")+"</b> suffers a –10 penalty to any Perception or Intelligence Tests for <b>"+duration.toString()+"</b> Rounds.";



	}else if(damage==-3){

		message+=" <b>"+ targetToken.get("name")+"’s</b> nose breaks in a torrent of blood, blinding him for <b>1</b> Round.";
		targetToken.set("status_bleeding-eye",1);
		
		if(!abilityTest(targetToken, "T",0 )){

			message+=" <b>"+ targetToken.get("name")+"</b> is stunned for <b>1</b> round";

			targetToken.set("status_lightning-helix", 1);
		}


	}else if(damage==-4){

		message+="The concussive strike staggers <b>"+ targetToken.get("name")+"</b>.";
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> is stunned for <b>1</b> round and knocked prone";
			targetToken.set("status_lightning-helix", 1);
			targetToken.set("status_arrowed", true);
		}
	}else if(damage==-5){
		var dist=randomInteger(5);
		message+="The force of the blow sends <b>"+ targetToken.get("name")+"</b> reeling in pain. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>1</b> Round, gains <b>1</b> level of Fatigue, and staggers backwards <b>"+dist.toString()+"</b> metres. He suffers <b>1</b> permanent Intelligence Damage.";
		targetToken.set("status_lightning-helix", 2);
		addFatigue(targetToken,1);


	}else if(damage==-6){

		var stun=randomInteger(5);
		var dist=randomInteger(5);
		message+=" <b>"+ targetToken.get("name")+"’s</b> head is snapped back by the attack leaving him staggering around trying to control mind-numbing pain. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>"+stun.toString()+"</b> Rounds, knocked backwards <b>"+dist.toString()+"</b> metres";
		targetToken.set("status_lightning-helix", stun);
		
		if(!abilityTest(targetToken, "Ag",0 )){

			message+=" <b>"+ targetToken.get("name")+"</b> is knocked prone!";
			targetToken.set("status_arrowed", true);
		}





	}else if(damage==-7){


		var stun=randomInteger(10);
		var hour=randomInteger(10);

		message+="The attack slams into <b>"+ targetToken.get("name")+"’s</b> head, fracturing his skull and opening a long tear in his scalp. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>"+stun.toString()+"</b> Rounds and halves all movement for <b>"+hour.toString()+"</b> hours.";
		targetToken.set("status_lightning-helix",stun);
		targetToken.set("status_tread",true);

	}else if(damage==-8){



		message+="With a sickening crunch <b>"+ targetToken.get("name")+"’s</b> head snaps around to face the opposite direction. The twisted vertebrae immediately sever every connection within <b>"+ targetToken.get("name")+"’s</b> neck. Death is instantaneous.";
		targetToken.set("status_red",true);


	}else if(damage==-9){
		message+=" <b>"+ targetToken.get("name")+"’s</b> head bursts like an overripe fruit and sprays blood, bone, and brains in all directions. Anyone within <b>4</b> metres of <b>"+ targetToken.get("name")+"</b> must make an Agility Test or suffer a –10 penalty to their WS and BS on their next Turn as gore gets in their eyes or on their visors.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){

		message+=" <b>"+ targetToken.get("name")+"’s</b> head bursts like an overripe fruit and sprays blood, bone, and brains in all directions. Anyone within <b>4</b> metres of <b>"+ targetToken.get("name")+"</b> must make an Agility Test or suffer a –10 penalty to their WS and BS on their next Turn as gore gets in their eyes or on their visors. The attack was so powerful that it passes through <b>"+ targetToken.get("name")+"</b> and may hit another target nearby.";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}
function impactLegCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="A blow to the leg results in deep bruises and teeth-clenching pain. <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> level of Fatigue.";
		addFatigue(targetToken,1);

	}else if(damage==-2){

		message+="A grazing strike against the leg slows <b>"+ targetToken.get("name")+"</b>. <b>"+ targetToken.get("name")+"’s</b> Movement is reduced by half (rounding up) for <b>1</b> Round.";
		targetToken.set("status_tread",1);
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> is stunned for <b>1</b> round and knocked prone.";
			targetToken.set("status_lightning-helix", 1);
			targetToken.set("status_arrowed", true);
		}


	}else if(damage==-3){

		var agi=randomInteger(10);
		message+="A solid blow to the leg sends lightning agony coursing through <b>"+ targetToken.get("name")+"</b>. <b>"+ targetToken.get("name")+"</b> suffers <b>"+agi.toString()+"</b> Agility Damage and is knocked Prone.";
		targetToken.set("status_arrowed", true);


	}else if(damage==-4){

		var agi=randomInteger(10)+randomInteger(10);
		message+="A powerful impact causes micro-fractures in <b>"+ targetToken.get("name")+"’s</b> bones, inflicting considerable agony. <b>"+ targetToken.get("name")+"</b> suffers <b>"+agi.toString()+"</b> Agility Damage and is knocked Prone.";
		targetToken.set("status_arrowed", true);
	}else if(damage==-5){

		message+="The blow breaks <b>"+ targetToken.get("name")+"’s</b> leg, leaving him Stunned for <b>1</b> Round and reducing his movement to <b>1</b> metre until he receives medical attention. <b>"+ targetToken.get("name")+"</b> is also knocked Prone.";
		targetToken.set("status_lightning-helix", 1);
		targetToken.set("status_arrowed", true);
		targetToken.set("status_tread",true);

	}else if(damage==-6){

		message+="With a sharp cracking noise, several of the tiny bones in <b>"+ targetToken.get("name")+"’s</b> foot snap like twigs. <b>"+ targetToken.get("name")+"'s movement is reduced by 1/2 (rounding up) until he recieves medical attention. <b>"+ targetToken.get("name")+"</b> suffers <b>2</b> levels of Fatigue.";
		targetToken.set("status_sleepy",2);
		targetToken.set("status_tread",true);
		 
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> loses it's foot!";
		}





	}else if(damage==-7){



		message+="With a nasty crunch, the leg is broken and <b>"+ targetToken.get("name")+"</b> is left mewling in pain. <b>"+ targetToken.get("name")+"</b> falls Prone with a broken leg and, until it is repaired, he counts as only having one leg. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>2</b> Rounds";
		targetToken.set("status_lightning-helix",2);
		targetToken.set("status_arrowed", true);

	}else if(damage==-8){

		message+="The force of the attack rips the lower half of the leg away in a stream of blood.";
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> dies from shock!!";
			targetToken.set("status_dead",true);
		}else{
			var agi=randomInteger(5);
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from Blood Loss and suffers <b>"+agi.toString()+"</b> permanent Agility Damage. He now only has one leg";
			targetToken.set("status_red",true);
		}




	}else if(damage==-9){
		message+="The hit rips apart the flesh of the leg, causing blood to spray out in all directions. Even as <b>"+ targetToken.get("name")+"</b> tries futilely to stop the sudden flood of vital fluid, he falls to the ground and dies in a spreading pool of gore.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){
		var dist=randomInteger(10)+randomInteger(10);
		message+="The hit rips apart the flesh of the leg, causing blood to spray out in all directions. Even as <b>"+ targetToken.get("name")+"</b> tries futilely to stop the sudden flood of vital fluid, he falls to the ground and dies in a spreading pool of gore. Such is the agony of <b>"+ targetToken.get("name")+"’s</b> death that his piteous screams drown out all conversation within <b>"+dist.toString()+"</b> metres for the rest of the Round.";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}
function rendingArmCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="The slashing attack tears free anything that was held in this arm.";

	}else if(damage==-2){

		message+="Deep cuts cause <b>"+ targetToken.get("name")+"</b> to drop whatever was held and inflicts <b>1</b> level of Fatigue.";
		addFatigue(targetToken,1);


	}else if(damage==-3){

		message+="The attack shreds <b>"+ targetToken.get("name")+"’s</b> arm into ribbons, causing <b>"+ targetToken.get("name")+"</b> to scream in pain. <b>"+ targetToken.get("name")+"</b> drops whatever was held in that hand";
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from blood loss.";
			targetToken.set("status_red",true);
		}


	}else if(damage==-4){
		var duration=randomInteger(10);

		message+="The attack flays the skin from the limb, filling the air with blood and the sounds of his screaming. <b>"+ targetToken.get("name")+"</b> falls Prone from the agony and takes <b>2</b> levels of Fatigue. The limb is useless for <b>"+duration.toString()+"</b> Rounds";
		targetToken.set("status_arrowed", true);
		addFatigue(targetToken, 2);
	}else if(damage==-5){

		message+="A bloody and very painful looking furrow is opened up in <b>"+ targetToken.get("name")+"’s</b> arm. <b>"+ targetToken.get("name")+"</b> suffers from Blood Loss and vomits all over the place in agony. He drops anything held and the limb is useless without medical attention";
		targetToken.set("status_red",true);


	}else if(damage==-6){
		var finger= randomInteger(5);
		message+="The blow mangles flesh and muscle as it hacks into <b>"+ targetToken.get("name")+"’s</b> hand, liberating <b>"+finger.toString()+"</b> fingers in the process. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>1</b> Round.";
		targetToken.set("status_lightning-helix",1);
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" The hand becomes a useless mess.";
		}





	}else if(damage==-7){

		var str=randomInteger(10);


		message+="The attack rips apart skin, muscle, bone, and sinew with ease, turning <b>"+ targetToken.get("name")+"’s</b> arm into a dangling ruin. <b>"+ targetToken.get("name")+"</b> suffers <b>"+str.toString()+"</b> Strength Damage. The arm is broken and, until repaired, <b>"+ targetToken.get("name")+"</b> counts as having only one arm. In addition, numerous veins have been severed and <b>"+ targetToken.get("name")+"</b> is now suffering from Blood Loss.";
		targetToken.set("status_red",true);

	}else if(damage==-8){

		message+="With an assortment of unnatural, wet, ripping sounds, the arm flies free of the body trailing blood behind it in a crimson arc.";
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> dies from shock!!";
			targetToken.set("status_dead",true);
		}else{
			var stun=randomInteger(10);
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from Blood Loss and is stunned for <b>"+stun.toString()+"</b> rounds. He only has <b>1</b> arm";
			targetToken.set("status_red",true);
		}




	}else if(damage==-9){
		message+="The attack slices clean through the arm and into the torso, drenching the ground in blood and gore and killing <b>"+ targetToken.get("name")+"</b> instantly.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){

		var dist=randomInteger(10);
		message+="The attack slices clean through the arm and into the torso, drenching the ground in blood and gore and killing <b>"+ targetToken.get("name")+"</b> instantly. As the arm falls to the ground its fingers spasm uncontrollably, pulling the trigger of any held weapon. If <b>"+ targetToken.get("name")+"</b> was carrying a ranged weapon there is a 5% chance that a single randomly determined target within <b>"+dist.toString()+"</b> metres is hit by these shots, in which case resolve a single hit from <b>"+ targetToken.get("name")+"’s</b> weapon.";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}
function rendingBodyCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		var targetBody=findObjs({ name: 'Body', _characterid: targetToken.get("represents") }, {caseInsensitive: true});
		var body=parseInt(targetBody[0].get("current")); 
		if((body)==0){
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from <b>1</b> level of fatigue.";
			addFatigue(targetToken,1);
		}else{
			message+=" <b>"+ targetToken.get("name")+"</b> is unaffected because of his armor.";
		}


	}else if(damage==-2){


		message+="A powerful slash opens a painful rent in <b>"+ targetToken.get("name")+"’s</b> body. He suffers <b>1</b> level of Fatigue.";
		addFatigue(targetToken,1);
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> is stunned for <b>1</b> round.";
			targetToken.set("status_lightning-helix",1);
		}

	}else if(damage==-3){

		message+="The attack rips a large patch of skin from <b>"+ targetToken.get("name")+"’s</b> torso, leaving him gasping in pain. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>1</b> Round.";
		targetToken.set("status_lightning-helix",1);
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from blood loss.";
			targetToken.set("status_red",true);
		}


	}else if(damage==-4){


		message+="The blow opens up a long wound in <b>"+ targetToken.get("name")+"’s</b> torso, causing him to double over in terrible pain. <b>"+ targetToken.get("name")+"</b> suffers from Blood Loss and is Stunned for <b>1</b> Round";
		targetToken.set("status_red",true);
		targetToken.set("status_lightning-helix",1);
	}else if(damage==-5){

		var tough = randomInteger(10);

		message+="A torrent of blood spills from the deep cuts, making the ground slick with gore. All characters attempting to move through this pool of blood must make a Challenging (+0) Agility Testor fall Prone. <b>"+ targetToken.get("name")+"</b> suffers <b>"+tough.toString()+"</b> Toughness Damage and also suffers Blood Loss";
		targetToken.set("status_red",true);


	}else if(damage==-6){

		var tough = randomInteger(10);

		message+="The mighty attack takes a sizeable chunk out of <b>"+ targetToken.get("name")+"</b> and knocks him to the ground as he clutches the oozing wound, shrieking in pain. <b>"+ targetToken.get("name")+"</b> is knocked Prone and suffers"+tough.toString()+"</b> Toughness Damage and also suffers Blood Loss";
		targetToken.set("status_red",true);
		targetToken.set("status_arrowed",true);




	}else if(damage==-7){

		var tough=randomInteger(5);


		message+="The attack cuts open <b>"+ targetToken.get("name")+"’s</b> abdomen. <b>"+ targetToken.get("name")+"</b> can either choose to use one arm to hold his guts in (until a medic can bind them in place with a successful Medicae Test), or fight on regardless and risk a 20% chance each Round that his middle splits open, spilling his intestines all over the ground, causing an additional 2d10 Damage. In either case, <b>"+ targetToken.get("name")+"</b> suffers <b>"+tough.toString()+"</b> permanent Toughness Damage and is now suffering Blood Loss";
		targetToken.set("status_red",true);

	}else if(damage==-8){

		message+="With a vile tearing noise, the skin on <b>"+ targetToken.get("name")+"’s</b> chest comes away revealing a red ruin of muscle.";
		 
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> dies.";
			targetToken.set("status_dead",true);
		}else{
			var tough=randomInteger(10);
			message+=" <b>"+ targetToken.get("name")+"</b> suffers <b>"+tough.toString()+"</b> toughness damage, from Blood Loss and is stunned for <b>1</b> round.";
			targetToken.set("status_red",true);
			targetToken.set("status_lightning-helix",1);
		}




	}else if(damage==-9){
		message+="The powerful blow cleaves <b>"+ targetToken.get("name")+"</b> from gullet to groin, revealing his internal organs and spilling them on to the ground before him. <b>"+ targetToken.get("name")+"</b> is now quite dead.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){

		message+="The powerful blow cleaves <b>"+ targetToken.get("name")+"</b> from gullet to groin, revealing his internal organs and spilling them on to the ground before him. <b>"+ targetToken.get("name")+"</b> is now quite dead. The area and <b>"+ targetToken.get("name")+"</b> are awash with gore. For the rest of the fight, anyone moving within four metres of <b>"+ targetToken.get("name")+"’s</b> corpse must make a Challenging (+0) Agility Testor fall Prone.";
		targetToken.set("status_dead",true);


	}
	sendChat('Critical Effect',message);
}
function rendingHeadCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		var targetHead=findObjs({ name: 'Head', _characterid: targetToken.get("represents") }, {caseInsensitive: true});
		var head=parseInt(targetHead[0].get("current")); 
		if((head)==0){
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from <b>1</b> level of fatigue.";
			addFatigue(targetToken,1);
		}else{
			message+=" <b>"+ targetToken.get("name")+"</b> is unaffected because of his helmet.";
		}


	}else if(damage==-2){

		var duration=randomInteger(10);
		message+="The attack slices open <b>"+ targetToken.get("name")+"’s</b> scalp, which immediately begins to bleed profusely. Due to blood pouring into <b>"+ targetToken.get("name")+"’s</b> eyes, he suffers a –10 penalty to both Weapon Skill and Ballistic Skill for the next <b>"+duration.toString()+"</b> Turns.";

		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from blood loss.";
			targetToken.set("status_red",true);
		}

	}else if(damage==-3){

		var stun=randomInteger(5);
		message+="The attack rips open <b>"+ targetToken.get("name")+"’s</b> face, leaving him Stunned for <b>"+stun.toString()+"</b> Rounds. If <b>"+ targetToken.get("name")+"</b> is wearing a helmet, the helmet is torn off. <b>"+ targetToken.get("name")+"</b> suffers Blood Loss.";
		targetToken.set("status_red",true);
		targetToken.set("status_lightning-helix",stun);


	}else if(damage==-4){
		var per = randomInteger(10);

		message+="The attack slices across one of <b>"+ targetToken.get("name")+"’s</b> eye sockets, possibly scooping out the eye. <b>"+ targetToken.get("name")+"</b> suffers <b>"+per.toString()+"</b> Perception Damage.";

	
		if(!abilityTest(targetToken, "T",20 )){
			message+=" <b>"+ targetToken.get("name")+"</b> loses an eye!";

		}

	}else if(damage==-5){

		var stun=randomInteger(5);
		message+="The attack tears <b>"+ targetToken.get("name")+"’s</b> helmet from his head. If wearing no helmet, <b>"+ targetToken.get("name")+"</b> loses an ear instead, becoming Deafened until he receives medical attention. If he loses an ear, he must also must pass a Challenging (+0) Toughness Testor suffer <b>1</b> point of permanent Fellowship Damage. <b>"+ targetToken.get("name")+"</b> is Stunned for <b>"+stun.toString()+"</b> Rounds.";
		targetToken.set("status_lightning-helix",stun);

	}else if(damage==-6){

		var fatigue = randomInteger(5);
		var feature=randomInteger(10);

		message+="As the blow rips violently across <b>"+ targetToken.get("name")+"’s</b> face it takes with it an important feature.";
		if(0<feature<4){
			message+=" <b>"+ targetToken.get("name")+"</b> has lost an eye!";
		}else if(3<feature<8){
			message+=" <b>"+ targetToken.get("name")+"</b> has lost his nose!";
		}else if(7<feature<11){
			message+=" <b>"+ targetToken.get("name")+"</b> has lost an ear!";
		}
		message+=" In addition,the target is now suffering Blood Loss and suffers <b>"+fatigue.toString()+"</b> levels of Fatigue.";
		targetToken.set("status_red",true);
		addFatigue(targetToken,fatigue);




	}else if(damage==-7){

		var fellow=randomInteger(10);


		message+="In a splatter of skin and teeth, the attack removes most of <b>"+ targetToken.get("name")+"’s</b> face. He is permanently blinded and has his Fellowship permanently reduced to <b>"+fellow.toString()+", and also now has trouble speaking without slurring his words. In addition, <b>"+ targetToken.get("name")+"</b> is suffering from Blood Loss and is Stunned for <b>1</b> Round.";
		targetToken.set("status_red",true);
		targetToken.set("status_lightning-helix",1);

	}else if(damage==-8){

		message+="The blow slices into the side of <b>"+ targetToken.get("name")+"’s</b> head causing his eyes to pop out and his brain to ooze down his cheek like spilled jelly. He’s dead before he hits the ground";

		targetToken.set("status_dead",true);





	}else if(damage==-9){

		var dist= randomInteger(10)+ randomInteger(10);
		message+="With a sound not unlike a wet sponge being torn in half, <b>"+ targetToken.get("name")+"’s</b> head flies free of its body and sails through the air, landing harmlessly <b>"+dist.toString()+"</b> metres away with a soggy thud. <b>"+ targetToken.get("name")+"</b> is instantly slain.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){

		var dist= randomInteger(10)+ randomInteger(10);
		message+="With a sound not unlike a wet sponge being torn in half, <b>"+ targetToken.get("name")+"’s</b> head flies free of its body and sails through the air, landing harmlessly <b>"+dist.toString()+"</b> metres away with a soggy thud. <b>"+ targetToken.get("name")+"</b> is instantly slain. <b>"+ targetToken.get("name")+"’s</b> neck spews blood in a torrent, drenching all those nearby and forcing them to make a Challenging (+0) Agility Test. Anyone who fails the Test suffers a –10 penalty to his Weapon Skill and Ballistic Skill Tests for <b>1</b> Round as gore fills his eyes or fouls his visor.";
		targetToken.set("status_dead",true);


	}
	sendChat('Critical Effect',message);
}
function rendingLegCrits(targetToken, damage){
	var message="";
	
	if(damage==-1){
		message+="The attack knocks the limb backwards, painfully twisting it awkwardly. <b>"+ targetToken.get("name")+"</b> suffers <b>1</b> level of Fatigue";
		addFatigue(targetToken,1);
	}else if(damage==-2){

		message+=" <b>"+ targetToken.get("name")+"’s</b> kneecap splits open.";
		 
		if(!abilityTest(targetToken, "Ag",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> falls prone and suffers from blood loss.";
			targetToken.set("status_red",true);
			targetToken.set("status_arrowed",true);
		}


	}else if(damage==-3){

		var ag=randomInteger(5);
		message+="The attack rips a length of flesh from the leg. <b>"+ targetToken.get("name")+"</b> suffers <b>"+ag.toString()+"</b> Agility Damage and suffers Blood Loss";
		targetToken.set("status_red",true);


	}else if(damage==-4){
		var ag=randomInteger(10);

		message+="The attack rips the kneecap free from <b>"+ targetToken.get("name")+"’s</b> leg, causing it to collapse out from under him. <b>"+ targetToken.get("name")+"’s</b> Movement is reduced by 1/2 (rounding up) until medical attention is received. In addition, he is knocked Prone and suffers <b>"+ag.toString()+"</b> Agility Damage.";
		targetToken.set("status_arrowed", true);
		targetToken.set("status_tread",true);
	}else if(damage==-5){
		message+="In a spray of blood, <b>"+ targetToken.get("name")+"’s</b> leg is deeply slashed, exposing bone, sinew, and muscle. <b>"+ targetToken.get("name")+"</b> suffers Blood Loss.";
		targetToken.set("status_red",true);
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> take <b>1</b> point of permanent Agility damage.";
		}

	}else if(damage==-6){

		message+="The blow slices a couple of centimetres off the end of <b>"+ targetToken.get("name")+"’s</b> foot, <b>"+ targetToken.get("name")+"</b> suffers Blood Loss.";
		targetToken.set("status_red",true);
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" The foot becomes a useless mess.";
		}else{
			message+=" <b>"+ targetToken.get("name")+"’s</b> Movement is reduced by half (rounding up).";
			targetToken.set("status_tread",true);
		}


	}else if(damage==-7){




		message+="The force of the blow cuts deep into the leg, grinding against bone and tearing ligaments apart. The leg is broken and, until repaired, <b>"+ targetToken.get("name")+"</b> counts as having only one leg. In addition, the level of maiming is such that <b>"+ targetToken.get("name")+"</b> is now suffering from Blood Loss. He also is Stunned for <b>1</b> Round and is knocked Prone";
		targetToken.set("status_red",true);
		targetToken.set("status_arrowed", true);
		targetToken.set("status_lightning-helix",1);

	}else if(damage==-8){

		message+="In a single bloody hack <b>"+ targetToken.get("name")+"’s</b> leg is lopped off, spurting its vital fluids across the ground.";
		
		if(!abilityTest(targetToken, "T",0 )){
			message+=" <b>"+ targetToken.get("name")+"</b> dies from shock!!";
			targetToken.set("status_dead",true);
		}else{
			var stun=randomInteger(10);
			message+=" <b>"+ targetToken.get("name")+"</b> suffers from Blood Loss and is stunned for <b>"+stun.toString()+"</b> rounds. He only has <b>1</b> leg";
			targetToken.set("status_red",true);
		}




	}else if(damage==-9){
		message+="With a meaty chop, the leg comes away at the hip. <b>"+ targetToken.get("name")+"</b> pitches to the ground howling in agony before dying.";
		targetToken.set("status_dead",true);

	}else if(damage<=-10){

		message+="With a meaty chop, the leg comes away at the hip. <b>"+ targetToken.get("name")+"</b> pitches to the ground howling in agony before dying. The tide of blood is so intense that, for the remainder of the battle, anyone making a Run or Charge Action within six metres of <b>"+ targetToken.get("name")+"</b> must make a Challenging (+0) Agility Testor be knocked Prone";
		targetToken.set("status_dead",true);

	}
	sendChat('Critical Effect',message);
}