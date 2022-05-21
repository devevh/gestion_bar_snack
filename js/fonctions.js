/**************************************************************************************/
//constantes
/**************************************************************************************/
const catalogue = ['coca','orangina','sprite','djino','regab','beaufort','33export'];

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
function initInventaire() {
// remise à zero du stock et des ventes
	let init = '{"stock":0,"vente":0,"prix":0}';
	let reponse=confirm("Voulez-vous tout remettre à zéro ?");
	var article;
	if (reponse) {
	//si confirmer alors pour chaque article du catalogue le stockage local est remis à 0
		for (article of catalogue) {
			localStorage.setItem(article, init);
		}
	}
	readValue();
	//recharge();
}

function readValue() {
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

function majPage() {
//met à jour les valeurs stock affichées sous chaque produit au chargement de la page
//
//si aucun inventaire enregistré 
//alors on met tout à 0
//sinon pour chaque article de l'inventaire on met à jour les zones stock et prix
//		si le stock est à 0 
//		alors l'article est indisponible
//
//si un article n'est pas dans l'inventaire il n'est pas affiché

	let stockReels = document.getElementsByClassName("reel stock");
	let prixReels = document.getElementsByClassName("reel prix");
	let divId, PId, SId;
	var truc, texte, obj;
	
	if (localStorage.length == 0) {
	//aucun stock, on met tout à 0
		for (stockReel of stockReels) { 
			stockReel.innerHTML = 0;
			//transformer reeloranginastock en divorangina => 
			divId = stockReel.id.replace("reel","div");
			divId = divId.replace("stock","");
			document.getElementById(divId).className +=" w3-disabled";
		};
		for (prixReel of prixReels) { prixReel.innerHTML = "0 xaf"};
	}
	else {
	//stock existe, on cherche les valeurs de chaque article
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
		readValue();
	}
}

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