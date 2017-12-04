//fichier pour gerer le menu avec les filtres par filter de news
var filter=[];
filter['economie']=true;
filter['divertissement']=true;
filter['gaming']=true;
filter['general']=true;
filter['sante']=true;
filter['musique']=true;
filter['politique']=true;
filter['sciences']=true;
filter['sport']=true;
filter['technologie']=true;

function launch() {
	updateFilterVar();

  checkButton(filter['economie'], 'filterEconomie', 'Gold');
  checkButton(filter['divertissement'], 'filterDivertissement', 'DodgerBlue');
  checkButton(filter['gaming'], 'filterGaming', 'OrangeRed');
  checkButton(filter['general'], 'filterGeneral', 'LightSalmon');
  checkButton(filter['sante'], 'filterSante', 'DeepPink');
  checkButton(filter['musique'], 'filterMusique', 'MediumAquaMarine');
  checkButton(filter['politique'], 'filterPolitique', 'Crimson');
  checkButton(filter['sciences'], 'filterSciences', 'LightSeaGreen');
  checkButton(filter['sport'], 'filterSport', 'Chartreuse');
  checkButton(filter['technologie'], 'filterTechnologie', 'CadetBlue');

	//eventListener sur les boutons des filtres

	document.getElementById('filterEconomie').addEventListener("click", function() {
		filter['economie']=switchButton(filter['economie'], 'filterEconomie');
		checkButton(filter['economie'], 'filterEconomie', 'Gold');
		displayArticles();
	});
	document.getElementById('filterDivertissement').addEventListener("click", function() {
		filter['divertissement']=switchButton(filter['divertissement'], 'filterDivertissement');
		checkButton(filter['divertissement'], 'filterDivertissement', 'DodgerBlue');
		displayArticles();
	});
	document.getElementById('filterGaming').addEventListener("click", function() {
		filter['gaming']=switchButton(filter['gaming'], 'filterGaming');
		checkButton(filter['gaming'], 'filterGaming', 'OrangeRed');
		displayArticles();
	});
	document.getElementById('filterGeneral').addEventListener("click", function() {
		filter['general']=switchButton(filter['general'], 'filterGeneral');
		checkButton(filter['general'], 'filterGeneral', 'LightSalmon');
		displayArticles();
	});
	document.getElementById('filterSante').addEventListener("click", function() {
		filter['sante']=switchButton(filter['sante'], 'filterSante');
		checkButton(filter['sante'], 'filterSante', 'DeepPink');
		displayArticles();
	});
	document.getElementById('filterMusique').addEventListener("click", function() {
		filter['musique']=switchButton(filter['musique'], 'filterMusique');
		checkButton(filter['musique'], 'filterMusique', 'MediumAquaMarine');
		displayArticles();
	});
	document.getElementById('filterPolitique').addEventListener("click", function() {
		filter['politique']=switchButton(filter['politique'], 'filterPolitique');
		checkButton(filter['politique'], 'filterPolitique', 'Crimson');
		displayArticles();
	});
	document.getElementById('filterSciences').addEventListener("click", function() {
		filter['sciences']=switchButton(filter['sciences'], 'filterSciences');
		checkButton(filter['sciences'], 'filterSciences', 'LightSeaGreen');
		displayArticles();
	});
	document.getElementById('filterSport').addEventListener("click", function() {
		filter['sport']=switchButton(filter['sport'], 'filterSport');
		checkButton(filter['sport'], 'filterSport', 'Chartreuse');
		displayArticles();
	});
	document.getElementById('filterTechnologie').addEventListener("click", function() {
		filter['technologie']=switchButton(filter['technologie'], 'filterTechnologie');
		checkButton(filter['technologie'], 'filterTechnologie', 'CadetBlue');
		displayArticles();
	});
}

//change la valeur d'un filtre et le cookie du bouton qui correspond
function switchButton(filterButton, id) {
	if(!filterButton) {
		filterButton=true;
		setCookie(id,1,365*2);
	} else {
		filterButton=false;
		setCookie(id,0,365*2);
	}

	return filterButton;
}

//met à jour le css d'un bouton
function checkButton(filterButton, id, color) {
	if(!filterButton)
    	document.getElementById(id).style.borderBottom="solid grey 0.4vh";
	else
		document.getElementById(id).style.borderBottom="solid " + color + " 0.4vh";
}

//récupère les cookies et met à jour les var globales
function updateFilterVar() {
  if(getCookie('filterEconomie')=="0")
  	filter['economie']=false;
  else
  	filter['economie']=true;
  if(getCookie('filterDivertissement')=="0")
  	filter['divertissement']=false;
  else
  	filter['divertissement']=true;
  if(getCookie('filterGaming')=="0")
  	filter['gaming']=false;
  else
  	filter['gaming']=true;
  if(getCookie('filterGeneral')=="0")
  	filter['general']=false;
  else
  	filter['general']=true;
  if(getCookie('filterSante')=="0")
  	filter['sante']=false;
  else
  	filter['sante']=true;
  if(getCookie('filterMusique')=="0")
  	filter['musique']=false;
  else
  	filter['musique']=true;
  if(getCookie('filterPolitique')=="0")
  	filter['politique']=false;
  else
  	filter['politique']=true;
  if(getCookie('filterSciences')=="0")
  	filter['sciences']=false;
  else
  	filter['sciences']=true;
  if(getCookie('filterSport')=="0")
  	filter['sport']=false;
  else
  	filter['sport']=true;
  if(getCookie('filterTechnologie')=="0")
  	filter['technologie']=false;
  else
  	filter['technologie']=true;
}

function displayArticles() {
  if(window.location.href.substr(window.location.href.lastIndexOf('/') + 1) === 'map') {
  	console.log("plop");
	getArticles();
  }
}

launch();
