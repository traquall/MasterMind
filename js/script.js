var colors = ["rouge", "vert", "bleu", "noir"];
var solution = [];
var tour;

document.addEventListener("DOMContentLoaded", function(event) {
  solution[0] = Math.floor((Math.random() * 4));
  solution[1] = Math.floor((Math.random() * 4));
  solution[2] = Math.floor((Math.random() * 4));
  solution[3] = Math.floor((Math.random() * 4));

  console.log("solution:");
  console.log(solution);
  console.log(colors[solution[0]]);
  console.log(colors[solution[1]]);
  console.log(colors[solution[2]]);
  console.log(colors[solution[3]]);

  tour = 0;

  var pSolut = document.getElementById("solution");
  pSolut.innerHTML = "la solution était : "+colors[solution[0]]+" "+colors[solution[1]]+" "+colors[solution[2]]+" "+colors[solution[3]];
});


function validMind(){
	tour++;

	var billes = [];
	billes[0] = document.getElementById("bille1");
	billes[1] = document.getElementById("bille2");
	billes[2] = document.getElementById("bille3");
	billes[3] = document.getElementById("bille4");

	var tempPropos = [];
	var tempSolution = [];
	for (var i = 0; i < solution.length; i++) {
		tempSolution[i] = solution[i];
		tempPropos[i] = getIntColor(billes[i]);
	};

	var bon = 0;
	var presque = 0;

	// comptage des bonnes et 'moyennes' réponses
	for (var i = 0; i < tempPropos.length; i++) {
		if(tempPropos[i] == tempSolution[i]){
			bon++;
			tempSolution[i] = -1;
			tempPropos[i] = -2;
			console.log("a"+i);
		}
	};

	for (var i = 0; i < tempPropos.length; i++) {
		if(tempPropos[i] == tempSolution[0]){
			presque++;
			tempSolution[0] = -1;
			tempPropos[i] = -2;
			console.log("b"+i);
		}
		else if(tempPropos[i] == tempSolution[1]){
			presque++;
			tempSolution[1] = -1;
			tempPropos[i] = -2;
			console.log("c"+i);
		}
		else if(tempPropos[i] == tempSolution[2]){
			presque++;
			tempSolution[2] = -1;
			tempPropos[i] = -2;
			console.log("d"+i);
		}
		else if(tempPropos[i] == tempSolution[3]){
			presque++;
			tempSolution[3] = -1;
			tempPropos[i] = -2;
			console.log("e"+i);
		}
	}
	newLineFunction(bon, presque);
}

function newLineFunction(bon, presque){

	//Vérification gagné/perdu/continuer
	if(bon >= 4){
		document.getElementById("modalVictory").style.display = "block";
	}

	if(tour == 8 && bon <4){
		document.getElementById("modalDefeat").style.display = "block";
	}

	// création d'une nouvelle ligne pour stocker les billes
	newLine = document.createElement("tr");
	newLine.innerHTML = '<td id="lbille1" class="'+document.getElementById("bille1").className+'"></td>'+
						'<td id="lbille2" class="'+document.getElementById("bille2").className+'"></td>'+
						'<td id="lbille3" class="'+document.getElementById("bille3").className+'"></td>'+
						'<td id="lbille4" class="'+document.getElementById("bille4").className+'"></td>'+
						'<td>'+
							'<table>'+
								'<tr>'+
									'<td id="l'+tour+'indic1" class="indic"></td>'+
									'<td id="l'+tour+'indic2" class="indic"></td>'+
								'</tr>'+
								'<tr>'+
									'<td id="l'+tour+'indic3" class="indic"></td>'+
									'<td id="l'+tour+'indic4" class="indic"></td>'+
								'</tr>'+
							'</table>'+
						'</td>';
	maTable = document.getElementById("billestock");
  	maTable.appendChild(newLine);

  	// affectation des couleurs pour les indicateurs
	for (var i = 1; i < 5; i++) {
		var indic = document.getElementById("l"+tour+"indic"+i);
		if(bon > 0){
			indic.className = "indic rouge";
			bon--;
		}
		else if(presque > 0){
			indic.className = "indic noir";
			presque--;
		}
		else{
			indic.className = "indic";
		}
	};

}

function regame(){
	// recharge la page pour recommencer une partie
	window.location.reload();
}

function changeColor(id){
	var color = 0;
	var bille = document.getElementById("bille"+id);

	// passe à la couleur suivante
	for (var i = 0 ; i < colors.length-1; i++) {
		if(this.hasClass(bille, colors[i])){
			color = i+1;
		}
	};

	bille.className = "bille "+colors[color];
}

function getIntColor(element){
	if(hasClass(element,"rouge"))
		return 0;
	if(hasClass(element,"vert"))
		return 1;
	if(hasClass(element,"bleu"))
		return 2;
	if(hasClass(element,"noir"))
		return 3;
}

function hasClass(element, cls) {
	// return true si l'element contient la classe cls
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
