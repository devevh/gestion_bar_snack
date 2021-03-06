/**************************************************************************************/
//fonctions appelées
/**************************************************************************************/
function stringToHash(string) {
	var hash = 0;
	if (string.length == 0) return hash;
	for (i = 0; i < string.length; i++) {
		char = string.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash;
	}
	return hash;
}

function recharge() {
	location.reload();
}

function enleverClasseVente(truc) {
	if (truc.className.indexOf(" vente") > 0) truc.className = truc.className.replace(" vente", "");
}

function gestionAffichage(truc) {
	let DId, PId, SId;
	//gestion de l'affichage du truc
	var texte = localStorage.getItem(truc);
	var obj = JSON.parse(texte);
	//identifier l'article
	PId=document.getElementById("reel"+truc+"prix");
	SId=document.getElementById("reel"+truc+"stock");
	DId=document.getElementById("div"+truc);
	//mettre à jour l'affichage du prix et du stock
	if (PId) PId.innerHTML = obj.prix+" xaf";
	if (SId) SId.innerHTML = obj.stock;
	//si le stock devient nul alors on rend l'article indisponible
	if (DId) {
		if (obj.stock == 0) {
			DId.className +=" w3-disabled";
		}
		else {
			if (DId.className.indexOf(" w3-disabled") > -1) DId.className = DId.className.replace(" w3-disabled", "");
		}
	}
}

function creerElement(idParent,typeElement,idElmt,classe,texte) {
	var elmt = document.createElement(typeElement);
	elmt.setAttribute("id", idElmt);
	elmt.setAttribute("class", classe);
	if (texte>"") elmt.appendChild(document.createTextNode(texte));
	document.getElementById(idParent).appendChild(elmt);
}

/**************************************************************************************/
//fonctions dynamiques
/**************************************************************************************/
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

/**************************************************************************************/
//fonctions opérationnelles
/**************************************************************************************/
function construirePage() {
	var divCatg=document.getElementById("categories");
	var divStock=document.getElementById("stock");
	var elmtArticle;;
	var divBoissonStock=[];
	var truc, texte, obj, i;
	var stockage;
	//
	//construire la page en fonction du catalogue
	//créer le bouton en haut du formulaire
	creerElement("stock","button","boutonStock","w3-green w3-block w3-button","Gérer le stock");
	//définir les attributs spécifiques
	elmtArticle=document.getElementById("boutonStock");
		elmtArticle.setAttribute("name", "stock");
		elmtArticle.setAttribute("onclick", "afficherSousMenu(this.name)");
	creerElement("stock","i","i1","","toucher l'image de la boisson pour mettre à jour"); 
	//
	for (categorie of catalogue) {
		creerElement("categories","div","titre"+categorie[0],"w3-large w3-margin-top","");
		creerElement("titre"+categorie[0],"b","","",categorie[0].toUpperCase());
		creerElement("categories","div",categorie[0],"w3-row w3-border","");
		for (i=1;i<categorie.length;i++) {
			article=categorie[i];
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
			//on ajoute la div de l'article
			creerElement(categorie[0],"div","div"+article,"w3-col m2 s3","");
			//ajout lien cliquable
			creerElement("div"+article,"a","a"+article,"","");
			//définir les attributs spécifiques
			elmtArticle=document.getElementById("a"+article);
				elmtArticle.setAttribute("title", article);
				elmtArticle.setAttribute("name", article);
				elmtArticle.setAttribute("onclick", "vendre(this.name)");
				elmtArticle.setAttribute("href", "javascript:void(0)");
			//ajout image dans le lien
			creerElement("a"+article,"img","img"+article,"w3-margin","");
			//définir les attributs spécifiques
			elmtArticle=document.getElementById("img"+article);
				elmtArticle.setAttribute("alt", article);
				elmtArticle.setAttribute("src", "./images/"+article+".png");
				elmtArticle.setAttribute("height", "100px");
				elmtArticle.setAttribute("width", "30px");
			//autres éléments de l'article : reour ligne et span 
			creerElement("div"+article,"br","br"+article,"","");
			creerElement("div"+article,"span","reel"+article+"stock","reel stock",obj.stock);
			creerElement("div"+article,"br","br"+article,"","");
			creerElement("div"+article,"span","reel"+article+"prix","reel prix",obj.prix);
			//
			//gestion du formulaire de mise à jour du stock
			creerElement("stock","div","divRowStock"+article,"w3-row w3-center w3-border","");
			creerElement("divRowStock"+article,"div","divColStock"+article,"w3-col m2 s3","");
			//ajout lien cliquable
			creerElement("divColStock"+article,"a","aColStock"+article,"","");
			//définir les attributs spécifiques
			elmtArticle=document.getElementById("aColStock"+article);
				elmtArticle.setAttribute("title", article);
				elmtArticle.setAttribute("name", article);
				elmtArticle.setAttribute("onclick", "maj(this.name)");
				elmtArticle.setAttribute("href", "javascript:void(0)");
			//ajout image dans le lien
			creerElement("aColStock"+article,"img","imgColStock"+article,"w3-margin","");
			//définir les attributs spécifiques
			elmtArticle=document.getElementById("imgColStock"+article);
				elmtArticle.setAttribute("alt", article);
				elmtArticle.setAttribute("src", "./images/"+article+".png");
				elmtArticle.setAttribute("height", "100px");
				elmtArticle.setAttribute("width", "30px");
			//div des input
			creerElement("divRowStock"+article,"div","divInputStock"+article,"w3-col s9","");
			creerElement("divInputStock"+article,"label","labelPrix"+article,"","prix unitaire");
			//définir les attributs spécifiques
			elmtArticle=document.getElementById("labelPrix"+article);
				elmtArticle.setAttribute("for", "prix"+article);
			creerElement("divInputStock"+article,"input","prix"+article,"w3-input","");
			//définir les attributs spécifiques
			elmtArticle=document.getElementById("prix"+article);
				elmtArticle.setAttribute("type", "number");
				elmtArticle.setAttribute("size", 4);
				elmtArticle.setAttribute("maxlength", 4);
				elmtArticle.setAttribute("min", 1);
				elmtArticle.setAttribute("max", 100000);
				elmtArticle.setAttribute("step", 1);
				if (obj.prix > 0) elmtArticle.setAttribute("value", obj.prix);
			creerElement("divInputStock"+article,"label","labelStock"+article,"","stock");
			//définir les attributs spécifiques
			elmtArticle=document.getElementById("labelStock"+article);
				elmtArticle.setAttribute("for", "stock"+article);
			creerElement("divInputStock"+article,"input","stock"+article,"w3-input","");
			//définir les attributs spécifiques
			elmtArticle=document.getElementById("stock"+article);
				elmtArticle.setAttribute("type", "number");
				elmtArticle.setAttribute("size", 4);
				elmtArticle.setAttribute("maxlength", 4);
				elmtArticle.setAttribute("min", 1);
				elmtArticle.setAttribute("max", 1000);
				elmtArticle.setAttribute("step", 1);
				if (obj.stock > 0) elmtArticle.setAttribute("value", obj.stock);
		}
	}
	//
	//gestion de l'affichage
	for (i = 0; i < localStorage.length; i++) {
		truc = localStorage.key(i);
		//test de la clé pour ne pas lire les histo
		if ((truc.startsWith('20'))) {
			//histo, on ajoute une option à la liste déroulante
			creerElement("listeInventaires","option","histo"+truc,"",truc);
			//définir les attributs spécifiques
			elmtArticle=document.getElementById("histo"+truc);
				elmtArticle.setAttribute("value", truc);
		}
		else {
			gestionAffichage(truc);
		}
	}
	//alimentation du tableau
	readValue("tableau");
}

//******************************************************************************************************
function initInventaire() {
// remise à zero du stock et des ventes avec historisation
	let cle, texte, article;
	const histo=[];
	//lire la réponse de l'utilisateur à la demande de confirmation
	let reponse=confirm("Voulez-vous tout remettre à zéro ?");
	if (reponse) {
	//si confirmé alors 
		//calcul date d'historisation
		let d = new Date();
		let dateHisto = d.toJSON(d);
		//parcourir le stockage local
		for (i = 0; i < localStorage.length; i++) {
			cle = localStorage.key(i);
			//test de la clé pour ne pas lire les histo
			if (!(cle.startsWith('20'))) {
				texte= localStorage.getItem(cle);
				article=JSON.parse(texte);//transformer la string des données en objet 
				obj={"article":cle,"stock":article.stock,"vente":article.vente,"prix":article.prix}; //pour construire un nouvel objet
				//histo[i]=obj; //stocker cet objet dans le tableau d'historisation
				l=histo.push(obj); //stocker cet objet dans le tableau d'historisation
				//on met tous les histos à zéro
				localStorage.setItem(cle, init);
			}
		}
		//on historise avec le timestamp
		localStorage.setItem(dateHisto, JSON.stringify(histo));
	}
	//on recharge la page qui sera reconstruite
	recharge();
}

//******************************************************************************************************
let tableauHisto;
function ecrireLigne(valeur) {
	tableauHisto+="<tr><td>"+valeur.article+"</td><td class='w3-right-align'>"+valeur.stock+"</td><td class='w3-right-align'>"+valeur.vente+"</td><td class='w3-right-align'>"+valeur.prix+"</td><td class='w3-right-align'>"+valeur.prix*valeur.vente+"</td></tr>\n";
}

function readHisto(quelleDate) {
	//mise à jour du tableau des ventes
	let d = document.getElementById("tableauHisto");
	let texte, obj;
	if (quelleDate != "--") {
		d.innerHTML = "";
		if (localStorage.length == 0) {
			d.innerHTML = "Aucun inventaire disponible";
		}
		else {
			tableauHisto = "<table class='w3-table-all'><tr><th>Article</th><th class='w3-right-align'>Stock</th><th class='w3-right-align'>Ventes</th><th class='w3-right-align'>Prix</th><th class='w3-right-align'>Montant</th></tr>\n";
			texte = localStorage.getItem(quelleDate); //texte reçoit les n postes du JSON correspondant à la clé quelleDate
			obj = JSON.parse(texte);
			obj.forEach(ecrireLigne); //itération sur tous les postes existants de l'objet
			tableauHisto +="</table>";
			d.innerHTML = tableauHisto; //ecriture du tableau resultat dans la div
			document.getElementById('dateHisto').innerHTML=quelleDate.substr(0,10)+' à '+quelleDate.substr(11,8);
			document.getElementById('modaleHisto').style.display='block';
		}
	}
}
//******************************************************************************************************
function readValue(quellediv) {
	//mise à jour du tableau des ventes
	let d = document.getElementById(quellediv);
	let tableau, truc, texte, obj;
	d.innerHTML = "";
	if (localStorage.length == 0) {
		d.innerHTML = "Aucun inventaire disponible";
	}
	else {
		tableau = "<table class='w3-table-all'><tr><th>Article</th><th class='w3-right-align'>Stock</th><th class='w3-right-align'>Ventes</th><th class='w3-right-align'>Prix</th><th class='w3-right-align'>Montant</th></tr>\n";
		for (i = 0; i < localStorage.length; i++) {
			truc = localStorage.key(i);
			//test de la clé pour ne pas lire les histo
			if (!(truc.startsWith('20'))) {
				texte = localStorage.getItem(truc);
				obj = JSON.parse(texte);
				tableau += "<tr><td>"+truc+"</td><td class='w3-right-align'>"+obj.stock+"</td><td class='w3-right-align'>"+obj.vente+"</td><td class='w3-right-align'>"+obj.prix+"</td><td class='w3-right-align'>"+obj.prix*obj.vente+"</td></tr>\n";
			}
		}
		tableau +="</table>";
		d.innerHTML += tableau;
	}
}

//*************************************************************************************************
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
	readValue("tableau");
	//préparation pour la prochaine vente
	timer=setTimeout(enleverClasseVente,500,stocktruc);
}

//***********************************************************************************************
function maj(truc) {
	//met à jour le stock, le prix unitaire et remet à 0 le nombre de vente
	// récupérer le prix saisi
	var prix = Math.floor(document.getElementById("prix"+truc).value);
	// récupérer le stock saisi
	var stock = Math.floor(document.getElementById("stock"+truc).value);
	if ((stock === 0) || (prix === 0)) {stock=0; prix=0};
	// Storing data
	var article = {"stock":stock,"vente":0,"prix":prix};
	var articleJSON = JSON.stringify(article);
	if ((stock >= 0) && (prix >= 0)) localStorage.setItem(truc, articleJSON);
	gestionAffichage(truc);
	//mettre à jour le tableau de suivi du stock et des ventes
	readValue("tableau");
}


//************************************************************************
//usage futur : geolocalisation
/*
var p=document.getElementById('affichePosition');
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    p.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  p.innerHTML = "Latitude: " + position.coords.latitude + " - Longitude: " + position.coords.longitude;
}
getLocation();
*/