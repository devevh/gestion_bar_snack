/**************************************************************************************/
//constantes
/**************************************************************************************/
const sodas=['coca','orangina','sprite','djino','vinocola'];
const bieres=['regab','beaufort','33export','castelbeer','1664','heineken','corona'];
const catalogue = [sodas,bieres];
const init = '{"stock":0,"vente":0,"prix":0}';

/**************************************************************************************/
//fonctions appelées
/**************************************************************************************/
function effaceDemo() {
document.getElementById("demo").innerHTML=""
}

function recharge() {
	location.reload();
}

function enleverClasseVente(truc) {
	if (truc.className.indexOf(" vente") > 0) truc.className = truc.className.replace(" vente", "");
}
/**************************************************************************************/
//fonctions opérationnelles
/**************************************************************************************/
function construirePage() {
	var divCatgSodas=document.getElementById("sodas");
	var divCatgBieres=document.getElementById("bieres");
	var divStock=document.getElementById("stock");
	var divBoissonCatg="";
	var divBoissonStock="<button onclick='afficherSousMenu(this.name)' name='stock' class='w3-green w3-block w3-button'>Gérer le stock</button>\n";
	//
	let stockReels = document.getElementsByClassName("reel stock");
	let prixReels = document.getElementsByClassName("reel prix");
	let divId, PId, SId;
	var truc, texte, obj;
	var stockage;
	//
	//
	//construire la page en fonction du catalogue
	divCatgSodas.innerHTML="";
	divCatgBieres.innerHTML="";
	divStock.innerHTML = "";
	//
	for (article of sodas) {
		//chercher l'article dans le stockage local
		texte = localStorage.getItem(article);
		//si trouvé alors on recupère ses valeurs
		if (texte != null) {
			obj = JSON.parse(texte);
		}
		//sinon on initialise le stockage local
		else {
			obj=JSON.parse(init);
			localStorage.setItem(article, init);
		}
		divBoissonCatg+="<div class='w3-col s3' id='div"+article+"'>\n<a onclick='vendre(this.name)' name='"+article+"' href='javascript:void(0);' title='"+article+"'><img class='w3-margin' id='img"+article+"' height='100px' src='./images/"+article+".png' alt='"+article+"'></a><br>\n<span class='reel stock' id='reel"+article+"stock'>"+obj.stock+"</span><br>\n<span class='reel prix' id='reel"+article+"prix'>"+obj.prix+"</span></div>\n";
		divBoissonStock+="<div class='w3-row w3-center w3-border'><div class='w3-col s3' ><a onclick='maj(this.name)' name='"+article+"' href='javascript:void(0);' title='"+article+"'><img class='w3-margin' height='100px' src='./images/"+article+".png' alt='"+article+"'></a></div><div class='w3-col s9'><label for='prix"+article+"'>prix unitaire</label><input class='w3-input' type='number' id='prix"+article+"' maxlength='4' size='4'><label for='stock"+article+"'>stock</label><input class='w3-input' type='number' id='stock"+article+"' maxlength='4' size='4'></div></div>\n";
	}
	divCatgSodas.innerHTML=divBoissonCatg;
	//
	divBoissonCatg="";
	for (article of bieres) {
		//chercher l'article dans le stockage local
		texte = localStorage.getItem(article);
		//si trouvé alors on recupère ses valeurs
		if (texte != null) {
			obj = JSON.parse(texte);
		}
		//sinon on initialise le stockage local
		else {
			obj=JSON.parse(init);
			localStorage.setItem(article, init);
		}
		divBoissonCatg+="<div class='w3-col s3' id='div"+article+"'>\n<a onclick='vendre(this.name)' name='"+article+"' href='javascript:void(0);' title='"+article+"'><img class='w3-margin' id='img"+article+"' height='100px' src='./images/"+article+".png' alt='"+article+"'></a><br>\n<span class='reel stock' id='reel"+article+"stock'>"+obj.stock+"</span><br>\n<span class='reel prix' id='reel"+article+"prix'>"+obj.prix+"</span></div>\n";
		divBoissonStock+="<div class='w3-row w3-center w3-border'><div class='w3-col s3' ><a onclick='maj(this.name)' name='"+article+"' href='javascript:void(0);' title='"+article+"'><img class='w3-margin' height='100px' src='./images/"+article+".png' alt='"+article+"'></a></div><div class='w3-col s9'><label for='prix"+article+"'>prix unitaire</label><input class='w3-input' type='number' id='prix"+article+"' maxlength='4' size='4'><label for='stock"+article+"'>stock</label><input class='w3-input' type='number' id='stock"+article+"' maxlength='4' size='4'></div></div>\n";
	}
	divCatgBieres.innerHTML=divBoissonCatg;
	//
	divStock.innerHTML = divBoissonStock;
	//
	//gestion de l'affichage
	for (i = 0; i < localStorage.length; i++) {
		truc = localStorage.key(i);
		texte = localStorage.getItem(truc);
		obj = JSON.parse(texte);
		//identifier l'article
		PId="reel"+truc+"prix";
		SId="reel"+truc+"stock";
		//mettre à jour l'affichage
		if (document.getElementById(PId)) document.getElementById(PId).innerHTML = obj.prix+" xaf";
		if (document.getElementById(SId)) document.getElementById(SId).innerHTML = obj.stock;
		//si le stock devient nul alors on rend l'article indisponible
		x = document.getElementById("div"+truc);
		if (x != null) {
			if (obj.stock == 0) {
				x.className +=" w3-disabled";
			}
			else {
				if (x.className.indexOf(" w3-disabled") > -1) x.className = x.className.replace(" w3-disabled", "");
			}
		}
	}
	//alimentation du tableau
	readValue();
}

function initInventaire() {
// remise à zero du stock et des ventes
	let reponse=confirm("Voulez-vous tout remettre à zéro ?");
	var article="";
	if (reponse) {
	//si confirmé alors on efface tout et on recharge la page qui sera reconstruite
		localStorage.clear();
	}
	recharge();
}

function readValue() {
	//mise à jour du tableau des ventes
	var demo = document.getElementById("demo");
	var tableau, truc, texte, obj;
	demo.innerHTML = "";
	if (localStorage.length == 0) {
		demo.innerHTML = "Aucun inventaire disponible";
		}
	else {
		tableau = "<table class='w3-table'><tr><td>Article</td><td>Prix</td><td>Stock</td><td>Ventes</td><td>Montant</td></tr>";
		for (i = 0; i < localStorage.length; i++) {
			truc = localStorage.key(i);
			texte = localStorage.getItem(truc);
			obj = JSON.parse(texte);
			tableau += "<tr><td>"+truc+"</td><td>"+obj.prix+"</td><td>"+obj.stock+"</td><td>"+obj.vente+"</td><td>"+obj.prix*obj.vente+"</td></tr>";
		}
		tableau +="</table>";
		demo.innerHTML += tableau;
	}}

function vendre(truc) {
//met à jour le stock et la vente de l'article
//anime le champ stock
//calcule l'affichage en fonction du stock restant
	var texte = localStorage.getItem(truc);
	var obj = JSON.parse(texte);
	var stocktruc = document.getElementById("reel"+truc+"stock");
	var divtruc = document.getElementById("div"+truc);
	var article, articleJSON;
	var timer;
	
	clearTimeout(timer);
	enleverClasseVente(stocktruc);
	if (obj.stock > 0) {
	//si stock suffisant alors la vente est possible : mettre à jour stock et vente
		obj.vente += 1;
		obj.stock -= 1;
		article = { "stock":obj.stock, "vente":obj.vente, "prix":obj.prix };
		articleJSON = JSON.stringify(article);
	//enregisrer la mise à jour
		localStorage.setItem(truc, articleJSON);
		stocktruc.innerHTML = obj.stock;
	//animation du champ stock
		stocktruc.className += " vente";
	}
	if (obj.stock == 0) {
	//gestion de l'article si stock nul
		divtruc.className +=" w3-disabled";
	}
	else {
		if (divtruc.className.indexOf(" w3-disabled") > 0) divtruc.className = divtruc.className.replace(" w3-disabled", "");
	}
	readValue();
	//préparation pour la prochaine vente
	timer=setTimeout(enleverClasseVente,500,stocktruc);
}

function maj(truc) {
	//met à jour le stock, le prix unitaire et remet à 0 le nombre de vente
	var x, PId, SId;
	// récupérer le prix saisi
	var prix = document.getElementById("prix"+truc).value;
	// récupérer le stock saisi
	var stock = document.getElementById("stock"+truc).value;
	// Storing data:
	var article = {"stock":stock,"vente":0,"prix":prix};
	var articleJSON = JSON.stringify(article);
	if ((stock > 0) && (prix > 0)) localStorage.setItem(truc, articleJSON);
	//identifier l'article
	PId="reel"+truc+"prix";
	SId="reel"+truc+"stock";
	//mettre à jour l'affichage
	if (document.getElementById(PId)) document.getElementById(PId).innerHTML = article.prix+" xaf";
	if (document.getElementById(SId)) document.getElementById(SId).innerHTML = article.stock;
	//si le stock devient nul alors on rend l'article indisponible
	x = document.getElementById("div"+truc);
	if (x != null) {
		if (article.stock == 0) {
			x.className +=" w3-disabled";
		}
		else {
			if (x.className.indexOf(" w3-disabled") > -1) x.className = x.className.replace(" w3-disabled", "");
		}
	}
	//mettre à jour le tableau de suivi du stock et des ventes
	readValue();
}

// Accordion 
function afficherSousMenu(quellediv) {
  var x = document.getElementById(quellediv);
  if (x.className.indexOf("w3-show") == -1) {
    //x.className += " w3-show";
	x.className = x.className.replace(" w3-hide", " w3-show");
  } else {
    x.className = x.className.replace(" w3-show", " w3-hide");
  }
}